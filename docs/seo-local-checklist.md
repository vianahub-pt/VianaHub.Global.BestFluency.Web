# SEO local — checklist pós-publicação

> Issue [#11 — Implementar SEO on-page, dados estruturados e SEO local](https://github.com/vianahub-pt/VianaHub.Global.BestFluency.Web/issues/11)
> Base: `docs/landing-page-spec-v2.md` §21 (SEO) e `docs/analise-site-best-fluency.md`.

Este documento descreve as ações de **SEO local externo** que devem ser executadas
**após a publicação oficial** da landing (espec §21, "SEO local externo"). As
ações técnicas on-page (title/description por idioma, H1 único, Open Graph,
JSON-LD, favicon, robots.txt e sitemap.xml) já estão implementadas no código e
não fazem parte desta checklist.

Dados confirmados (NAP — não inventar nada além disto):

| Campo      | Valor                                                       |
| ---------- | ----------------------------------------------------------- |
| Nome       | Best Fluency Language School                                |
| Telefone   | +351 214 744 028                                            |
| Morada     | Avenida Chaby Pinheiro, 5, Venda Nova — Amadora, Lisboa, PT |
| Localidade | Amadora (addressLocality)                                   |
| Região     | Lisboa (addressRegion)                                      |
| País       | PT (addressCountry)                                         |

Pendentes de confirmação (NÃO adicionar ao JSON-LD/GBP até confirmar):
código postal, coordenadas, horários, e-mail, perfis sociais e domínio definitivo.

---

## 1. Requisitos do build de produção

Antes de qualquer ação externa, o build de produção deve ser gerado com:

```bash
NEXT_PUBLIC_SITE_URL=https://<dominio-definitivo>/   # domínio confirmado
NEXT_PUBLIC_SITE_INDEXABLE=true                      # remove noindex das rotas
NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=<token>             # Cloudflare Web Analytics (ver docs/analytics-kpis.md)
npm run build
```

Sem `NEXT_PUBLIC_SITE_INDEXABLE=true` as 7 rotas saem com `noindex`
(comportamento intencional antes do lançamento — ver ADR 0001).

## 2. Google Search Console (GSC)

- [ ] **Verificar a propriedade** do domínio definitivo (método "Domínio" ou
      "Prefixo de URL" com o HTTPS final) e adicionar todos os colaboradores
      responsáveis.
- [ ] **Enviar o sitemap** em GSC → Sitemaps: `https://<dominio>/sitemap.xml`.
      Confirmar estado "Sucesso" e o número de URLs descobertas (7 rotas).
- [ ] **Confirmar robots.txt** acessível: `https://<dominio>/robots.txt` sem
      bloqueios e com a referência ao sitemap.
- [ ] **Validar indexação das 7 rotas** em GSC → Inspeção de URL:
      `/`, `/en/`, `/es/`, `/fr/`, `/de/`, `/it/`, `/pt-br/`. Cada uma deve
      estar "Indexada" ou "Pendente de rastreamento" (nunca "Excluída" por
      noindex).
- [ ] **Verificar canonical e hreflang** em GSC → Inspeção de URL → "Testar
      URL ativa": a canonical deve ser autorreferencial e os hreflang recíprocos
      devem apontar para as 7 URLs + `x-default` para `/`.
- [ ] **Monitorar Cobertura do índice** durante 2–4 semanas; corrigir erros
      reportados (duplicados, páginas alternadas, 404).
- [ ] **Ligação GSC ↔ Analytics** (Cloudflare Web Analytics ou GA4 quando
      implementado) para medir impressões e CTR por idioma.

## 3. Google Business Profile (GBP)

- [ ] **Verificar a elegibilidade real da localização** antes de criar o perfil:
      a escola funciona num espaço presencial atendido ao público? Se sim,
      criar o perfil com endereço físico; se não (apenas online/atendimento
      agendado), seguir as regras de serviço da área para o modelo de negócio.
- [ ] **Criar/reivindicar o perfil** com nome EXATO: `Best Fluency Language School`.
- [ ] **Categoria principal:** `Language school` (escola de idiomas); categorias
      secundárias apenas se aplicáveis e reais.
- [ ] **NAP consistente** (nome, morada, telefone) idêntico ao do site: - Telefone: `+351 214 744 028`; - Morada: `Avenida Chaby Pinheiro, 5, Venda Nova — Amadora`; - Cidade: `Amadora`; Região: `Lisboa`; País: `Portugal`.
- [ ] **Adicionar o URL do site** no perfil (domínio definitivo) e o botão de
      WhatsApp quando a Google permitir link direto.
- [ ] **Fotos institucionais autorizadas** (interior/exterior/fachada) — apenas
      imagens com autorização; nunca rostos não autorizados.
- [ ] **Horários**: adicionar apenas quando confirmados pela escola.
- [ ] **Responder a avaliações** reais (nunca pedir avaliações inventadas nem
      influenciar ratings).

## 4. Consistência NAP fora do site

- [ ] Auditar citações locais (diretórios, mapas, redes sociais) para manter
      nome/morada/telefone idênticos ao site e ao GBP.
- [ ] Evitar variações (ex.: "Best Fluency", "Best Fluency School", endereços
      diferentes) que fragmentam o sinal local.
- [ ] Se forem criados perfis sociais, adicionar `sameAs` ao JSON-LD apenas
      depois de confirmados e públicos.

## 5. Campanhas e medição

- [ ] Utilizar URLs com UTM nas campanhas (ex.: `?utm_source=google&utm_medium=cpc`)
      conforme o plano de medição aprovado (espec §22).
- [ ] Rever o relatório de desempenho por idioma no GSC após 30 dias e ajustar
      title/description se o CTR estiver baixo (sem stuffing).
- [ ] Manter o checklist em dia quando o domínio definitivo ou novos dados NAP
      forem confirmados (atualizar `core/config/site.ts` + JSON-LD + GBP).

---

## Riscos e limites

- **Domínio definitivo pendente:** as URLs canónicas/OG usam
  `NEXT_PUBLIC_SITE_URL` (fallback local apenas para dev). Nada neste documento
  assume um domínio inventado.
- **Dados não confirmados** (código postal, coordenadas, horários, e-mail,
  sociais) **não entram** no JSON-LD nem no GBP até confirmação da escola.
- **Review/AggregateRating** permanecem proibidos no JSON-LD (espec §21) — nunca
  adicionar avaliações inventadas em benefício próprio.
