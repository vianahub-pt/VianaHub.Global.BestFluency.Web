# Analytics e KPIs — Landing Best Fluency

- **Issue:** [#12 — Implementar analytics e eventos de conversão de WhatsApp](https://github.com/vianahub-pt/VianaHub.Global.BestFluency.Web/issues/12)
- **Spec:** secções 20 (WhatsApp), 22 (Medição e analytics), 28 (Cloudflare) e 29 (Privacidade)
- **ADR:** [ADR-0001 — Arquitetura inicial static-first](docs/adr/ADR-0001.md)

## Fase atual (Fase 1 — sem cookies)

Só está ativo o **Cloudflare Web Analytics**, que mede visitas, páginas vistas,
origens de tráfego, dispositivos, países e Core Web Vitals reais **sem usar
cookies e sem exigir consentimento**.

**Não são carregados** GA4, Google Ads, Meta Pixel ou qualquer outro script de
terceiros nesta fase. Eles só serão adicionados quando existirem:

1. plano de medição aprovado;
2. consentimento para tecnologias não essenciais;
3. política de privacidade e cookies atualizada;
4. mecanismo para aceitar, recusar e alterar preferências.

Os eventos de conversão já ficam instrumentados num `dataLayer` tipado
(`shared/lib/analytics.ts`), sem acoplar fornecedor — prontos para serem
consumidos por GTM/GA4 depois do mecanismo de consentimento.

## Configuração

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SITE_URL` | Sim (produção) | URL pública definitiva (canonical, hreflang, sitemap, JSON-LD) |
| `NEXT_PUBLIC_SITE_INDEXABLE` | Não | `true` apenas no lançamento oficial (remove `noindex`) |
| `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` | Não | Token real do Cloudflare Web Analytics. **Vazio = beacon desativado** |

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

Os UTM são lidos de `location.search` **uma única vez por sessão** (client-side,
guardado) e reutilizados em todos os eventos — preservando a atribuição da
campanha mesmo com navegação entre os 7 idiomas.

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

O rótulo real de cada CTA vem do contrato de conteúdo localizado
(`domains/landing/content/{locale}.ts`), por isso o `cta_label` reflete o idioma
da rota (pt-PT, en-US, es-ES, fr-FR, de-DE, it-IT, pt-BR).

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
- **Conversões (`whatsapp_click`):** até existir GA4/GTM com consentimento, o
  dado fica no `dataLayer` (pronto para integração futura) e pode ser auditado
  em desenvolvimento via `console.debug`. Após a Fase 2 (com consentimento),
  exportar os eventos para o GA4 e correlacionar com CRM/WhatsApp Business.

## Privacidade (spec §29)

- Nenhum pixel ou cookie **não essencial** é carregado antes da decisão do
  utilizador. O único script externo é o beacon do Cloudflare Web Analytics,
  que **não usa cookies**.
- Quando as páginas legais forem publicadas (pendente, spec §31), a **Política
  de Privacidade** deve informar que o clique no WhatsApp **encaminha o
  utilizador para um serviço externo** (WhatsApp/Meta), sujeito às políticas
  desse fornecedor.
- Fase 2 (GA4/Ads/Pixel) depende de plano de medição, consentimento, política
  atualizada e mecanismo de aceitar/recusar/alterar preferências.

## Validação manual (aceite #12, item 10)

Com o token preenchido (ou não — o evento de clique independe do beacon):

1. `npm install` e `npm run dev`.
2. Abrir uma rota com UTM de teste, ex.:
   `http://localhost:3000/?utm_source=test&utm_medium=manual&utm_campaign=qa12`.
3. DevTools → Console → filtrar `[analytics]`.
4. Clicar em **cada** CTA de WhatsApp das 10 ocorrências (header desktop,
   header móvel, hero, individual, group, best kids, depoimentos, como começar,
   CTA final, footer) e confirmar:
   `[analytics] whatsapp_click {section: "...", cta_label: "...", utm_source: "test", ...}`.
5. Confirmar que `section`/`cta_label`/`modality` batem com a tabela acima e que
   os UTM de teste aparecem **em todos** os eventos (lidos uma vez na sessão).
6. Navegar para outra rota de idioma (`/en/`) e clicar num CTA: os UTM devem
   persistir (cache de sessão).
7. Verificar que NENHUM request para `googletagmanager.com`, `googleadservices`
   ou `facebook.net` aparece na aba Network.
8. Confirmar que o beacon `static.cloudflareinsights.com/beacon.min.js` só é
   carregado quando `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` está preenchido.

## Arquivos relacionados

- `shared/lib/analytics.ts` — modelo de eventos, UTM de sessão, `trackWhatsAppClick`
- `shared/components/whatsapp-link.tsx` — CTA WhatsApp com evento
- `shared/components/phone-link.tsx` — CTA telefone com evento
- `shared/components/analytics/cloudflare-web-analytics.tsx` — beacon CF
- `shared/components/layout/document-shell.tsx` — injeção do beacon nas 7 rotas
- `core/config/site.ts` — leitura de `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN`
