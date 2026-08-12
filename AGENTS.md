# VianaHub.Global.BestFluency.Web — AGENTS.md

Este repo é um **repositório de configuração de agentes OpenCode** para o projeto Best Fluency Web. Não contém código de aplicação — apenas definições de agentes, instruções de fluxo Kanban e arquivos de locale.

Toda comunicação com o usuário, issues e comentários deve ser em **português do Brasil (pt-BR)**. Código, branches e commits em inglês.

---

## Repo Identity

- **GitHub:** `vianahub-pt/VianaHub.Global.BestFluency.Web`
- **Board:** `https://github.com/users/vianahub-pt/projects/5`
- **gh commands:** sempre usar `--repo vianahub-pt/VianaHub.Global.BestFluency.Web`

---

## Estrutura

| Camada | Conteúdo |
|--------|----------|
| `.opencode/agents/` | 7 agentes: `kanban-coordinator`, `po`, `developer-junior`, `developer-pleno`, `developer-senior`, `ui-ux`, `qa` |
| `.opencode/instructions/kanban-flow.md` | Instruções compartilhadas do fluxo Kanban |
| `locales/{locale}/common.json` | Traduções: `pt-PT`, `en-US`, `es-ES`, `fr-FR`, `de-DE`, `it-IT`, `pt-BR` |
| `AGENTS.md` | Este arquivo |

---

## Fluxo Kanban

O fluxo completo está documentado em `.opencode/instructions/kanban-flow.md`. Resumo:

```text
PO -> Kanban Coordinator -> Developer Junior | Developer Pleno | Developer Senior | UI/UX -> QA
```

Status: `Backlog -> To do -> In Progress -> For Tests -> In Test -> For Deploy -> Done`

- Somente `kanban-coordinator` move cards no board
- Handoffs devem ser curtos: ação, link, modo, entrega esperada
- Fluxo é contínuo — sem intervenção humana entre etapas operacionais
- Intervenção humana apenas para: revisar/aprovar/merge do PR

---

## Convenções de Branch e PR

| Tipo | Branch base | PR base | Prefixo |
|------|-------------|---------|---------|
| Feature/Melhoria/Correção (padrão) | `develop` | `develop` | `feature/` ou `fix/` |
| Hotfix de produção | `main` | `main` | `hotfix/` |

---

## Regras Importantes

- **Não alterar** arquivos em `.opencode/agents/`, `.opencode/instructions/`, `AGENTS.md` ou `.opencode/opencode.json` durante execução de tarefas — exceto solicitação explícita do usuário
- **Anti-loop:** mesmo bug reportado 2 vezes na mesma issue → escalar para o usuário
- **Build obrigatório:** executar `npm run build` antes de `git push` (quando aplicável ao repo de destino)
- **Conflito de merge:** developer não resolve sozinho — escalar para `kanban-coordinator` que aciona `developer-senior`
- **Idiomas da landing:** `pt-PT` na raiz `/`, `en-US` em `/en/`, `es-ES` em `/es/`, `fr-FR` em `/fr/`, `de-DE` em `/de/`, `it-IT` em `/it/` e `pt-BR` em `/pt-br/`; não utilizar a variante britânica
- **SEO internacional:** cada idioma deve ter URL própria, `lang`, canonical autorreferencial, `hreflang` recíproco, `x-default` para `/` e presença no sitemap
- **Mobile-First:** smartphone é a base de design, CSS e QA; validar 360/375/390/412 antes de 768/1024/1280/1440, sem overflow horizontal e com temas light/dark acessíveis

---

## Locales

Estrutura de tradução:

```
locales/
  pt-PT/common.json  (default)
  pt-BR/common.json
  en-US/common.json
  es-ES/common.json
  fr-FR/common.json
  de-DE/common.json
  it-IT/common.json
```

Chaves de i18n seguem padrão `namespace.chave` (ex: `auth.login.title`).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
