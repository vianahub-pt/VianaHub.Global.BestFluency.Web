# Analytics e KPIs — Landing Best Fluency

- **Issue:** [#12 — Implementar analytics e eventos de conversão de WhatsApp](https://github.com/vianahub-pt/VianaHub.Global.BestFluency.Web/issues/12)
- **Spec:** secções 20 (WhatsApp), 22 (Medição e analytics), 28 (Cloudflare) e 29 (Privacidade)
- **ADR:** [ADR-0001 — Arquitetura inicial static-first](docs/adr/ADR-0001.md)

## Fase atual (Fase 2 — consentimento ativo)

### Cloudflare Web Analytics (sem cookies)

Continua ativo como medição base **sem cookies e sem consentimento**.
Mede visitas, páginas vistas, origens de tráfego, dispositivos, países e
Core Web Vitals reais.

### Google Analytics 4 (com consentimento)

GA4 está disponível **apenas após aceite do utilizador** through Basic
Consent Mode v2. Quando o utilizador aceita:

- `analytics_storage = granted`
- `ad_storage = denied`
- `ad_user_data = denied`
- `ad_personalization = denied`

Quando recusa ou não decide:

- GA4 não é carregado
- Nenhum request é enviado para Google
- Nenhum cookie GA4 (_ga, _ga_*) é criado

O utilizador pode alterar a sua escolha a qualquer momento via
"Gerir cookies" no footer.

**Measurement ID:** `NEXT_PUBLIC_GA_MEASUREMENT_ID` (não hardcode).

### Eventos

Os eventos de conversão (`whatsapp_click`, `phone_click`, `location_click`,
`faq_open`) são sempre registados no `dataLayer` local e em `console.debug`
em desenvolvimento. Só são enviados ao GA4 quando:

1. `consent === "accepted"` (localStorage)
2. `window.gtag` está disponível (script GA4 carregado)

Eventos disparados **antes** do consentimento **não são enviados
retroativamente** ao GA4 quando o utilizador aceita posteriormente.

## Configuração

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SITE_URL` | Sim (produção) | URL pública definitiva (canonical, hreflang, sitemap, JSON-LD) |
| `NEXT_PUBLIC_SITE_INDEXABLE` | Não | `true` apenas no lançamento oficial (remove `noindex`) |
| `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` | Não | Token real do Cloudflare Web Analytics. **Vazio = beacon desativado** |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Não | GA4 Measurement ID. **Só carregado após consentimento** |

> O token real ainda **não existe** (domínio definitivo pendente). Não inventar
> token: o beacon só é injetado quando a variável estiver preenchida
> (`core/config/site.ts` → `CloudflareWebAnalytics`). Preencher apenas quando o
> proprietário da conta Cloudflare fornecer o token do domínio publicado.

## Modelo de eventos

Todos os eventos são enviados para `window.dataLayer` e logados em
desenvolvimento via `console.debug("[analytics]", ...)` para validação manual.

### `whatsapp_click` — clique num CTA de WhatsApp

Emissor: `WhatsAppLink` → helper central `trackWhatsAppClick(section, ctaLabel, modality?)`.

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `section` | enum | sim | Secção da landing onde o CTA está |
| `cta_label` | string | sim | Rótulo visível do CTA (localizado por idioma) |
| `modality` | enum | condicional | `individual`, `group` ou `best_kids` |
| `utm_source` / `utm_medium` / `utm_campaign` / `utm_term` / `utm_content` | string | condicional | UTM da sessão, quando disponíveis |

Os UTM são lidos de `location.search` **uma única vez por sessão** (client-side)
e persistidos no `sessionStorage` (`best-fluency:utm:session`), sendo
reutilizados em todos os eventos — preservando a atribuição da campanha mesmo
com navegação SPA entre os 9 idiomas. A persistência em `sessionStorage` é
necessária porque a navegação SPA do Next.js App Router cria novas instâncias
do módulo por chunk/segmento de rota (uma cache apenas em memória seria
reiniciada ao trocar de idioma). Navegações seguintes **sem** UTM na URL não
sobrescrevem os UTM capturados na entrada da sessão.

### `phone_click` — clique no telefone (footer)

Emissor: `PhoneLink`. Parâmetros: `section`, UTM.

### `location_click` / `faq_open`

Reservados no tipo do dataLayer para fases futuras (link do Maps e FAQ
interativa). Não são emitidos nesta versão.

## CTAs de WhatsApp instrumentados (landing)

| Secção (`section`) | `cta_label` (pt-PT) | `modality` | Componente |
|--------------------|---------------------|------------|------------|
| `header` | CTA do header (desktop) | — | `site-header.tsx` |
| `header` | CTA do header (menu móvel) | — | `mobile-menu.tsx` |
| `hero` | CTA do hero | — | `hero.tsx` |
| `individual` | CTA do card individual | `individual` | `modalities.tsx` |
| `group` | CTA do card turmas | `group` | `modalities.tsx` |
| `best_kids` | CTA da Best Kids | `best_kids` | `best-kids.tsx` |
| `testimonials` | CTA após depoimentos | — | `testimonials.tsx` |
| `journey` | CTA do "Como começar" | — | `journey.tsx` |
| `final_cta` | CTA final (cartão de embarque) | — | `final-cta.tsx` |
| `footer` | WhatsApp do footer | — | `site-footer.tsx` |

O rótulo real de cada CTA vem do conteúdo localizado
(`locales/{locale}/common.json`, namespace `landing.*`), por isso o `cta_label` reflete o idioma
da rota (pt-PT, en-US, es-ES, fr-FR, de-DE, it-IT, ja-JP, ru-RU, zh-CN).

## KPIs (spec §22)

| KPI | Definição | Fonte |
|-----|-----------|-------|
| Visitas por canal | Visitas/páginas vistas por origem e meio | Cloudflare Web Analytics |
| Taxa de clique no WhatsApp | `whatsapp_click` / visitas (ou páginas vistas) | dataLayer + CF |
| Cliques por secção | Contagem de `whatsapp_click` agrupada por `section` | dataLayer |
| Contactos qualificados | Conversas com mensagem contextual (ex.: aula experimental) iniciadas a partir dos cliques | WhatsApp Business / CRM |
| Custo por contacto por campanha | Investimento da campanha / contactos atribuídos (via UTM) | Ads + dataLayer + CRM |
| Percentagem mobile | Share de visitas/eventos em dispositivos móveis | Cloudflare Web Analytics |
| LCP / INP / CLS (p75) | Core Web Vitals reais no percentil 75 | Cloudflare Web Analytics |

### Leitura recomendada

- **Visitas, origens, dispositivos, países e CWV:** dashboard do Cloudflare Web
  Analytics (Web Analytics → site do domínio definitivo).
- **Conversões (`whatsapp_click`):** com consentimento GA4 ativo, os eventos são
  exportados para GA4 e correlacionados com CRM/WhatsApp Business. Sem
  consentimento, o dado fica no `dataLayer` local e pode ser auditado em
  desenvolvimento via `console.debug`.

## Privacidade (spec §29)

- Nenhum pixel ou cookie **não essencial** é carregado antes da decisão do
  utilizador. O único script externo sem consentimento é o beacon do Cloudflare
  Web Analytics, que **não usa cookies**.
- GA4 só é carregado após aceite explícito do utilizador (Basic Consent Mode v2).
- Publicidade (Google Ads) permanece **permanentemente denied** — não estamos a
  ativar Google Ads.
- O utilizador pode alterar a sua escolha a qualquer momento via "Gerir cookies"
  no footer.
- Quando as páginas legais forem publicadas (pendente, spec §31), a **Política
  de Privacidade** deve informar que o clique no WhatsApp **encaminha o
  utilizador para um serviço externo** (WhatsApp/Meta), sujeito às políticas
  desse fornecedor.

## Validação manual (aceite #12, item 10)

Com o token preenchido (ou não — o evento de clique independe do beacon):

### Cenário A — primeira visita (sem consentimento)

1. `npm install` e `npm run dev`.
2. Abrir aba anónima.
3. Antes de clicar no banner:
   - Network NÃO deve conter requests para `googletagmanager.com` ou `google-analytics.com`.
   - Application/Cookies NÃO deve conter `_ga` ou `_ga_*`.
   - Banner de cookies deve estar visível.
4. DevTools → Console → filtrar `[analytics]`.

### Cenário B — recusar

1. Clicar "Recusar" no banner.
2. Banner desaparece.
3. Google NÃO deve carregar — não devem existir requests GA.
4. Recarregar página — banner não reaparece.

### Cenário C — aceitar

1. Limpar storage ou abrir nova aba anónima.
2. Clicar "Aceitar estatísticas".
3. Deve aparecer request para `googletagmanager.com/gtag/js`.
4. GA4 pode então enviar requests de medição.
5. Consent Mode esperado:
   - `analytics_storage = granted`
   - `ad_storage = denied`
   - `ad_user_data = denied`
   - `ad_personalization = denied`

### Cenário D — persistência

1. Com consentimento aceito, recarregar a página.
2. Banner não aparece.
3. GA carrega porque `accepted` já está persistido.

### Cenário E — alterar preferência

1. Clicar "Gerir cookies" no footer.
2. Banner reaparece.
3. Alterar para "Recusar".
4. GA deixa de carregar/enviar.

### Cenário F — evento WhatsApp

1. Com consentimento aceito:
   - Clicar num CTA de WhatsApp.
   - Deve existir `whatsapp_click` com `section`, `cta_label`, `modality` (quando aplicável) e UTM.
2. Sem consentimento:
   - O mesmo clique NÃO deve ser enviado ao GA4.

### Google Tag Assistant

Para validar com Google Tag Assistant:

1. Aceitar cookies no banner.
2. Abrir Tag Assistant (https://tagassistant.google.com/) e conectar ao site.
3. Verificar que o consent state mostra `analytics_storage: granted`.
4. Verificar que `page_view` é disparado.
5. Clicar num CTA de WhatsApp e verificar `whatsapp_click`.
6. Confirmar que não existem erros de consent para Ads (`ad_storage: denied` é esperado).

## Arquivos relacionados

- `shared/lib/consent.ts` — utilitário de consentimento (leitura/escrita/eventos)
- `shared/lib/analytics.ts` — modelo de eventos, UTM de sessão, `trackWhatsAppClick` (consent-aware)
- `shared/components/analytics/consent-manager.tsx` — banner de consentimento
- `shared/components/analytics/cookie-settings-button.tsx` — botão "Gerir cookies" (footer)
- `shared/components/analytics/google-analytics.tsx` — GA4 com consent mode
- `shared/components/analytics/cloudflare-web-analytics.tsx` — beacon CF (sem cookies)
- `shared/components/layout/document-shell.tsx` — injeção do analytics nas 9 rotas
- `domains/landing/components/site-footer.tsx` — botão "Gerir cookies"
- `core/config/site.ts` — leitura de `NEXT_PUBLIC_GA_MEASUREMENT_ID`
