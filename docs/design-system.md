# Design System — Best Fluency (Mobile-First)

Versão: 1.0
Data: 5 de agosto de 2026
Escopo: issue #2 — "Design system Mobile-First e direção visual"
Fonte de requisitos: `docs/landing-page-spec-v2.md` (secções 2, 4, 6, 7, 23, 24)

---

## 1. Princípios

1. **Mobile-first real**: o layout começa em 360 px (uma coluna, CTA amplo,
   decoração reduzida) e expande por `min-width` para 768 / 1024 / 1440 px.
   Nunca criar breakpoints arbitrários (spec §24).
2. **Contraste WCAG 2.2 AA**: texto normal ≥ 4.5:1, componentes ≥ 3:1, nos
   dois temas (spec §23).
3. **Área de toque ≥ 44 × 44 px** em todos os elementos interativos — usar
   `h-11` / `min-h-11` (2.75rem) ou o token `--touch-target` (spec §23).
4. **Identidade preto / branco / dourado** como papéis cromáticos, com
   cinzentos neutros para texto secundário e bordas (spec §6).
5. **Direção visual subtil de viagem/jornada**: nunca descaracterizar a
   escola; usar no máximo um ou dois elementos de viagem por secção (spec §6).
6. **Acessibilidade por omissão**: foco visível, teclado, `aria-*`, HTML
   semântico, `prefers-reduced-motion` e ausência de dependência de hover
   (spec §23).

---

## 2. Tokens semânticos

Fonte única: `app/globals.css`. Os hexadecimais oficiais da marca ainda não
foram fornecidos (spec §31) — alterar apenas `--brand-*` quando chegarem.

### 2.1 Papéis cromáticos da marca

| Token            | Light                              | Dark                               | Uso                                        |
|------------------|------------------------------------|------------------------------------|--------------------------------------------|
| `--brand-black`  | `hsl(0 0% 4%)`                     | `hsl(0 0% 98%)`                    | Títulos, texto principal, fundo premium    |
| `--brand-white`  | `hsl(0 0% 100%)`                   | `hsl(0 0% 5%)`                     | Fundo de leitura / respiro                 |
| `--brand-gold`   | `hsl(42 70% 32%)`                  | `hsl(45 85% 55%)`                  | Destaque, rota, ícones, detalhes           |

No tema escuro os papéis **invertem**: `brand-black` passa a ser o texto
claro e `brand-white` o fundo escuro; o dourado mantém-se como destaque.

### 2.2 Tokens de superfície e texto (tema claro)

| Token                | Valor                  | Uso                          |
|----------------------|------------------------|------------------------------|
| `--background`       | `hsl(0 0% 100%)`       | Fundo da página              |
| `--foreground`       | `hsl(0 0% 4%)`         | Texto principal              |
| `--card`             | `hsl(0 0% 100%)`       | Cards                        |
| `--card-foreground`  | `hsl(0 0% 4%)`         | Texto de cards               |
| `--primary`          | `hsl(0 0% 9%)`         | Botão CTA (preto)            |
| `--primary-foreground`| `hsl(0 0% 98%)`       | Texto do CTA                 |
| `--secondary`        | `hsl(0 0% 96%)`        | Fundos suaves                |
| `--secondary-foreground` | `hsl(0 0% 9%)`     | Texto sobre `secondary`      |
| `--muted`            | `hsl(0 0% 96%)`        | Fundos neutros               |
| `--muted-foreground` | `hsl(0 0% 32%)`        | Texto secundário             |
| `--accent`           | `hsl(42 70% 32%)`      | Dourado de destaque          |
| `--accent-foreground`| `hsl(0 0% 100%)`       | Texto sobre o dourado        |
| `--border`           | `hsl(0 0% 90%)`        | Bordas                       |
| `--input`            | `hsl(0 0% 90%)`        | Campos de formulário         |
| `--ring`             | `hsl(42 70% 32%)`      | Anel de foco                 |

### 2.3 Tokens de superfície e texto (tema escuro)

| Token                | Valor                  | Uso                          |
|----------------------|------------------------|------------------------------|
| `--background`       | `hsl(0 0% 5%)`         | Fundo da página              |
| `--foreground`       | `hsl(0 0% 98%)`        | Texto principal              |
| `--card`             | `hsl(0 0% 8%)`         | Cards                        |
| `--card-foreground`  | `hsl(0 0% 98%)`        | Texto de cards               |
| `--primary`          | `hsl(0 0% 98%)`        | Botão CTA (claro)            |
| `--primary-foreground`| `hsl(0 0% 9%)`       | Texto do CTA                 |
| `--secondary`        | `hsl(0 0% 14%)`        | Fundos suaves                |
| `--secondary-foreground` | `hsl(0 0% 98%)`    | Texto sobre `secondary`      |
| `--muted`            | `hsl(0 0% 14%)`        | Fundos neutros               |
| `--muted-foreground` | `hsl(0 0% 68%)`        | Texto secundário             |
| `--accent`           | `hsl(45 85% 55%)`      | Dourado de destaque          |
| `--accent-foreground`| `hsl(0 0% 9%)`         | Texto sobre o dourado        |
| `--border`           | `hsl(0 0% 20%)`        | Bordas                       |
| `--input`            | `hsl(0 0% 22%)`        | Campos de formulário         |
| `--ring`             | `hsl(45 85% 55%)`      | Anel de foco                 |

