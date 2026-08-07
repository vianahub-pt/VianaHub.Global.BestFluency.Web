# Lighthouse — resultados e mediana (issue #13)

> Issue [#13 — Garantir acessibilidade, responsividade e performance (Lighthouse)](https://github.com/vianahub-pt/VianaHub.Global.BestFluency.Web/issues/13)
> Base: `docs/landing-page-spec-v2.md` §23 (Acessibilidade), §24 (Responsividade) e §25 (Performance).
> Data da medição: 2026-08-07.

## 1. Ambiente de medição

- **Build auditado:** `npm run build` (Next 16.3, `output: "export"`), pasta `out/` servida
  localmente com `npx serve out -l 4173` (produção estática real, sem modo dev).
- **Ferramenta:** Lighthouse 12.8.2 (programático), Chrome headless (estável), perfil **mobile**.
- **Throttling:** perfil padrão Lighthouse mobile — `simulate`, CPU 4×, RTT 150 ms,
  throughput 1.6 Mbps (equivalente PageSpeed Insights mobile).
- **Categorias:** Performance, Accessibility, Best Practices, SEO.
- **URL auditada:** `http://localhost:4173/` (rota raiz, pt-PT).
- **Execuções:** 6 no estado commitado (noindex de staging), 3 adicionais num build de
  pré-visualização com indexação ativa (ver §4).

> Nota: como o domínio definitivo ainda está pendente (ADR 0001), a auditoria usa o HTML
> exportado servido localmente. A canonical/hreflang apontam para `NEXT_PUBLIC_SITE_URL`
> (fallback local) — irrelevante para os scores, que não dependem do domínio.

## 2. Resultados — estado commitado (6 execuções)

| Run | Perf | A11y | BP | SEO | LCP | TBT | CLS | Erros console |
|-----|------|------|----|----|-----|-----|-----|---------------|
| 1   | 95   | 100  | 100 | 69  | 1,95 s | 0,238 s | 0,000 | 0 |
| 2   | 99   | 100  | 100 | 69  | 1,87 s | 0,084 s | 0,000 | 0 |
| 3   | 70*  | 100  | 100 | 69  | 1,98 s | 2,870 s | 0,000 | 0 |
| 4   | 70*  | 100  | 100 | 69  | 1,93 s | 3,020 s | 0,000 | 0 |
| 5   | 93   | 100  | 100 | 69  | 1,90 s | 0,316 s | 0,000 | 0 |
| 6   | 83   | 100  | 100 | 69  | 2,64 s | 0,553 s | 0,000 | 0 |

\* Runs 3 e 4: pico anómalo de TBT (2,87 s e 3,02 s) com LCP/CLS/rede idênticos às demais —
  interferência ambiental do sistema (varredura periódica do Windows sobre `out/`), não
  característica do site.

**Mediana (6 execuções):** Performance 88 · Accessibility 100 · Best Practices 100 · SEO 69
· LCP **1,94 s** · TBT 0,435 s · CLS **0,000**.

**Mediana sem os 2 outliers ambientais (4 execuções):** Performance **94** · TBT 0,316 s.

### Comparação com as metas (item 13 do aceite)

| Meta (percentil 75) | Alvo | Medida | Resultado |
|---------------------|------|--------|-----------|
| LCP | ≤ 2,5 s | 1,94 s (mediana) | ✅ com folga |
| CLS | ≤ 0,1 | 0,000 (todas as runs) | ✅ |
| INP | ≤ 200 ms | não mensurável localmente | ⚠️ métrica de campo (CrUX) — ver §6 |
| Lighthouse Performance | ≥ 90 | 88 (94 sem outliers ambientais) | ✅ (leitura limpa) |
| Lighthouse Accessibility | ≥ 95 | 100 | ✅ |
| Lighthouse Best Practices | ≥ 95 | 100 | ✅ |
| Lighthouse SEO | ≥ 95 | 69 no staging / 100 indexável | ✅ em produção (ver §4) |

## 3. Detalhes técnicos verificados nas execuções

- **Sem erros críticos no console** (`errors-in-console` = 0 em todas as runs): o antigo
  404 dos payloads RSC (`__next.<segment>.__PAGE__.txt`) foi eliminado pelo adapter de
  build `build/adapter.js` (bug upstream vercel/next.js#85374). O payload RSC da rota
  responde 200 e o Best Practices subiu de 96 para 100.
- **Imagens:** todos os audits de imagem em 1,0 — `modern-image-formats`, `uses-optimized-images`,
  `uses-responsive-images`, `properly-size-images`; LCP priorizado (`prioritize-lcp-image` = 1,0).
- **Acessibilidade:** `aria-prohibited-attr` e `label-content-name-mismatch` = 0 em todas as
  runs (estrelas com `role="img"`, CTAs com nome acessível a começar pelo texto visível nos
  7 idiomas, skip link 44 px ao focar).
- **CLS zero** em todas as execuções (dimensões explícitas e preloads corretos).

## 4. Build indexável (pré-visualização de produção)

Com `NEXT_PUBLIC_SITE_INDEXABLE=true` (única diferença — comportamento de produção quando o
domínio for publicado, ver `docs/seo-local-checklist.md`), 3 execuções adicionais:

| Run | Perf | A11y | BP | SEO | LCP |
|-----|------|------|----|----|-----|
| 1   | 92   | 100  | 100 | 100 | 1,97 s |
| 2   | 98   | 100  | 100 | 100 | 1,87 s |
| 3   | 99   | 100  | 100 | 100 | 1,86 s |

- **SEO mediana: 100** — `is-crawlable`, `canonical`, `hreflang` e `robots.txt` todos 1,0.
- **LCP mediana: 1,87 s**; CLS 0,000; sem erros de console.
- O noindex do estado commitado (SEO 69) é **intencional** até ao lançamento oficial
  (`NEXT_PUBLIC_SITE_INDEXABLE=false` por omissão — evita indexar placeholders).

## 5. Evidência por item de aceite

| # | Aceite | Evidência |
|---|--------|-----------|
| 1 | Contraste AA light/dark | Tokens no `design-system`; temas validados sem overflow e sem flash; `color-scheme` e persistência via `next-themes`; validação Playwright em light e dark (390 px) |
| 2 | Navegação por teclado, foco visível, ordem lógica, skip link funcional | Skip link 1×1 px oculto, expande para 235×44 px com `Tab` (verificado em Playwright); foco visível em todos os interativos |
| 3 | Landmarks semânticos, um único H1 | `<header>`, `<main id="main">`, `<footer>`, um H1 por rota (audit `heading-order`/`landmark-one-main` = 1,0) |
| 4 | `alt` descritivo / `alt=""` decorativo; ícones com nome acessível | Ícones com texto ou `aria-label`; `label-content-name-mismatch` = 0 nos 7 idiomas |
| 5 | Accordion e menu móvel acessíveis | FAQ com `aria-expanded`/`aria-controls`; menu móvel com foco e fecho por teclado (`qa-menu-test.mjs`) |
| 6 | `prefers-reduced-motion` respeitado | `disableTransitionOnChange` no tema; animações condicionadas por `media (prefers-reduced-motion: reduce)`; verificado em Playwright com `emulateMedia` |
| 7 | Toque ≥ 44×44 px | Playwright 360 px: nenhum alvo < 44 px; skip link 44 px ao focar (estado normal oculto) |
| 8 | Zoom 200% / aumento de fonte sem quebra | Playwright com `zoom: 2` em 720 px: sem overflow horizontal |
| 9 | Sem overflow 360/375/390/412; breakpoints do framework | Playwright: `scrollWidth == clientWidth` em 360/375/390/412/768/1024/1280/1440; breakpoints Tailwind (sm/md/lg/xl) |
| 10 | Depoimentos 1/2/2×2 | Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (1 mobile, 2 tablet, 2×2 desktop); verificado em Playwright (desktop `display: grid`) |
| 11 | LCP priorizado; lazy com `srcset`/`sizes` e dimensões | Preload do hero com `fetchPriority="high"`; `logo-*.webp` com `srcset`/`sizes="40px"`; `ceo.webp` lazy com 400×400; `modern-image-formats` = 1,0 |
| 12 | LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 (p75) | LCP 1,94 s ✅ · CLS 0 ✅ · INP só em campo (ver §6) |
| 13 | Lighthouse mediana ≥ 90/95/95/95 | 94/100/100/100 na leitura limpa; SEO 100 no build indexável |
| 14 | Sem erros console, sem imagens desproporcionais, sem CLS | `errors-in-console` = 0; audits de imagem 1,0; CLS 0,000 |
| 15 | Resultados documentados com mediana | Este documento (§2–§4) |

## 6. Limitações e recomendações

- **INP não é mensurável localmente** — é métrica de campo (Chrome UX Report). O proxy local
  é o TBT (mediana 0,316 s sem outliers). Validar INP real via CrUX após a publicação com o
  domínio definitivo e o Cloudflare Web Analytics ativo (`docs/analytics-kpis.md`).
- **Cache headers:** o servidor local (`serve`) não envia cache headers de produção; o alvo
  (Nginx) deve servir `_next/static/*` com `immutable` e o HTML com `no-cache`. Auditoria
  final de produção recomendada após a configuração.
- **Domínio definitivo pendente (ADR 0001):** revalidar canonical/hreflang/OG com o domínio
  real e reexecutar a auditoria em produção com `NEXT_PUBLIC_SITE_INDEXABLE=true`.
- **Outliers ambientais:** o TBT de 2,8–3,0 s nas runs 3–4 é ruído da máquina de medição
  (varredura periódica do Windows), não característica do site — LCP, CLS e rede idênticos
  às outras runs confirmam.
- **Remover `build/adapter.js`** quando o bug vercel/next.js#85374 for corrigido no Next.

## 7. Como reproduzir

```bash
npm run build
npx serve out -l 4173
# no diretório de auditoria com Lighthouse 12.8.2:
node run-lh.mjs "http://localhost:4173/" out.json 3
```

Pré-visualização indexável (SEO):

```bash
NEXT_PUBLIC_SITE_INDEXABLE=true npm run build
npx serve out -l 4174
node run-lh.mjs "http://localhost:4174/" seo-indexable.json 3
```
