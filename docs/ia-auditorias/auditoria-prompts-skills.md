**PROMPT EXECUTADO:**

# Prompt de comando proposto

Copie e execute este prompt no Codex:

```text
Atue como auditor técnico de prompts e configurações de agentes de IA do repositório `burger-shop-system`.

Objetivo: analisar detalhadamente todos os prompts de etapas e determinar, para cada prompt interno de execução, revisão, correção, preparação ou auditoria, se ele deve ser executado diretamente ou com alguma skill/command já existente.

Esta é uma tarefa exclusivamente de análise. Não implemente etapas, não execute workflows das skills/commands analisadas e não altere nenhum arquivo.

## 1. Verificações iniciais

1. Execute apenas:
   - `git branch --show-current`
   - `git status --short`
2. Registre a branch real e alterações pendentes.
3. Considere o conteúdo atual do working tree como fonte da análise.
4. Não troque de branch, restaure arquivos, faça commit ou modifique o estado do Git.

## 2. Leitura obrigatória

Leia integralmente:

- `PROJECT_RULES.md`
- `AGENTS.md`
- `CODEX.md`
- `.codex/instructions.md`
- `.codex/config.toml`
- `CLAUDE.md`
- `.claude/settings.json`
- todos os arquivos de `.claude/commands/`
- todos os arquivos de `.claude/rules/`
- todos os arquivos `.claude/skills/*/SKILL.md`
- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- todos os arquivos Markdown de `docs/ia-prompts/etapas/`

Também considere somente as skills que estiverem explicitamente disponíveis na sessão atual do Codex.

É proibido ler:

- `.claude/settings.local.json`
- `.env` ou `.env.*`
- secrets, credenciais, tokens ou certificados
- arquivos externos ao repositório para procurar skills não declaradas

## 3. Unidade de análise

Não analise apenas cada arquivo E01–E12 como uma unidade.

Dentro de cada arquivo, trate separadamente cada seção cujo título comece com:

- `Prompt de execução`
- `Prompt de preparação`
- `Prompt de revisão`
- `Prompt de correção`
- `Prompt de auditoria final`

Inclua todas as etapas E01–E12c. O arquivo `E12-testes-deploy.md` deve ser identificado como depreciado e seus prompts devem receber a recomendação “não executar”, caso essa condição seja confirmada no arquivo.

## 4. Critérios de classificação

Para cada prompt interno, determine:

1. Etapa e nome do bloco.
2. Agente explicitamente indicado: Codex ou Claude Code.
3. Natureza do trabalho:
   - planejamento;
   - implementação;
   - revisão;
   - correção;
   - auditoria;
   - arquitetura;
   - segurança;
   - UI/UX;
   - testes;
   - deploy/documentação.
4. Domínios e riscos envolvidos.
5. Rules de `.claude/rules/` aplicáveis.
6. Skill existente mais adequada, se houver.
7. Command existente mais adequado, se houver.
8. Recomendação de uso:
   - obrigatório;
   - recomendado;
   - opcional;
   - não aplicável;
   - incompatível com o agente;
   - não executar.
9. Justificativa baseada no conteúdo real dos arquivos.
10. Autorizações humanas ou gates necessários.

## 5. Regras para recomendar skills e commands

- Não invente nomes, aliases, comandos, sintaxes ou capacidades.
- Considere um recurso existente somente quando houver arquivo real ou ele estiver explicitamente disponível na sessão.
- Recursos de `.claude/commands/` e `.claude/skills/` pertencem ao Claude Code. Não os apresente como skills nativas do Codex.
- Para prompts destinados ao Codex, recomende apenas skills realmente expostas na sessão atual. Caso nenhuma corresponda, informe “executar diretamente no Codex, sem skill específica”.
- Diferencie claramente:
  - command;
  - skill;
  - rule modular;
  - instrução geral.
- Uma rule não deve ser chamada de skill ou command.
- Quando command e skill forem redundantes, recomende apenas o recurso principal e explique o motivo.
- Só forneça sintaxe de invocação quando ela estiver comprovada pela configuração ou documentação local. Caso contrário, informe nome e caminho do recurso sem inventar sintaxe.
- Não recomende uma skill genérica quando uma especializada corresponder melhor.
- Não recomende criação de nova skill/command, exceto como lacuna opcional ao final.
- Considere conflitos de segurança, permissões, migrations, instalação de dependências e deploy.

## 6. Verificações adicionais

Identifique e reporte:

- prompts que indicam agente incompatível com o recurso sugerido;
- sobreposição ou duplicação entre skills e commands;
- prompts sem recurso correspondente;
- recursos existentes sem aplicação clara nas etapas;
- inconsistências entre prompts, `PROJECT_RULES.md`, `AGENTS.md`, `CODEX.md` e `CLAUDE.md`;
- divergências de roles/RBAC;
- comandos que exigem autorização;
- referências a instalação de dependências, migrations, produção ou deploy;
- prompts depreciados ou substituídos;
- recomendações que mudariam conforme execução no Codex ou no Claude Code.

Não execute testes, builds, migrations, instalações ou qualquer prompt de etapa. Esta auditoria avalia apenas os documentos e configurações.

## 7. Formato obrigatório da resposta

Entregue no chat, sem criar relatório em arquivo.

### Resumo executivo

Informe objetivamente:

- quantos arquivos de etapa foram analisados;
- quantos prompts internos foram encontrados;
- quantas skills, commands e rules foram catalogadas;
- conclusão geral sobre a necessidade de usar esses recursos.

### Inventário de recursos

Tabela com:

| Recurso | Tipo | Ambiente/agente | Caminho | Finalidade | Evidência |
|---|---|---|---|---|---|

### Matriz completa por prompt

Inclua uma linha para cada prompt interno:

| Etapa | Bloco | Agente | Tipo de tarefa | Skill recomendada | Command recomendado | Rules aplicáveis | Classificação | Justificativa/gate |
|---|---|---|---|---|---|---|---|---|

Não omita linhas. Agrupamentos são permitidos somente se todos os prompts continuarem identificáveis individualmente.

### Recomendações práticas

Apresente, por etapa, o fluxo recomendado:

- execução/preparação;
- revisão;
- correção, quando existir;
- auditoria final.

Diferencie claramente o que deve ser executado no Codex e no Claude Code.

### Inconsistências e lacunas

Classifique os achados por severidade:

- bloqueador;
- alto;
- médio;
- baixo;
- observação.

Para cada achado, cite evidência no formato `caminho:linha`.

### Conclusão

Responda explicitamente:

1. Quais prompts devem usar skill?
2. Quais devem usar command?
3. Quais devem ser executados diretamente?
4. Quais não devem ser executados?
5. Existe alguma skill/command ausente que valeria criar futuramente?

Finalize obrigatoriamente com:

`Status final: Aprovado | Aprovado com observações | Requer ajustes | Bloqueado`
```

## Premissas

- O prompt produz uma auditoria somente leitura.
- `.claude/settings.local.json` e secrets ficam explicitamente excluídos.
- A classificação ocorre por bloco interno, evitando uma recomendação genérica por etapa.
- A branch observada durante esta preparação foi `feature/e03-auth-admin`, com alterações pendentes.

Status final: Aprovado com observações

---

**RESULTADO:**

## Resumo executivo

- Branch: `feature/e03-auth-admin`.
- Working tree: contém alterações pendentes, inclusive em todos os prompts E01–E12c.
- Arquivos de etapa analisados: 15.
- Prompts internos encontrados: 59.
- Recursos locais catalogados:
  - 12 commands do Claude Code;
  - 11 skills do Claude Code;
  - 10 rules modulares.
- Skills ativas do Codex avaliadas por metadados: 9; nenhuma corresponde à execução das etapas.
- Arquivos alterados por esta auditoria: nenhum.
- Testes/build/migrations: não executados, conforme o escopo documental.

Conclusão geral:

- Prompts destinados ao Codex devem ser executados diretamente, sem skill específica.
- Prompts de revisão do Claude Code podem usar commands de revisão, com preferência por `review-code` ou `revisar-seguranca`.
- Auditorias finais podem usar `final-audit`, mas somente mantendo a exceção explícita que autoriza escrever o relatório da auditoria.
- Não há motivo para combinar command e skill equivalentes.
- Os prompts com role `ADMIN` não devem ser executados antes de alinhar o RBAC.
- Todos os prompts do E12 depreciado devem ser ignorados.

## Inventário de recursos

### Commands do Claude Code

| Recurso | Tipo | Ambiente | Finalidade | Evidência |
|---|---|---|---|---|
| `architecture-decision` | Command | Claude Code | ADR e decisões arquiteturais | `.claude/commands/architecture-decision.md:2` |
| `checklist-merge` | Command | Claude Code | Verificação pré-merge | `.claude/commands/checklist-merge.md:2` |
| `continue-from-codex` | Command | Claude Code | Continuidade de trabalho do Codex | `.claude/commands/continue-from-codex.md:2` |
| `create-code` | Command | Claude Code | Implementação controlada | `.claude/commands/create-code.md:2` |
| `debug-app` | Command | Claude Code | Investigação de bugs | `.claude/commands/debug-app.md:2` |
| `final-audit` | Command | Claude Code | Auditoria final somente leitura | `.claude/commands/final-audit.md:2` |
| `implementation-plan` | Command | Claude Code | Planejamento incremental | `.claude/commands/implementation-plan.md:2` |
| `melhorar-ui-ux` | Command | Claude Code | Alterações incrementais de UI/UX | `.claude/commands/melhorar-ui-ux.md:2` |
| `refactor-code` | Command | Claude Code | Refatoração segura | `.claude/commands/refactor-code.md:2` |
| `review-code` | Command | Claude Code | Revisão de implementação/diff | `.claude/commands/review-code.md:2` |
| `revisar-performance` | Command | Claude Code | Auditoria de performance | `.claude/commands/revisar-performance.md:2` |
| `revisar-seguranca` | Command | Claude Code | Revisão de Auth, RBAC, checkout e segurança | `.claude/commands/revisar-seguranca.md:2` |

### Skills do Claude Code

| Recurso | Tipo | Finalidade | Evidência |
|---|---|---|---|
| `architecture-review` | Skill | Revisão arquitetural | `.claude/skills/architecture-review/SKILL.md:2` |
| `continue-from-codex` | Skill | Continuidade entre agentes | `.claude/skills/continue-from-codex/SKILL.md:2` |
| `controlled-implementation` | Skill | Implementação de plano aprovado | `.claude/skills/controlled-implementation/SKILL.md:2` |
| `final-audit` | Skill | Auditoria final | `.claude/skills/final-audit/SKILL.md:2` |
| `implementation-plan` | Skill | Plano incremental | `.claude/skills/implementation-plan/SKILL.md:2` |
| `implementation-planning` | Skill | Planejamento aprofundado | `.claude/skills/implementation-planning/SKILL.md:2` |
| `legacy-code-audit` | Skill | Auditoria de base existente | `.claude/skills/legacy-code-audit/SKILL.md:2` |
| `safe-refactor` | Skill | Refatoração com preservação de comportamento | `.claude/skills/safe-refactor/SKILL.md:2` |
| `senior-code-agent` | Skill | Implementação geral | `.claude/skills/senior-code-agent/SKILL.md:2` |
| `senior-code-review` | Skill | Revisão completa | `.claude/skills/senior-code-review/SKILL.md:2` |
| `senior-review` | Skill | Revisão rápida | `.claude/skills/senior-review/SKILL.md:2` |

As 11 skills possuem o mesmo corpo operacional a partir da seção descritiva; diferem essencialmente no nome e no frontmatter. Isso reduz a especialização real.

### Rules modulares

| Alias | Rule | Aplicação |
|---|---|---|
| A | `auth-admin-rbac` | Auth, sessão, middleware e roles |
| O | `cart-checkout-orders` | Carrinho, checkout e pedidos |
| C | `catalog-products` | Categorias, produtos e imagens |
| D | `delivery-store-settings` | Configurações, horários e delivery |
| K | `kitchen-order-flow` | Status e operação de pedidos |
| N | `nextjs-app-router` | App Router e fronteira server/client |
| W | `payments-webhooks` | Pagamentos e webhooks |
| P | `prisma-database` | Prisma, migrations e transações |
| S | `security-secrets-deploy` | Segurança, secrets e deploy |
| U | `ui-ux-tailwind` | UI, acessibilidade e Tailwind |

Evidências: `.claude/rules/*.md:1-3`.

### Skills disponíveis no Codex

A sessão expõe `imagegen`, `openai-docs`, `plugin-creator`, `skill-creator`, `skill-installer` e quatro workflows GitHub. Nenhuma implementa o fluxo técnico das etapas E01–E12c.

## Matriz completa por prompt

“Command condicional” significa: utilizar apenas se o prompt completo for passado como contexto e prevalecer a autorização específica para gravar o relatório em `docs/ia-auditorias/`.

| Etapa | Bloco | Agente | Tipo | Skill recomendada | Command recomendado | Rules | Classificação e gate |
|---|---|---|---|---|---|---|---|
| E01 | Execução | Codex | Setup/CI | — | — | N,S | Direto; instalação de dependência exige aprovação |
| E01 | Revisão | Claude | Revisão | `senior-code-review` como alternativa | `review-code` | N,S | Recomendado condicional |
| E01 | Correção | Codex | Correção | — | — | N,S | Direto; somente achados obrigatórios |
| E01 | Auditoria | Claude | Auditoria | — | `final-audit` | N,S | Condicional à escrita do único relatório |
| E02 | Execução | Codex | Prisma/modelagem | — | — | P,S | Direto, mas agente diverge do roadmap; `migrate dev` exige ambiente local e aprovação |
| E02 | Revisão | Claude | Revisão de banco | `senior-code-review` como alternativa | `review-code` | P,S | Recomendado condicional |
| E02 | Correção | Codex | Correção de schema | — | — | P,S | Direto; migration somente local/autorizada |
| E02 | Auditoria | Claude | Auditoria de banco | — | `final-audit` | P,S | Condicional à escrita do relatório |
| E03 | Execução | Codex | Auth/RBAC | — | — | A,N,S | Não executar até corrigir a role `ADMIN`; também diverge do roadmap |
| E03 | Revisão | Claude | Segurança | `senior-code-review` como alternativa | `revisar-seguranca` | A,N,S | Recomendado condicional |
| E03 | Correção | Codex | Correção Auth/RBAC | — | — | A,N,S | Não executar até definir o contrato de roles |
| E03 | Auditoria | Claude | Auditoria de segurança | — | `final-audit` | A,N,S | Condicional; após correção de RBAC |
| E04 | Execução | Codex | Layout/UI | — | — | N,U,A | Direto |
| E04 | Revisão | Claude | Revisão UI/arquitetura | `senior-code-review` como alternativa | `review-code` | N,U,A | Recomendado condicional |
| E04 | Correção | Codex | Correção UI | — | — | N,U,A | Direto |
| E04 | Auditoria | Claude | Auditoria | — | `final-audit` | N,U,A | Condicional à escrita do relatório |
| E05 | Execução | Codex | CRUD categorias | — | — | C,A,N | Não executar até alinhar `ADMIN` às roles oficiais |
| E05 | Revisão | Claude | Revisão CRUD/RBAC | `senior-code-review` como alternativa | `review-code` | C,A,N | Recomendado condicional |
| E05 | Correção | Codex | Correção CRUD | — | — | C,A,N | Gate de RBAC |
| E05 | Auditoria | Claude | Auditoria | — | `final-audit` | C,A,N | Condicional |
| E06 | Execução | Codex | Produtos/upload | — | — | C,A,N,S | Direto após RBAC; upload é crítico e diverge parcialmente do roadmap |
| E06 | Revisão | Claude | Segurança de upload | `senior-code-review` como alternativa | `revisar-seguranca` | C,A,N,S | Recomendado condicional |
| E06 | Correção | Codex | Correção de produtos/upload | — | — | C,A,N,S | Gate para dependências/storage |
| E06 | Auditoria | Claude | Auditoria | — | `final-audit` | C,A,N,S | Condicional |
| E07 | Execução | Codex | Catálogo público | — | — | C,N,U | Direto |
| E07 | Revisão | Claude | Revisão catálogo | `senior-code-review` como alternativa | `review-code` | C,N,U | Recomendado condicional |
| E07 | Correção | Codex | Correção catálogo | — | — | C,N,U | Direto |
| E07 | Auditoria | Claude | Auditoria | — | `final-audit` | C,N,U | Condicional |
| E08 | Execução | Codex | Carrinho client-side | — | — | O,N,U | Direto |
| E08 | Revisão | Claude | Revisão carrinho | `senior-code-review` como alternativa | `review-code` | O,N,U | Recomendado condicional |
| E08 | Correção | Codex | Correção carrinho | — | — | O,N,U | Direto |
| E08 | Auditoria | Claude | Auditoria | — | `final-audit` | O,N,U | Condicional |
| E09 | Execução | Codex | Checkout/pedido | — | — | O,P,N,D,S | Alto risco; diverge do roadmap; autorização para contrato/transação |
| E09 | Revisão | Claude | Segurança financeira | `senior-code-review` como alternativa | `revisar-seguranca` | O,P,N,D,S | Recomendado condicional |
| E09 | Correção | Codex | Correção checkout | — | — | O,P,N,D,S | Alto risco; somente achados obrigatórios |
| E09 | Auditoria | Claude | Auditoria checkout | — | `final-audit` | O,P,N,D,S | Condicional |
| E10 | Execução | Codex | Pedidos/status | — | — | O,K,A,N | Alto risco; divergência do roadmap e referência a `ADMIN` |
| E10 | Revisão | Claude | Revisão de estados/RBAC | `senior-code-review` como alternativa | `review-code` | O,K,A,N | Recomendado condicional |
| E10 | Correção | Codex | Correção status | — | — | O,K,A,N | Gate de RBAC e contrato de transições |
| E10 | Auditoria | Claude | Auditoria | — | `final-audit` | O,K,A,N | Condicional |
| E11 | Execução | Codex | Config/dashboard | — | — | D,O,A,N,U | Alto risco na integração com checkout; diverge parcialmente do roadmap |
| E11 | Revisão | Claude | Revisão operacional | `senior-code-review` como alternativa | `review-code` | D,O,A,N,U | Recomendado condicional |
| E11 | Correção | Codex | Correção config/dashboard | — | — | D,O,A,N,U | Gate para cálculo/taxa |
| E11 | Auditoria | Claude | Auditoria | — | `final-audit` | D,O,A,N,U | Condicional |
| E12 | Execução | Codex | UX/testes/deploy | — | — | — | Não executar: arquivo depreciado |
| E12 | Revisão | Claude | Revisão | — | — | — | Não executar |
| E12 | Correção | Codex | Correção | — | — | — | Não executar |
| E12 | Auditoria | Claude | Auditoria | — | — | — | Não executar |
| E12a | Execução | Codex | UX/segurança | — | — | S,A,O,N,U | Alto risco; segurança deveria ser liderada por Claude segundo roadmap |
| E12a | Revisão | Claude | Segurança/OWASP | `senior-code-review` como alternativa | `revisar-seguranca` | S,A,O,N,U | Recomendado condicional |
| E12a | Correção | Codex | Correção segurança/UX | — | — | S,A,O,N,U | Gate para Auth, rate limit e dependências |
| E12a | Auditoria | Claude | Auditoria de segurança | — | `final-audit` | S,A,O,N,U | Condicional |
| E12b | Execução | Codex | Testes | — | — | N,A,O,C,P,U,S | Direto; Playwright/a11y exigem aprovação antes de instalar |
| E12b | Revisão | Claude | Revisão de testes | `senior-code-review` como alternativa | `review-code` | N,A,O,C,P,U,S | Recomendado condicional |
| E12b | Correção | Codex | Correção de testes | — | — | N,A,O,C,P,U,S | Direto; não alterar domínio para satisfazer testes |
| E12b | Auditoria | Claude | Auditoria de testes | — | `final-audit` | N,A,O,C,P,U,S | Condicional |
| E12c | Preparação | Codex | Documentação/release | — | — | S,P,N | Direto; agente não executa deploy nem produção |
| E12c | Revisão | Claude | Revisão release | `senior-code-review` como alternativa | `review-code` | S,P,N | Recomendado condicional |
| E12c | Auditoria | Claude | Auditoria final MVP | — | `final-audit` | S,P,N,A,O | Condicional; somente relatório autorizado |

## Recomendações práticas por etapa

| Etapa | Fluxo recomendado |
|---|---|
| E01 | Codex direto → `review-code` → Codex direto → `final-audit` |
| E02 | Codex direto com gate Prisma → `review-code` → Codex direto → `final-audit` |
| E03 | Corrigir RBAC/agente → Codex direto ou reatribuir → `revisar-seguranca` → correção direta → `final-audit` |
| E04 | Codex direto → `review-code` → Codex direto → `final-audit` |
| E05 | Corrigir RBAC → Codex direto → `review-code` → correção direta → `final-audit` |
| E06 | Codex direto → `revisar-seguranca` → correção direta → `final-audit` |
| E07 | Codex direto → `review-code` → correção direta → `final-audit` |
| E08 | Codex direto → `review-code` → correção direta → `final-audit` |
| E09 | Preferencialmente reatribuir núcleo crítico ao Claude; caso mantido, Codex com plano → `revisar-seguranca` → correção direta → `final-audit` |
| E10 | Preferencialmente reatribuir máquina de estados ao Claude → `review-code` → correção direta → `final-audit` |
| E11 | Separar dashboard simples da integração crítica com checkout → `review-code` → correção direta → `final-audit` |
| E12 | Não executar |
| E12a | Preferencialmente Claude para segurança; revisão com `revisar-seguranca` → `final-audit` |
| E12b | Codex direto com gate de dependências → `review-code` → correção direta → `final-audit` |
| E12c | Codex apenas para documentação/verificação local → `review-code` → `final-audit`; deploy continua humano |

Se uma etapa crítica for reatribuída ao Claude Code, use um único recurso:

- `create-code` como command explícito; ou
- `controlled-implementation` como skill.

Não use ambos simultaneamente.

## Inconsistências e lacunas

### Bloqueador — contrato de RBAC divergente

`PROJECT_RULES.md` define `OWNER`, `MANAGER`, `ATTENDANT` e `KITCHEN`, mas E03 e E05 exigem role `ADMIN`. E06 e E10 também usam `ADMIN` como bloqueador.

Evidências:

- `PROJECT_RULES.md:197-204`
- `docs/ia-prompts/etapas/E03-auth-admin.md:30`
- `docs/ia-prompts/etapas/E03-auth-admin.md:41`
- `docs/ia-prompts/etapas/E05-categorias-admin.md:29`
- `docs/ia-prompts/etapas/E06-produtos-admin.md:284`
- `docs/ia-prompts/etapas/E10-pedidos-admin-status.md:274`

É necessário escolher uma única política. Pelas prioridades do repositório, as quatro roles de `PROJECT_RULES.md` devem prevalecer.

### Alto — agente executor diverge do roadmap

Os prompts consolidados atribuem execuções críticas ao Codex, enquanto o roadmap recomenda Claude Code para modelagem sensível, Auth/RBAC, upload, checkout, máquina de estados e segurança.

Exemplos:

- E02 executa com Codex: `docs/ia-prompts/etapas/E02-modelagem-prisma.md:87`
- Modelagem sensível recomenda Claude: `docs/ia-roadmaps/roadmap-execucao-ia.md:629`, `:712`, `:794`, `:878`
- E03 executa com Codex: `docs/ia-prompts/etapas/E03-auth-admin.md:85`
- Auth/RBAC recomenda Claude: `docs/ia-roadmaps/roadmap-execucao-ia.md:959`, `:1044`
- E09 executa com Codex: `docs/ia-prompts/etapas/E09-checkout-pedidos.md:86`
- Checkout crítico recomenda Claude: `docs/ia-roadmaps/roadmap-execucao-ia.md:2098`, `:2174`, `:2254`
- Status recomenda Claude: `docs/ia-roadmaps/roadmap-execucao-ia.md:2652`, `:2729`
- Segurança recomenda Claude: `docs/ia-roadmaps/roadmap-execucao-ia.md:3283`, `:3362`, `:3440`

Os prompts devem ser redivididos ou justificar explicitamente a alteração de agente.

### Alto — commands de auditoria/revisão conflitam com persistência de relatório

As instruções gerais obrigam salvar relatórios, e cada auditoria autoriza um arquivo específico. Entretanto, `review-code` e `final-audit` proíbem editar arquivos.

Evidências:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md:96`
- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md:108`
- `.claude/commands/review-code.md:27`
- `.claude/commands/final-audit.md:27`
- `docs/ia-prompts/etapas/E03-auth-admin.md:255`

Por isso, os commands só são recomendados condicionalmente: a exceção para o caminho exato do relatório precisa constar nos argumentos e prevalecer.

### Médio — commands e skills duplicam workflows

`CLAUDE.md` proíbe duplicação sem motivo, mas existem pares quase equivalentes:

- command e skill `final-audit`;
- command e skill `implementation-plan`;
- command e skill `continue-from-codex`;
- `review-code`, `senior-code-review` e `senior-review`;
- `create-code`, `controlled-implementation` e `senior-code-agent`.

Evidência normativa: `CLAUDE.md:52`.

### Médio — skills nominalmente especializadas têm corpo idêntico

As 11 skills possuem o mesmo procedimento, checklist e formato de saída. A especialização está restrita ao frontmatter. Isso enfraquece a justificativa para manter tantas skills distintas.

Exemplos:

- `.claude/skills/implementation-plan/SKILL.md:2`
- `.claude/skills/implementation-planning/SKILL.md:2`
- `.claude/skills/senior-code-review/SKILL.md:2`
- `.claude/skills/senior-review/SKILL.md:2`

### Médio — commands somente leitura mantêm passo de edição

Mesmo commands de revisão e auditoria incluem “execute a menor alteração” quando autorizada, contrariando a regra principal de não editar.

Evidências:

- `.claude/commands/review-code.md:27`
- `.claude/commands/review-code.md:45`
- `.claude/commands/final-audit.md:27`
- `.claude/commands/final-audit.md:45`
- `.claude/commands/checklist-merge.md:27`
- `.claude/commands/checklist-merge.md:45`

### Médio — E12c usa linguagem contraditória no objetivo

O objetivo diz “executar o deploy”, mas o escopo declara que o deploy é exclusivamente humano.

Evidências:

- `docs/ia-prompts/etapas/E12c-deploy-auditoria.md:34`
- `docs/ia-prompts/etapas/E12c-deploy-auditoria.md:42`
- `docs/ia-prompts/etapas/E12c-deploy-auditoria.md:50`

O objetivo deveria dizer “preparar e documentar o deploy para execução humana”.

### Médio — gates de autorização precisam ficar explícitos

- `npm install`: requer aprovação em `.claude/settings.json:48`.
- `prisma migrate dev`: requer aprovação em `.claude/settings.json:51`.
- `prisma db seed`: requer aprovação em `.claude/settings.json:52`.
- Deploy é negado: `.claude/settings.json:113`.
- Auth/RBAC e contratos de checkout exigem autorização: `AGENTS.md:89-91`.
- E02 solicita `migrate dev`: `docs/ia-prompts/etapas/E02-modelagem-prisma.md:164`.
- E12b pode instalar Playwright/a11y: `docs/ia-prompts/etapas/E12b-testes.md:40-43`.

### Observação — arquivo E12 corretamente depreciado

O arquivo determina explicitamente que não deve ser usado:

- `docs/ia-prompts/etapas/E12-testes-deploy.md:1`
- `docs/ia-prompts/etapas/E12-testes-deploy.md:3`

## Conclusão

1. Quais prompts devem usar skill?

Nenhum prompt precisa obrigatoriamente de skill. Como alternativa ao command:

- revisões Claude: `senior-code-review`;
- implementação reatribuída ao Claude: `controlled-implementation`;
- auditorias: `final-audit`, após resolver a escrita do relatório.

2. Quais devem usar command?

- Revisões gerais: `review-code`.
- Revisões de E03, E06, E09 e E12a: `revisar-seguranca`.
- Auditorias finais: `final-audit`, condicionalmente.
- Implementações críticas reatribuídas ao Claude: `create-code`.

3. Quais devem ser executados diretamente?

- Todas as execuções, preparações e correções destinadas explicitamente ao Codex, porque nenhuma skill ativa do Codex corresponde a essas etapas.

4. Quais não devem ser executados?

- Todos os quatro prompts do E12 depreciado.
- E03 e os prompts dependentes de `ADMIN` antes da correção do contrato RBAC.
- Operações de deploy, produção, `migrate deploy` ou instalação de dependências sem gate humano.

5. Existe recurso ausente que valeria criar?

Não é necessário criar outro recurso agora. Primeiro deve-se consolidar os recursos duplicados e corrigir:

- um command de revisão que permita apenas o relatório esperado;
- um command de auditoria que permita exclusivamente o arquivo de auditoria;
- workflows especializados reais para segurança e banco, caso a diferenciação seja mantida.

Status final: Requer ajustes
