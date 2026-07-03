# Claude Code — Comandos, skills e regras

Guia rápido dos recursos configurados para Claude Code neste repositório.
Use junto com `PROJECT_RULES.md`, `AGENTS.md` e `CLAUDE.md`.

## Fontes de verdade

| Arquivo | Uso |
|---|---|
| `PROJECT_RULES.md` | Regras centrais de produto, stack, segurança e validação. |
| `AGENTS.md` | Contrato comum para agentes, modos de atuação, Git e relatório final. |
| `CLAUDE.md` | Guia operacional específico do Claude Code. |
| `.claude/settings.json` | Permissões, bloqueios e configurações locais do Claude Code. |
| `.claude/rules/*.md` | Regras modulares por domínio. |

## Permissões principais

Arquivo: `.claude/settings.json`.

| Categoria | Configuração |
|---|---|
| Permitido | `git status`, `git branch`, `git diff`, `git log`, `find`, `ls`, `rg`, `cat package.json`, validações npm seguras e comandos Prisma não destrutivos. |
| Exige aprovação | `git add`, `git commit`, `git merge`, `git rebase`, instalação npm, `npx`, Docker, `psql`, `pg_dump` e `WebFetch`. |
| Negado | `.env`, secrets, credenciais, tokens, certificados, `.claude/settings.local.json`, `rm`, `git reset --hard`, `git clean`, `git push`, `sudo`, `ssh`, `curl`, `wget`, deploy e migrations destrutivas. |

## Comandos

Pasta: `.claude/commands/`.

| Comando | Uso principal |
|---|---|
| `architecture-decision` | Analisa ADRs, alternativas, trade-offs e riscos arquiteturais. |
| `checklist-merge` | Checklist objetivo antes de merge, sem editar arquivos. |
| `continue-from-codex` | Continua tarefa iniciada pelo Codex com base no estado real do Git. |
| `create-code` | Implementa tarefa com escopo controlado e validação. |
| `debug-app` | Investiga bug, causa raiz e correção mínima. |
| `final-audit` | Auditoria final; pode gravar somente o relatório exato autorizado. |
| `implementation-plan` | Cria plano técnico incremental sem implementar. |
| `melhorar-ui-ux` | Melhora UI/UX preservando comportamento e responsividade. |
| `refactor-code` | Refatora com preservação de contratos e comportamento. |
| `review-code` | Revisa diff ou arquivos sem editar, com achados por severidade. |
| `revisar-performance` | Revisa performance de Next.js, Prisma, bundle e consultas. |
| `revisar-prisma-banco` | Revisa schema, migrations, seed, integridade e transações sem escrever no banco. |
| `revisar-seguranca` | Revisa segurança de auth, RBAC, checkout, webhooks e secrets. |

Commands são entrypoints explícitos. Os commands de revisão podem gravar apenas
o relatório exato autorizado nos argumentos; sem caminho válido, respondem
somente no chat.

## Skills

Pasta: `.claude/skills/*/SKILL.md`.

| Skill | Quando usar |
|---|---|
| `architecture-review` | Revisão de decisões arquiteturais, ADRs e fronteiras técnicas. |
| `final-audit` | Metodologia de auditoria final; não concede escrita. |
| `implementation-planning` | Planejamento aprofundado por fases, riscos e critérios de aceite. |
| `legacy-code-audit` | Auditoria de base existente antes de novas etapas. |
| `safe-refactor` | Refatoração segura com preservação de comportamento. |
| `senior-code-agent` | Implementação técnica geral com postura sênior. |
| `senior-code-review` | Revisão de código/diff sem editar, por severidade. |

As skills possuem metodologias distintas. Elas não são entrypoints, não
substituem commands equivalentes e não concedem permissão de escrita.

## Regras modulares

Pasta: `.claude/rules/`.

| Regra | Domínio |
|---|---|
| `auth-admin-rbac.md` | Auth admin, sessão, roles e permissões. |
| `cart-checkout-orders.md` | Carrinho, checkout, recálculo server-side e pedidos. |
| `catalog-products.md` | Catálogo, produtos, adicionais, preços e imagens. |
| `delivery-store-settings.md` | Delivery, horários, áreas e configurações da loja. |
| `kitchen-order-flow.md` | Cozinha, fila e transições de status. |
| `nextjs-app-router.md` | App Router, Server Components, Server Actions e Route Handlers. |
| `payments-webhooks.md` | Pagamento manual, adapter futuro e webhooks. |
| `prisma-database.md` | Prisma, migrations, seed, índices e transações. |
| `security-deploy.md` | Secrets, deploy, comandos bloqueados e segurança web. |
| `ui-ux-tailwind.md` | UI/UX, Tailwind, acessibilidade e responsividade. |

Use a regra modular quando a tarefa tocar o domínio correspondente. Para mudanças sensíveis ou multiarquivo, o padrão é planejar antes de editar.

## Templates e continuidade

| Arquivo | Uso |
|---|---|
| `docs/ia-auditorias/TEMPLATE-agent-report.md` | Template oficial de relatório final e handoff. |
| `README-IA.md` | Mapa dos arquivos operacionais de IA. |
| `CODEX.md` e `.codex/instructions.md` | Leitura obrigatória quando houver continuidade com Codex. |

## Itens não configurados para Claude Code

Não há configuração versionada em:

- `.claude/agents/`
- `.claude/templates/`

Os templates operacionais estão em `docs/ia-auditorias/` e os comandos/skills estão em `.claude/commands/` e `.claude/skills/`.

## Uso recomendado

1. Confirmar branch e `git status`.
2. Ler `PROJECT_RULES.md`, `AGENTS.md`, `CLAUDE.md` e regras modulares aplicáveis.
3. Escolher comando ou skill conforme o tipo de tarefa.
4. Usar Plan Mode para escopo sensível, multiarquivo ou ambíguo.
5. Executar apenas validações reais e existentes.
6. Finalizar com relatório e status: `Aprovado`, `Aprovado com observações`, `Requer ajustes` ou `Bloqueado`.
