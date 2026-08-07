# Runbook — Deploy, Rollback e Configuração Cloudflare (Landing Best Fluency)

- **Issue:** [#14 — Implementar Docker, deploy na VPS Hostinger e Cloudflare](https://github.com/vianahub-pt/VianaHub.Global.BestFluency.Web/issues/14)
- **Spec:** secções 27 (Docker/VPS) e 28 (Cloudflare) de `docs/landing-page-spec-v2.md`
- **ADR:** [ADR-0001 — Arquitetura static-first](docs/adr/ADR-0001.md)
- **Analytics:** [Analytics e KPIs](docs/analytics-kpis.md)

> **Estado atual (pré-lançamento):** o domínio definitivo, as credenciais da
> VPS Hostinger e da conta Cloudflare **ainda não existem**. Este runbook
> documenta **tudo o que é executável/repositável** e o procedimento do
> lançamento real com placeholders claros (`<DOMINIO>`, `<IP_VPS>`, …).
> **Nenhum valor real (IP, domínio, token, chave) está no repositório.**

---

## 1. Visão geral da arquitetura

```text
                    ┌─────────────────────────────┐
 Utilizador ───────►│ Cloudflare (proxy/CDN/WAF) │
                    │  • SSL Full (strict)        │
                    │  • HTTP → HTTPS             │
                    │  • HTTP/3, Brotli no edge   │
                    │  • Cache de assets          │
                    │  • Web Analytics (sem cookie)│
                    └──────────────┬──────────────┘
                                   │ HTTPS (porta 443)
                    ┌──────────────▼──────────────┐
                    │ VPS Hostinger (Docker)      │
                    │  container best-fluency-web │
                    │  Nginx (uid 101, não-root)  │
                    │  8080 http → 301 https      │
                    │  8443 https (cert origem)   │
                    │  /usr/share/nginx/html      │
                    └─────────────────────────────┘
```

- A landing é **100% estática** (`output: "export"` → `out/`), servida por
  Nginx dentro de um container. **Não há runtime Node em produção.**
- O container executa como **usuário não-root** (uid 101) e escuta as portas
  internas **8080** (HTTP) e **8443** (HTTPS). As portas públicas são **apenas
  80 e 443**, mapeadas no `docker-compose.yml`.
- A origem usa o modo **HTTP-only por padrão**; ao montar os certificados em
  `/etc/nginx/certs`, o entrypoint ativa HTTPS automaticamente (necessário
  para o Cloudflare **Full (strict)**).

---

## 2. Componentes entregues no repositório

| Ficheiro | Responsabilidade |
|----------|------------------|
| `Dockerfile` | Build multi-stage (Next → export; módulo Brotli; Nginx pinado). Sem devDependencies, sem credenciais. |
| `.dockerignore` | Mantém o contexto de build enxuto; exclui `.env*`, `node_modules`, `.next`, `out`, `.git`, `certs`, `docs`. |
| `docker-compose.yml` | `restart: unless-stopped`; portas públicas só 80/443; logs stdout/stderr; CSP/HSTS por env; certificados por bind mount. |
| `infra/nginx/nginx.conf.template` | Config HTTP (8080): compressão Brotli+gzip, cache headers, 404 própria, `/healthz`, security headers, `try_files` estático. |
| `infra/nginx/nginx.ssl.conf.template` | Config HTTPS na origem (8443) + redirect HTTP→HTTPS (8080); TLS 1.2+; mesmo site/headers. |
| `infra/nginx/security-headers.conf.template` | CSP (configurável por env), `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`. |
| `infra/nginx/docker-entrypoint.sh` | Renderiza o CSP, deteta certificados e escolhe a config (HTTP ou HTTPS), ativa HSTS só com `HSTS_ENABLED=1`. |
| `scripts/deploy.sh` | Deploy reproduzível: build → upload (scp) → backup → swap → validação; `--rollback`, `--dry-run`, purge CF opcional. |

### Versões fixadas (reprodutibilidade)

| Componente | Versão |
|------------|--------|
| Node (build) | `node:24.19.0-alpine3.24` |
| Nginx (runtime) | `nginx:1.30.4-alpine3.24` |
| Nginx sources (módulo Brotli) | `1.30.4` (sha256 verificado no Dockerfile) |
| `google/ngx_brotli` | commit `a71f9312c2deb28875acc7bacfdd5695a111aa53` |

O build é reproduzível **sem credenciais**: os valores de build vêm de
`--build-arg` com defaults seguros (iguais aos do `.env.example`) e o módulo
Brotli é compilado de fontes fixadas com checksum.

---

## 3. Pré-requisitos do lançamento

- [ ] Domínio definitivo registado (a definir — fora do repo).
- [ ] VPS Hostinger com Docker Engine + Docker Compose instalados.
- [ ] DNS do domínio apontado para o Cloudflare (nameservers da conta Cloudflare).
- [ ] Conta Cloudflare com o domínio adicionado.
- [ ] Acesso SSH à VPS (`SERVER_HOST`, `SERVER_USER`).
- [ ] Certificado da origem (recomendado: **Cloudflare Origin CA**).
- [ ] Token do Cloudflare Web Analytics (issue #12).

---

## 4. Validação local (sem servidor, sem credenciais)

```bash
# 1) Validações do projeto (gate obrigatório antes de push)
npm ci
npm run lint
npm run typecheck
npm run build

# 2) Build da imagem
docker compose build

# 3) Subir o container (modo HTTP — sem certificados)
docker compose up -d

# 4) Smoke tests
curl -fsS http://localhost/healthz          # -> ok
curl -fsSI http://localhost/ | head -n 20   # security headers + CSP
curl -fsS -o /dev/null -w '%{http_code}\n' http://localhost/en/   # 200
curl -fsS -o /dev/null -w '%{http_code}\n' http://localhost/xyz   # 404

# Asset com hash: cache immutable
ASSET=$(curl -fsS http://localhost/ | grep -o '/_next/static/chunks/[^"]*\.js' | head -n1)
curl -fsSI "http://localhost${ASSET}" | grep -i cache-control
# -> Cache-Control: public, max-age=31536000, immutable

# Compressão Brotli na origem (o Nginx do container tem o módulo compilado)
curl -fsSI -H 'Accept-Encoding: br' "http://localhost${ASSET}" | grep -i content-encoding
# -> content-encoding: br
```

### Testar o modo HTTPS localmente (certificados auto-assinados — só local)

```bash
mkdir -p certs
openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
  -keyout certs/privkey.pem -out certs/fullchain.pem \
  -subj "/CN=localhost"
docker compose up -d --force-recreate
curl -k -fsS https://localhost/healthz        # ok (8443 interno)
curl -k -fsSI https://localhost/ | grep -i strict-transport  # ausente (HSTS off)
curl -fsSI http://localhost/ | head -n 1      # 301 para https://localhost/
# Limpar depois:
docker compose down && rm -rf certs
```

---

## 5. Deploy para a VPS Hostinger

### 5.1 Preparar o ambiente remoto (uma vez)

Na VPS:

```bash
sudo mkdir -p /opt/best-fluency
sudo chown "$USER" /opt/best-fluency
```

Criar `/opt/best-fluency/.env` (valores reais de produção, **nunca no repo**):

```bash
# .env remoto — valores reais do lançamento
IMAGE_TAG=2026-08-07
NEXT_PUBLIC_SITE_URL=https://<DOMINIO>
NEXT_PUBLIC_SITE_INDEXABLE=true
NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=<TOKEN_REAL_CF>
CSP_DEFAULT_SRC='self'
HSTS_ENABLED=0            # virar 1 apenas após validar HTTPS completo
HSTS_MAX_AGE=31536000
```

Montar os certificados (Cloudflare Origin CA):

```bash
mkdir -p /opt/best-fluency/certs
# Fazer upload de fullchain.pem + privkey.pem (Origin CA) para este diretório
chown -R 101:101 /opt/best-fluency/certs   # uid 101 = nginx no container
chmod 600 /opt/best-fluency/certs/privkey.pem
chmod 644 /opt/best-fluency/certs/fullchain.pem
```

> No `docker-compose.yml` do repo, descomente o bloco `volumes` que monta
> `./certs:/etc/nginx/certs:ro` (a cópia no servidor pode ser a do repo; o
> script de deploy envia o ficheiro sempre).

### 5.2 Executar o deploy

Na máquina de desenvolvimento (Linux/macOS/WSL; no Windows use Git Bash ou WSL):

```bash
SERVER_HOST=<IP_VPS> \
SERVER_USER=<utilizador_ssh> \
REMOTE_PATH=/opt/best-fluency \
DOMAIN=<DOMINIO> \
IMAGE_TAG=2026-08-07 \
./scripts/deploy.sh
```

O script executa, nesta ordem:

1. **Build local**: `npm ci` + `lint` + `typecheck` + `build` + `docker build`
   (com os `NEXT_PUBLIC_*` do ambiente). Use `--skip-build` para reutilizar a
   imagem já construída.
2. **Upload**: `docker save | gzip` → `scp` para o servidor; envia também o
   `docker-compose.yml` (fonte única de verdade da configuração).
3. **Backup** no servidor (`/opt/best-fluency/backups/<timestamp>/`):
   - `docker-compose.yml` e `.env` atuais;
   - imagem Docker em execução (`image-previous.tar.gz`) para rollback imediato.
4. **Swap**: `docker load` da nova imagem + `docker compose up -d --no-build`
   (o container tem `restart: unless-stopped`).
5. **Purge Cloudflare** (opcional): se `CF_API_TOKEN` e `CF_ZONE_ID` estiverem
   definidos no ambiente, faz `purge_cache` da zona.
6. **Validação pós-deploy** (ver secção 7).

> `--dry-run` imprime os passos sem tocar no servidor.

---

## 6. Rollback e backup

### Rollback imediato (para a imagem anterior)

```bash
SERVER_HOST=<IP_VPS> \
SERVER_USER=<utilizador_ssh> \
REMOTE_PATH=/opt/best-fluency \
./scripts/deploy.sh --rollback
```

O script restaura o `image-previous.tar.gz` e o `docker-compose.yml` do backup
mais recente e sobe o container anterior.

### Rollback manual

```bash
ssh <utilizador_ssh>@<IP_VPS>
cd /opt/best-fluency
ls -1t backups/            # escolher o timestamp desejado
docker load -i backups/<TS>/image-previous.tar.gz
docker compose up -d --no-build
```

### Backup

- **Configuração:** cada deploy grava `docker-compose.yml` e `.env` em
  `backups/<TS>/` antes de alterar.
- **Imagem anterior:** gravada em `backups/<TS>/image-previous.tar.gz`.
- Os `backups/` ficam na VPS. Para retenção/offsite, copie o diretório para
  outro local (ex.: `rsync`) conforme a política do projeto.

---

## 7. Validação pós-deploy

O `scripts/deploy.sh` valida automaticamente:

| Verificação | Comando (conceptual) |
|-------------|----------------------|
| Healthcheck | `curl -fsS https://<DOMINIO>/healthz` → 200 |
| Página raiz | `curl -fsS https://<DOMINIO>/` → 200 + contém "Best Fluency" |
| Locale | `curl -fsS https://<DOMINIO>/en/` → 200 |
| 404 própria | rota inexistente → HTTP 404 com `404.html` do export |
| Security headers | CSP, `X-Content-Type-Options`, `Referrer-Policy` presentes |
| Asset com hash | `Cache-Control: public, max-age=31536000, immutable` |
| `CF-Cache-Status` | presente quando o proxy Cloudflare está ativo |
| Compressão | `Content-Encoding: br` (ou gzip) na origem |

Para validar a origem direta antes do DNS/Cloudflare estar pronto, use
`ORIGIN_CHECK_URL=http://<IP_VPS>` (a validação então não espera `CF-Cache-Status`).

### Verificação manual do `CF-Cache-Status`

```bash
ASSET=$(curl -fsS https://<DOMINIO>/ | grep -o '/_next/static/chunks/[^"]*\.js' | head -n1)
curl -fsSI "https://<DOMINIO>${ASSET}" | grep -i cf-cache-status
# Possíveis valores: HIT / MISS / REVALIDATED / EXPIRED / DYNAMIC / BYPASS
# Esperado após aquecimento: HIT para assets com hash.
```

---

## 8. Configuração Cloudflare (passo a passo, no lançamento)

### 8.1 DNS e proxy

1. Adicionar o domínio à conta Cloudflare e usar os nameservers indicados.
2. Registos DNS (valores reais a preencher no painel):
   - `A` `@` → `<IP_VPS>` com **proxy ativo** (nuvem laranja).
   - `A` `www` → `<IP_VPS>` com **proxy ativo**.
   - (`AAAA` apenas se a VPS tiver IPv6.)
3. Confirmar "Proxied" (laranja) — o proxy é o que dá cache/HTTP3/WAF.

### 8.2 SSL/TLS

1. **Modo SSL**: `SSL/TLS > Overview > Full (strict)`.
2. **Certificado da origem**: `SSL/TLS > Origin Server > Create Certificate`
   (Cloudflare Origin CA, 15 anos). Guardar `fullchain.pem` + `privkey.pem`
   e montar em `/etc/nginx/certs` (secção 5.1). O container ativa HTTPS
   automaticamente.
   > O certificado Origin CA é confiado apenas pelo Cloudflare — acesso direto
   > pelo browser à origem mostra aviso, o que ajuda a desincentivar acesso
   > direto (ver 8.7).
3. **Always Use HTTPS**: `SSL/TLS > Edge Certificates > Always Use HTTPS = ON`
   (redirect HTTP→HTTPS no edge). A origem também redireciona (defesa em
   profundidade).
4. **TLS mínimo**: `Minimum TLS Version = 1.2`.
5. **HSTS**: **apenas depois de validar** HTTPS completo + subdomínios:
   - Primeiro validar: `https://<DOMINIO>`, `https://www.<DOMINIO>`, `/healthz`,
     `/en/`, 404, security headers, sem erros de certificado.
   - Depois: `HSTS_ENABLED=1` no `.env` remoto + redeploy (o header é emitido
     pela origem), **ou** ativar HSTS no painel Cloudflare (`Edge Certificates
     > HSTS`). Não ativar `preload` sem confirmar a política de subdomínios.

### 8.3 Cache

- **Assets com hash** (`/_next/static/*`): cache longo + `immutable` já
  enviado pela origem; o Cloudflare cacheia por extensão/regra default.
- **HTML**: a origem envia `no-cache` (revalidação no browser). **Não** ativar
  cache de HTML no edge por defeito.
- **Cache Rule para HTML** (opcional, só após validar purge): criar regra
  `URI path contains /` com `Cache level = Cache Everything` + `Edge TTL`
  curto (ex.: 5 min) **apenas** se o fluxo de purge estiver testado.
- **Purge pós-deploy**: executar o deploy com `CF_API_TOKEN`/`CF_ZONE_ID`
  definidos (o script purga automaticamente) ou manualmente:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/purge_cache" \
  -H "Authorization: Bearer <CF_API_TOKEN>" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

- Validar após o purge: asset → `cf-cache-status: MISS` na 1.ª request e
  `HIT` nas seguintes; página → 200.

### 8.4 Performance

- **HTTP/3**: ativo por defeito no Cloudflare para clientes compatíveis
  (nada a fazer na origem).
- **Brotli/Zstd**: o Cloudflare serve Brotli aos visitantes; a origem também
  comprime com Brotli (módulo embutido) com fallback gzip. Zstd fica a cargo
  do edge conforme suporte do cliente/plano.
- **Polish (otimização de imagens)**: **manter OFF**. A pipeline de assets do
  projeto já emite AVIF/WebP pré-otimizados com `srcset` (ADR-0001); o Polish
  duplicaria o trabalho e poderia regredir qualidade. Reavaliar apenas se o
  plano incluir e um teste provar ganho real (Lighthouse/CWV).

### 8.5 Segurança (WAF / bots)

- **Bot Fight Mode** (plano Free): ativar e testar — verificar que os
  verificadores (Google, Bing) e o uptime externo continuam a passar.
- **Managed Rules (WAF)** (planos pagos): ativar o conjunto recomendado e
  testar a landing (7 locales, WhatsApp, analytics).
- **Não ativar** regras que modifiquem JavaScript (ex.: Auto Minify/email
  obfuscation) sem testes completos — o bundle do Next.js não deve ser
  alterado às cegas.

### 8.6 Cloudflare Web Analytics (issue #12)

1. No painel: `Analytics & Logs > Web Analytics > Add a site`.
2. Criar para o domínio definitivo; obter o **token real**.
3. Definir `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=<TOKEN>` no build (env local
   ou `.env` remoto) e **rebuildar a imagem** (o beacon só é injetado quando o
   token existe — `shared/components/analytics/cloudflare-web-analytics.tsx`).
4. Confirmar no browser: `Network > static.cloudflareinsights.com/beacon.min.js`
   carregado; sem cookies (sem consentimento necessário).
5. Métricas: visitas, origens, países, dispositivos e **Core Web Vitals reais**
   (ver `docs/analytics-kpis.md`).

### 8.7 Limitar acesso direto à origem

Recomendado (após o deploy real):

- **Firewall na VPS** (painel Hostinger ou ufw/iptables):
  - Permitir 80/443 **apenas** para as ranges do Cloudflare
    (`https://www.cloudflare.com/ips/`).
  - Permitir 22 (SSH) apenas para o IP administrativo da equipa.
- Alternativa avançada: **Cloudflare Tunnel** (elimina portas públicas; exigiria
  ajuste do fluxo de deploy — documentar antes de adotar).

### 8.8 Monitorização e alertas

| Alvo | Ferramenta sugerida | Verificação |
|------|---------------------|-------------|
| Disponibilidade | UptimeRobot/StatusCake (monitor HTTP) | `https://<DOMINIO>/` e `https://<DOMINIO>/healthz` com alerta em downtime |
| Certificado | UptimeRobot (monitor SSL) / calendário | alerta X dias antes da expiração (Origin CA: 15 anos; edge: automático) |
| Core Web Vitals | Cloudflare Web Analytics | LCP/INP/CLS reais por dispositivo/página |
| Erros de cache | `CF-Cache-Status` + logs do container | acesso `docker logs best-fluency-web` (stdout/stderr) |

---

## 9. Segurança dos headers (resumo do que a origem envia)

| Header | Valor (padrão) | Configurável |
|--------|----------------|--------------|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; ...` | `CSP_DEFAULT_SRC` (env) |
| `X-Content-Type-Options` | `nosniff` | — |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | — |
| `X-Frame-Options` | `DENY` (e `frame-ancestors 'none'` no CSP) | — |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=()` | — |
| `Strict-Transport-Security` | ausente por padrão | `HSTS_ENABLED=1` (após validação) |

> **CSP e export estático:** o Next.js emite scripts inline de bootstrap
> (RSC/theme) — por isso `script-src` inclui `'unsafe-inline'`. Nonces não são
> viáveis num artefacto 100% estático; o CSP ainda bloqueia `eval`, objetos,
> iframes e fontes externas não listadas.

---

## 10. Checklist de lançamento (o que só é possível no dia do lançamento)

| # | Item (aceite da issue #14) | Estado agora | Onde/Como no lançamento |
|---|----------------------------|--------------|-------------------------|
| 1 | `docker build` reproduzível sem credenciais | ✅ Entregue | `docker compose build` (validado localmente) |
| 2 | Imagem pequena, multi-stage, sem devDependencies | ✅ Entregue | `Dockerfile` (3 stages; runtime só nginx + estático) |
| 3 | Container não-root com healthcheck funcional | ✅ Entregue | `USER nginx` + `HEALTHCHECK` (`/healthz`) |
| 4 | Compose `restart: unless-stopped`; logs stdout/stderr | ✅ Entregue | `docker-compose.yml` + `access_log /dev/stdout` |
| 5 | Nginx: compressão, cache headers, 404 própria, `/healthz` | ✅ Entregue | `infra/nginx/*` (validado com curl local) |
| 6 | Security headers (CSP, nosniff, referrer, framing) | ✅ Entregue | `security-headers.conf.template` |
| 7 | Deploy na VPS com domínio apontado | ⏳ Lançamento | Secção 5 (requer VPS/domínio reais) |
| 8 | Portas públicas só 80/443; sem porta dev | ✅ Entregue (config) | `docker-compose.yml`; confirmar firewall no lançamento |
| 9 | Script reprodutível com rollback e backup de config | ✅ Entregue | `scripts/deploy.sh` (`--rollback`, backups/TS) |
| 10 | Validação pós-deploy | ✅ Entregue (rotina) | Secção 7; executar no lançamento |
| 11 | Cloudflare proxy + Full (strict) + cert origem | ⏳ Lançamento | Secção 8.1/8.2 (requer conta CF) |
| 12 | HTTP→HTTPS, TLS mínimo, HSTS após validação | ⏳ Lançamento | Secção 8.2 (Always Use HTTPS; `HSTS_ENABLED`) |
| 13 | Assets immutable; HTML revalida; `CF-Cache-Status` | ✅ Entregue (origem) / ⏳ verificar no CF | Secções 7/8.3 |
| 14 | Purge pós-deploy validado | ⏳ Lançamento | `CF_API_TOKEN`/`CF_ZONE_ID` → purge automático no deploy.sh |
| 15 | CF Web Analytics + uptime externo + alertas | ⏳ Lançamento | Secção 8.6/8.8 (token real) |
| 16 | Runbook entregue | ✅ Entregue | Este documento |

**Confirmação de segurança:** nenhuma credencial, domínio, IP ou token foi
adicionado ao repositório. Tudo é parametrizado por ambiente ou documentado
com placeholders.

---

## 11. Manutenção

- **Atualizar conteúdo**: alterar conteúdo → `npm run build` → deploy (`IMAGE_TAG` nova; o rollback volta ao `previous`).
- **Subir versões de imagem base**: atualizar `Dockerfile` (Node/Nginx pinados) e revalidar localmente (incluindo o módulo Brotli).
- **Verificar `CF-Cache-Status` após cada deploy** e purgar sempre que o HTML/edge caching estiver ativo.
- **Logs**: `docker logs -f best-fluency-web` (stdout/stderr); erros vão para stderr.
