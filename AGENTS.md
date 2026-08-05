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
| `locales/{locale}/common.json` | Traduções: `pt-PT`, `pt-BR`, `en-US`, `es-ES` |
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

---

## Locales

Estrutura de tradução:

```
locales/
  pt-PT/common.json  (default)
  pt-BR/common.json
  en-US/common.json
  es-ES/common.json
```

Chaves de i18n seguem padrão `namespace.chave` (ex: `auth.login.title`).