### 2.4 Contraste validado (WCAG 2.2 AA)

| Combinação                                   | Light | Dark |
|----------------------------------------------|-------|------|
| `foreground` sobre `background`              | ≈ 19:1 | ≈ 18:1 |
| `muted-foreground` sobre `background`        | ≈ 7.8:1 | ≈ 8.6:1 |
| `accent` (dourado) sobre `background`        | ≈ 5.1:1 | ≈ 11:1 |
| `accent-foreground` (texto) sobre `accent`   | ≈ 5.1:1 | ≈ 11:1 |
| `primary-foreground` sobre `primary`         | ≈ 17:1 | ≈ 17:1 |
| `ring` (foco) sobre `background`             | ≈ 5.1:1 | ≈ 11:1 |

Todos os pares de texto cumprem ≥ 4.5:1.

### 2.5 Outros tokens

| Token             | Valor          | Uso                                        |
|-------------------|----------------|--------------------------------------------|
| `--radius`        | `0.625rem`     | Raio base (cards, botões)                  |
| `--touch-target`  | `2.75rem`      | Área de toque mínima 44 × 44 px            |
| Breakpoints       | `lg=64rem`, `xl=90rem` | Mobile-first por `min-width` (spec §24) |

---

## 3. Componentes base

Localização: `shared/components/ui/` — reutilizáveis, sem estado, seguros
para Server Components e Client Components.

| Componente           | Uso                                                        |
|----------------------|------------------------------------------------------------|
| `Button`             | Botão base (`primary` preto, `gold` dourado, `outline`, `ghost`; `default`, `lg`, `icon`). Área ≥ 44 px por omissão. |
| `buttonVariants()`   | Mesmas classes para `<a>` que parecem botão (ex.: CTA WhatsApp). |
| `Badge`              | Eyebrow / etiquetas curtas (maiúsculas, tracking largo).   |
| `Card`               | Superfície de conteúdo (Modalidades, Método, Depoimentos…). |
| `SectionHeading`     | Eyebrow + H2 + introdução consistentes por secção.         |
| `RoutePath`          | Rota pontilhada dourada com paragens e avião (viagem subtil). |

### 3.1 Direção visual de viagem — `RoutePath`

- `orientation="horizontal"` no desktop / `"vertical"` no telemóvel;
- sem `steps`: rota decorativa (4 paragens + avião) — Hero, CTA final;
- com `steps`: jornada guiada ("Como começar", spec §16);
- `aria-hidden` por omissão (decoração);
- animação do avião apenas com `motion-safe` (respeita
  `prefers-reduced-motion`).

---

## 4. Navegação móvel acessível

Implementação: `domains/landing/components/site-header.tsx`,
`main-nav.tsx` e `mobile-menu.tsx` (spec §7 e §23).

Padrão por omissão do header:

- **mobile (< 1024 px)**: uma linha — logótipo + tema + botão de menu;
  o painel contém âncoras, seletor de idiomas e CTA de WhatsApp;
- **desktop (≥ 1024 px)**: logótipo + âncoras + idiomas + tema + CTA.

Requisitos verificados no menu móvel:

- `aria-expanded` e `aria-controls` no botão;
- painel `id="mobile-menu"` ligado ao botão;
- fecha ao selecionar âncora, com `Escape` ou ao alternar o botão;
- foco movido para o primeiro link ao abrir e devolvido ao botão ao fechar;
- bloqueio de scroll de fundo enquanto aberto;
- todos os alvos com ≥ 44 × 44 px;
- `scroll-padding-top` no `html` para âncoras não ficarem ocultas sob o
  header sticky.

As âncoras (`#modalidades`, `#metodo`, `#best-kids`, `#depoimentos`, `#faq`)
são contratuais: os elementos-alvo chegam nas issues de secções do EPIC #1.

---

## 5. Checklist para as próximas secções

- [ ] Começar o layout em 360 px e expandir por `min-width`.
- [ ] Usar primitivos de `shared/components/ui/` (nunca cores/estilos avulsos).
- [ ] CTA com `WhatsAppLink` + `buttonVariants` (área ≥ 44 px, `aria-label`).
- [ ] Cards empilhados no telemóvel, grelha em tablet/desktop (spec §24).
- [ ] Direção de viagem subtil: no máximo um elemento de viagem por secção.
- [ ] Contraste AA validado nos dois temas antes de fechar a secção.
- [ ] Sem overflow horizontal em 360 / 375 / 390 / 412 px.
- [ ] Foco visível e `prefers-reduced-motion` respeitados.
