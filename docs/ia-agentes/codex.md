# Codex — Comandos, prompts e templates

Guia rápido dos recursos configurados para usar Codex neste repositório.
Use junto com `PROJECT_RULES.md`, `AGENTS.md`, `CODEX.md` e `.codex/instructions.md`.

## Fontes de verdade

| Arquivo | Uso |
|---|---|
| `PROJECT_RULES.md` | Regras centrais de produto, stack, segurança e validação. |
| `AGENTS.md` | Contrato comum para agentes, modos de atuação, Git e relatório final. |
| `CODEX.md` | Protocolo específico do Codex e continuidade com Claude Code. |
| `.codex/instructions.md` | Matriz de impacto, critérios para alterar arquivos e operação segura. |
| `README-IA.md` | Mapa geral da operação com Codex e Claude Code. |

## Configuração local

Arquivo: `.codex/config.toml`.

| Chave | Valor configurado | Impacto |
|---|---:|---|
| `approval_policy` | `on-request` | Ações sensíveis exigem aprovação. |
| `sandbox_mode` | `workspace-write` | Leitura ampla; escrita limitada ao workspace permitido. |
| `project_doc_max_bytes` | `65536` | Limite de leitura de documento do projeto. |
| `network_access` | `false` | Rede desabilitada no sandbox por padrão. |

## Prompts manuais

Pasta: `docs/ia-prompts/`.

| Prompt | Quando usar |
|---|---|
| `01-planejamento.md` | Auditoria e plano sem editar arquivos. |
| `02-implementacao-controlada.md` | Implementação após plano aprovado. |
| `03-revisao-pos-implementacao.md` | Revisão de diff sem editar. |
| `04-correcao-minima-segura.md` | Correção localizada com menor mudança suficiente. |
| `05-auditoria-pre-commit.md` | Checagem final antes de commit, handoff ou revisão humana. |
| `INSTRUCOES-GERAIS-PARA-AGENTES.md` | Regras gerais para prompts por etapa. |

## Prompts por etapa

Pasta: `docs/ia-prompts/etapas/`.

| Etapa | Tema |
|---|---|
| `E01-setup-inicial.md` | Setup inicial. |
| `E02-modelagem-prisma.md` | Modelagem Prisma. |
| `E03-auth-admin.md` | Auth admin. |
| `E04-layout-publico-admin.md` | Layout público e admin. |
| `E05-categorias-admin.md` | Categorias admin. |
| `E06-produtos-admin.md` | Produtos admin. |
| `E07-catalogo-publico.md` | Catálogo público. |
| `E08-carrinho.md` | Carrinho. |
| `E09-checkout-pedidos.md` | Checkout e pedidos. |
| `E10-pedidos-admin-status.md` | Pedidos admin e status. |
| `E11-dashboard-configuracoes.md` | Dashboard e configurações. |
| `E12-testes-deploy.md` | Etapa depreciada de testes e deploy. |
| `E12a-ux-seguranca.md` | UX, erros e segurança. |
| `E12b-testes.md` | Testes críticos. |
| `E12c-deploy-auditoria.md` | Preparação de deploy e auditoria final. |

## Templates e relatórios

| Arquivo | Uso |
|---|---|
| `docs/ia-auditorias/TEMPLATE-agent-report.md` | Template oficial de relatório final e continuidade. |
| `docs/adr/0001-ia-operating-model.md` | Decisão sobre modelo operacional de IA. |
| `docs/adr/0002-stack-and-agent-boundaries.md` | Decisão sobre stack e fronteiras entre agentes. |

## Itens não configurados para Codex

Não há configuração versionada em:

- `.codex/commands/`
- `.codex/skills/`
- `.codex/agents/`
- `.codex/templates/`

Para Codex, os "comandos" reutilizáveis do projeto são prompts Markdown em `docs/ia-prompts/`, não comandos nativos dentro de `.codex/`.

## Uso recomendado

1. Confirmar branch e `git status`.
2. Ler `PROJECT_RULES.md`, `AGENTS.md`, `CODEX.md` e `.codex/instructions.md`.
3. Escolher o prompt manual ou de etapa mais próximo da tarefa.
4. Preservar `.env`, secrets, Auth.js/RBAC, Prisma, checkout, pedidos e deploy fora do escopo sem autorização.
5. Finalizar com o formato de relatório definido em `PROJECT_RULES.md` ou no template de auditoria.
