# Mapeamento da configuração Claude Code — burger-shop-system

Documento atualizado por leitura direta dos arquivos reais do repositório em
2026-07-05, branch `dev`. Substitui o mapeamento anterior (2026-07-03, branch
`feature/e03-auth-admin`), que ficou desatualizado depois da otimização de
commands/rules descrita na seção 2. Estrutura inspirada em
`CLAUDE_SKILLS_COMMANDS.md` (projeto MokBeats), usada apenas como referência de
forma — todo o conteúdo abaixo é específico do `burger-shop-system`.

---

## 1. Visão geral

### Diferença prática entre os recursos

| Recurso | O que é | Como é acionado | Concede escrita por si só? |
|---|---|---|---|
| **Command** (`.claude/commands/*.md`) | Prompt reutilizável com papel, procedimento e formato de saída fixos. | Usuário digita `/nome argumentos`; o texto vira `$ARGUMENTS` dentro do prompt. | Depende do command — alguns editam, outros são só leitura, outros só podem escrever um relatório com caminho explícito. |
| **Skill** (`.claude/skills/*/SKILL.md`) | Metodologia/checklist reutilizável, ativada pelo Claude Code quando a tarefa se encaixa na `description`, ou por pedido explícito do usuário pelo nome. | Automática (o agente decide) ou por nome ("use a skill X"). Não recebe `$ARGUMENTS`. | Nenhuma das 7 skills concede autorização de escrita por si só — isso é dito explicitamente em cada `SKILL.md`. A autorização vem da tarefa/command que a invocou. |
| **Rule** (`.claude/rules/*.md`) | Invariante de domínio (o que nunca pode quebrar) mais um procedimento operacional padrão. Não é um workflow que se "chama". | Lida pelo agente quando o módulo correspondente é tocado (ex.: mexer em checkout → ler `cart-checkout-orders.md`). | Não. Rules não implementam nada; são regras a observar. |
| **`.claude/settings.json`** | Configuração de permissões do harness Claude Code (allow/ask/deny) e comportamentos automáticos. | Aplicado automaticamente pelo Claude Code antes de qualquer tool call. | Não é invocado — é enforcement de baixo nível, independente de qual command/skill está em uso. |
| **Arquivos de instrução na raiz** (`CLAUDE.md`, `PROJECT_RULES.md`, `AGENTS.md`, `CODEX.md`, `.codex/instructions.md`) | Contexto de sistema/leitura obrigatória — definem papel, escopo, segurança e formato de relatório. | `CLAUDE.md` é carregado automaticamente pelo Claude Code em toda sessão (via `@PROJECT_RULES.md` e conteúdo próprio); os demais são lidos sob demanda conforme a tarefa. | Não. São fonte de regras, não executores. |

### Hierarquia de precedência (conforme `AGENTS.md` §2)

1. Solicitação explícita do usuário.
2. `PROJECT_RULES.md` — fonte central de regras técnicas, funcionais e de segurança.
3. `AGENTS.md`.
4. `CLAUDE.md`, `.claude/commands/`, `.claude/rules/`, `.claude/skills/` — quando o agente é o Claude Code.
5. `CODEX.md` e `.codex/instructions.md` — quando o agente é o Codex ou há continuidade entre agentes.
6. Código existente da branch atual.
7. Boas práticas gerais de Next.js/React/TypeScript/Tailwind/PostgreSQL/Prisma/Auth.js/Zod/segurança web.

Em conflito, `AGENTS.md` manda preservar segurança, integridade de dados, autenticação/autorização, checkout, pedidos e estabilidade da branch atual antes de qualquer outra prioridade.

### Como cada recurso é acionado, na prática

- **Commands**: só rodam quando o usuário digita `/nome`. Todos os 13 commands aceitam e usam `$ARGUMENTS` (confirmado por leitura direta de cada arquivo — nenhum ficou de fora).
- **Skills**: o Claude Code pode ativá-las sozinho ao reconhecer a situação descrita na `description`, ou o usuário pode pedir pelo nome exato (ex.: "use a skill safe-refactor").
- **Rules**: não são "chamadas" — são lidas como parte do procedimento obrigatório de qualquer tarefa que toque o domínio (isso está escrito tanto em `CLAUDE.md` quanto em cada `.claude/rules/*.md`).
- **Settings**: aplicado pelo harness antes de qualquer execução de ferramenta; independe do que o usuário pediu.

---

## 2. Inventário auditável

### Proveniência: por que commands/rules têm essa forma hoje

- Regra vigente (não só histórico): `AGENTS.md §2.1` ("Mapa de
  responsabilidades") declara hoje que `.claude/commands/*` não deve "recopiar
  o protocolo comum" e que `.claude/rules/*` são "invariantes de domínio
  acionáveis por `paths`" que não devem "repetir procedimento/validação/
  bloqueio genéricos". É essa regra — verificável a qualquer momento — que
  explica a forma curta dos commands e o formato `paths` + `## Invariantes`
  das rules hoje, não só um evento passado.
- Contexto histórico: `docs/ia-prompts/promptConfig-ia-burgerSystem.md`
  propôs a arquitetura-alvo (13 commands, 10 rules, 7 skills) que bate com o
  estado atual, exceto o nome de uma rule (ver "Achado operacional" abaixo).
  Antes disso, `docs/ia-auditorias/auditoria-prompts-skills.md` (auditoria) e
  `docs/ia-auditorias/correcao-prompts-skills.md` (correção) já haviam
  consolidado 11→7 skills, fixado o conjunto em 13 commands e corrigido
  referências à role inexistente `ADMIN` — antes do encurtamento dos commands
  e da adição de `paths` às rules, que vieram depois via o `promptConfig`.

### Contagens reais (recalculadas por leitura direta do repositório)

| Categoria | Esperado (ponto de controle) | Encontrado | Divergência |
|---|---|---|---|
| Commands (`.claude/commands/*.md`) | 13 | 13 | Nenhuma |
| Skills (`.claude/skills/*/SKILL.md`) | 7 | 7 | Nenhuma |
| Rules (`.claude/rules/*.md`) | 10 | 10 | Nenhuma |
| `settings.json` | 1 | 1 | Nenhuma |

Nenhuma divergência de contagem foi encontrada.

### Arquivos efetivamente lidos nesta auditoria

- `PROJECT_RULES.md`, `CLAUDE.md` (fornecidos integralmente no contexto de sistema da sessão).
- `AGENTS.md`, `CODEX.md`, `.codex/instructions.md`, `README.md`, `README-IA.md` (lidos integralmente).
- Os 13 arquivos de `.claude/commands/`.
- Os 7 arquivos `SKILL.md` de `.claude/skills/`.
- Os 10 arquivos de `.claude/rules/`.
- `.claude/settings.json` (completo).
- `package.json` (seção `scripts` e `dependencies`).
- `docs/ia-auditorias/TEMPLATE-agent-report.md`.
- Listagem (não conteúdo integral) de `docs/ia-auditorias/` — 15 arquivos; pela sequência execução → correção → revisão → auditoria-final, o mais avançado continua sendo `E03-auth-admin-auditoria-final.md` (ainda não há E04).

### Configurações procuradas e não encontradas

- `hooks` em `.claude/settings.json`: ausente.
- `mcpServers` em `.claude/settings.json` ou `.mcp.json` na raiz: ausente.
- `.claude/plugins/`: não existe.
- Frontmatter `argument-hint`, `allowed-tools` ou `model` em qualquer command: nenhum dos 13 arquivos usa esses campos — só `description`.
- Diretório de hooks dedicado: não existe.

### Restrições de leitura

- Não foram lidos `.env`, `.env.*`, `secrets/**`, nem qualquer arquivo com `secret`, `credential`, `token` ou `cert` no caminho — bloqueado por `permissions.deny` e por instrução explícita da tarefa.
- `.claude/settings.local.json` existe mas seu conteúdo não foi lido (é local, e o próprio `settings.json` proíbe `Edit` sobre ele; tratá-lo como não examinável nesta auditoria é a postura correta).
- `.codex/config.toml` existe mas não foi analisado em profundidade — está fora do escopo desta tarefa (documentar a config do Claude Code), sendo citado apenas como referência de continuidade com o Codex.
- `docs/ia-auditorias/*.md` (exceto o template) foram apenas listados por nome, não lidos por completo — não eram necessários para mapear commands/skills/rules/settings.

### Achado operacional (limitação de configuração, não corrigida nesta tarefa)

O nome real do arquivo é `.claude/rules/security-deploy.md` — não
`security-secrets-deploy.md`, nome usado em `docs/ia-prompts/
promptConfig-ia-burgerSystem.md:304` (arquitetura-alvo proposta), mas que não
foi o nome efetivamente implementado. Com o nome real, a colisão com os globs
`Read(./**/*secret*)`/`Read(./**/*secrets*)` de `permissions.deny` **não se
aplica**: `security-deploy.md` não contém a substring "secret"/"secrets"
(confirmado nesta atualização — o arquivo foi lido normalmente, sem bloqueio).
A colisão que **permanece real** é só com `Bash(*deploy*)`, que bloqueia
qualquer comando de shell cujo argumento contenha a substring "deploy" —
inclusive este nome de arquivo, sem relação com deploy real. É um falso
positivo de correspondência por substring, restrito a comandos de shell (não
afeta leitura direta de arquivo). Não foi alterado (alterar `settings.json`
está fora do escopo desta tarefa de documentação), mas fica registrado como
fricção prática: comandos de shell que recebam esse caminho como argumento
literal serão bloqueados.

### Divergência real encontrada (scripts de validação)

Vários `.claude/rules/*.md` e commands recomendam `npm run test:unit` e
`npm run test:e2e` como validações possíveis. `package.json` hoje define apenas:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint . --max-warnings=0",
  "postinstall": "prisma generate",
  "typecheck": "tsc --noEmit",
  "test": "jest"
}
```

Ou seja, `npm run test:unit` e `npm run test:e2e` **não existem ainda** — só
`npm test` (Jest), `npm run lint`, `npm run typecheck` e `npm run build` são
scripts reais. Isso não é um erro dos commands/rules (eles dizem "se existir"),
mas é relevante registrar: qualquer agente que tentar `npm run test:unit` hoje
receberá erro de script inexistente, não falha de teste.

---

## 3. Commands

### 3.1 Template compartilhado

9 dos 13 commands (`architecture-decision`, `checklist-merge`,
`continue-from-codex`, `create-code`, `debug-app`, `implementation-plan`,
`melhorar-ui-ux`, `refactor-code`, `revisar-performance`) usam **o mesmo
padrão curto** — confirmado por leitura integral dos 9, ~30-36 linhas cada,
não mais 85 —, com frontmatter único (`description`) e corpo:

```
Tarefa/contexto recebido: $ARGUMENTS
## Papel                  (varia por command: papel do agente + regra principal — o real diferenciador)
## Protocolo comum        (mesmo padrão estrutural, adaptado por command: referencia AGENTS.md §3 modos/§5 evidência/§6 git e PROJECT_RULES.md, mais o mapa domínio→rule de AGENTS.md §9; a maioria fecha com "não recopie o protocolo aqui")
## <seção específica>     (varia — nome muda por command: Execução/Análise/Plano/Investigação/Checklist/Continuidade; é o segundo real diferenciador)
## Validação e saída      (referencia PROJECT_RULES.md §17 para validações e §18 para o formato de relatório, sem repetir o conteúdo)
```

Isso substitui o esqueleto antigo de ~85 linhas, que repetia inline leitura
obrigatória, regras de escopo, procedimento de 10 passos, validações e
formato de relatório em cada command. O protocolo comum foi centralizado em
`AGENTS.md`/`PROJECT_RULES.md` (ver proveniência na seção 2) e cada command
passou a só referenciá-lo por número de seção. Importante: o padrão acima
**não é texto byte-idêntico** entre os 9 — é a mesma estrutura com pequenas
adaptações gramaticais por command (ex.: alguns dizem "leia a rule... o
arquivo afetado", outros "leia a(s) rule... os arquivos afetados"; commands
que não editam código fecham a seção de forma diferente dos que editam).

A tabela abaixo documenta o que **realmente muda** entre esses 9 — o resto do
padrão é estrutural e não é repetido por command.

| Command | Papel do agente | Regra principal (real diferenciador) | Edita arquivos? | Quando usar | Quando não usar |
|---|---|---|---|---|---|
| `/architecture-decision` | Arquiteto de software sênior | "Não implemente código automaticamente. Produza ADR, alternativas, trade-offs, riscos e recomendação incremental." | Não (produz ADR, não código) | Decisão técnica pendente (ex.: escolher entre Server Action ou Route Handler para um fluxo novo) | Quando já existe decisão tomada e você só quer implementar — use `/create-code` |
| `/checklist-merge` | Revisor final antes de merge | "Não altere arquivos. Faça análise objetiva com base em evidência." | Não | Antes de abrir/aprovar merge de uma branch de etapa para `dev` | Durante o desenvolvimento — não substitui `/review-code` intermediário |
| `/continue-from-codex` | Agente de continuidade Codex → Claude Code | "Baseie-se no estado real do Git, não apenas no relatório." | Condicional (passo 5 permite editar "quando a edição estiver autorizada") | Ao retomar uma etapa que o Codex deixou em relatório em `docs/ia-auditorias/` | Quando não há relatório anterior do Codex a continuar |
| `/create-code` | Engenheiro full-stack sênior Next.js/TypeScript | "Implemente apenas o escopo solicitado com menor alteração segura suficiente." | Sim | Implementar feature ou correção com escopo já claro | Tarefa ainda ambígua (use `/implementation-plan` primeiro) ou que é só revisão |
| `/debug-app` | Engenheiro sênior de debug/causa raiz | "Investigue antes de alterar. Não implemente correções especulativas." | Condicional (investiga primeiro; edita só se autorizado) | Bug reportado sem causa raiz confirmada | Quando a causa já é conhecida e só falta implementar a correção — use `/create-code` |
| `/implementation-plan` | Tech lead de planejamento | "Não implemente. Entregue fases pequenas, critérios de aceite, validações e riscos." | Não | Antes de iniciar uma etapa nova do roadmap | Depois que o plano já existe e a etapa está em execução |
| `/melhorar-ui-ux` | Front-end sênior focado em UX de restaurante | "Preserve comportamento funcional e evite reescrita visual ampla." | Sim (incremental) | Melhorar hierarquia visual/responsividade de uma tela específica | Redesenho completo sem aprovação prévia |
| `/refactor-code` | Engenheiro sênior de refatoração segura | "Refatore somente quando estiver no escopo ou reduzir risco real." | Sim | Remover duplicação/reduzir acoplamento sem mudar comportamento | Misturado com feature nova — separe as tarefas |
| `/revisar-performance` | Especialista em performance web/banco | "Não edite arquivos nem otimize prematuramente. Priorize evidência e impacto real." | Não | Suspeita de gargalo em Server Components/Prisma/bundle | Otimização especulativa sem medição |

**Exemplo real (burger-system):**

```
/create-code adicione campo opcional "observação do cliente" no formulário de checkout e persista no OrderItem
```

```
/debug-app o status do pedido não muda de RECEIVED para CONFIRMED na tela de cozinha mesmo após o admin confirmar
```

### 3.2 Commands com contrato de escrita próprio (formato reduzido/customizado)

Estes 4 commands **não** seguem o padrão compartilhado da seção 3.1 (com `##
Protocolo comum`) — têm, em vez disso, um contrato de escrita explícito e
restrito (só podem criar/atualizar **um** arquivo de relatório, e só se o
caminho vier em `$ARGUMENTS`).

#### `/final-audit`
- Caminho: `.claude/commands/final-audit.md`.
- Finalidade: auditor técnico final antes de commit/entrega/handoff. Não corrige a implementação auditada.
- Sintaxe: `/final-audit <caminho do relatório em docs/ia-auditorias/, terminado em -auditoria-final.md, correspondente à etapa>`.
- Argumentos aceitos: `$ARGUMENTS` **deve** informar o caminho exato do relatório; se ausente/ambíguo/inconsistente, o command não escreve e reporta `Status final: Bloqueado`.
- O que faz: compara diff final, execução, revisão e correção anteriores; classifica riscos; usa `docs/ia-auditorias/TEMPLATE-agent-report.md` como saída.
- O que pode alterar: nada além do relatório explicitamente autorizado — nem implementação, nem documentação funcional.
- Quando usar: fechamento de etapa (ex.: E03 auth-admin) antes de commit final.
- Quando não usar: durante a implementação, ou sem um caminho de relatório definido.
- Exemplo: `/final-audit docs/ia-auditorias/E03-auth-admin-auditoria-final.md`.

#### `/review-code`
- Caminho: `.claude/commands/review-code.md`.
- Finalidade: revisor sênior de diff/implementação, sem editar.
- Sintaxe: `/review-code <contexto>` ou `/review-code <contexto> + caminho de relatório em docs/ia-auditorias/*-revisao.md`.
- Argumentos aceitos: `$ARGUMENTS` é o contexto da revisão; opcionalmente pode incluir o caminho do relatório (mesmo contrato de sufixo/pasta do `final-audit`, mas com sufixo `-revisao.md`). Sem caminho exato, responde só no chat.
- O que faz: classifica achados como bloqueador/alto/médio/baixo/observação, com arquivo/linha/impacto/evidência/correção mínima; separa validações reexecutadas de evidências históricas.
- O que pode alterar: nada, exceto o relatório de revisão explicitamente autorizado.
- Quando usar: revisar um diff ou implementação concluída antes de seguir adiante.
- Quando não usar: quando você quer que o achado já seja corrigido — nesse caso use `/create-code` ou `/refactor-code` depois.
- Exemplo: `/review-code revise o middleware de RBAC implementado na E03`.

#### `/revisar-prisma-banco`
- Caminho: `.claude/commands/revisar-prisma-banco.md`.
- Finalidade: revisão somente leitura de schema, migrations, seed e transações Prisma.
- Sintaxe: `/revisar-prisma-banco <contexto>`.
- Argumentos aceitos: contexto da revisão; opcionalmente caminho de relatório (`docs/ia-auditorias/*-revisao.md`, mesmo contrato).
- O que faz: checklist especializado — `onDelete`, `Decimal` para valores monetários, constraints/índices, migrations pequenas e não reescritas, seed idempotente, transações curtas em checkout/pedido, separação local/preview/produção. Explicitamente lê `.claude/rules/prisma-database.md`.
- O que pode alterar: nada — nem migration, nem seed, nem banco; só o relatório autorizado.
- Quando usar: antes de aprovar uma migration nova ou alteração de schema.
- Quando não usar: para rodar a migration em si — isso exige autorização e comando explícito, fora do escopo deste command.
- Exemplo: `/revisar-prisma-banco revise a migration que adiciona AuditLog e os índices de Order`.

#### `/revisar-seguranca`
- Caminho: `.claude/commands/revisar-seguranca.md`.
- Finalidade: revisão de segurança de auth, RBAC, checkout, pedidos, webhooks, secrets e superfície web.
- Sintaxe: `/revisar-seguranca <contexto>`.
- Argumentos aceitos: contexto da revisão; mesmo contrato opcional de relatório do `/review-code`.
- O que faz: checklist especializado — Auth.js/cookies/sessão, matriz RBAC validada no servidor, proteção de Server Actions/Route Handlers, força bruta/enumeração/rate limiting, Zod, checkout idempotente, upload (MIME/extensão/tamanho/path traversal), logs/PII/secrets. Lê explicitamente `auth-admin-rbac.md`, `security-deploy.md`, `cart-checkout-orders.md`, `payments-webhooks.md`, `catalog-products.md`.
- O que pode alterar: nada — nem implementação, nem correção automática.
- Quando usar: antes de liberar uma etapa que toca autenticação, pagamento ou dados pessoais (ex.: E03 auth-admin).
- Quando não usar: como substituto de revisão de performance ou de banco — use os commands específicos.
- Exemplo: `/revisar-seguranca revise o RBAC da E03 antes do merge para dev`.

---

## 4. Skills

Todas as 7 skills têm frontmatter apenas com `name` e `description`. Nenhuma
concede autorização de escrita por conta própria — cada `SKILL.md` diz isso
explicitamente.

### `architecture-review`
- Caminho: `.claude/skills/architecture-review/SKILL.md`.
- Finalidade/ativação: revisar ADRs e decisões que alterem fronteiras entre App Router, Server Components, Server Actions, Route Handlers, Auth.js, Prisma e services de domínio. Ativa quando a tarefa envolve avaliar uma decisão arquitetural já proposta.
- Quando usar: para auditar uma decisão já tomada/documentada.
- Quando não usar: para decidir algo novo do zero (isso é o `/architecture-decision`).
- Procedimento e restrições: lê regras aplicáveis, compara ≥2 alternativas (incluindo manter o desenho atual), avalia segurança/dados/operação/reversibilidade/custo de migração, verifica aderência ao monolito modular/server-first/MVP.
- Capacidade de edição: nenhuma — "não implementa a decisão nem concede escrita".
- Saída esperada: contexto, decisão proposta, alternativas, trade-offs, riscos, compatibilidade, validações necessárias.
- Command semelhante: `/architecture-decision`.
- Diferença prática: o command é prospectivo (decidir entre opções para algo novo); a skill é retrospectiva (revisar uma decisão/ADR já existente).
- Exemplo de solicitação: "Antes de aprovar o ADR de sessão via JWT vs. database session do Auth.js, faça uma revisão arquitetural."

### `final-audit`
- Caminho: `.claude/skills/final-audit/SKILL.md`.
- Finalidade/ativação: metodologia de auditoria final antes de encerrar etapa/handoff/release.
- Quando usar: quando alguém pede "faça uma auditoria final" em linguagem natural, sem apontar um caminho de relatório.
- Quando não usar: quando já existe caminho de relatório definido — nesse caso o command `/final-audit` é o recurso correto, pois formaliza o contrato de escrita.
- Procedimento e restrições: compara solicitação/critérios de aceite/diff/relatórios anteriores; separa validações reexecutadas de resultados só registrados; classifica achados por severidade.
- Capacidade de edição: nenhuma — "somente um command ou prompt explícito pode autorizar o caminho exato do relatório".
- Saída esperada: escopo, evidências, achados, validações executadas/não executadas, riscos, pendências, próximo passo, status final.
- Command semelhante: `/final-audit` (mesmo nome).
- Diferença prática: a skill nunca escreve arquivo, nem relatório — só responde no chat. O command escreve exatamente um relatório, com caminho validado.
- Exemplo de solicitação: "Faça uma auditoria final da E03 auth-admin, mas só no chat, sem gerar arquivo."

### `implementation-planning`
- Caminho: `.claude/skills/implementation-planning/SKILL.md`.
- Finalidade/ativação: transformar uma etapa/solicitação em plano técnico "decision-complete".
- Quando usar: antes de implementar algo não trivial e sem plano formal ainda.
- Quando não usar: quando o plano já existe e a tarefa é executar.
- Procedimento e restrições: confirma objetivo/comportamento atual/esperado/público afetado; lê implementação real e contratos consumidores; delimita escopo/arquivos prováveis/proibidos/dependências; decompõe em fases pequenas e reversíveis; especifica testes/validações/critérios de aceite.
- Capacidade de edição: nenhuma — "exclusivamente de planejamento e não autoriza edição".
- Saída esperada: resumo, mudanças por subsistema, contratos afetados, plano de testes, riscos, premissas.
- Command semelhante: `/implementation-plan`.
- Diferença prática: essencialmente o mesmo conteúdo — o command é o entrypoint formal com `$ARGUMENTS` e leitura obrigatória padronizada; a skill é o mesmo raciocínio ativado por pedido em linguagem natural.
- Exemplo de solicitação: "Antes de implementar o dashboard operacional, crie um plano de implementação incremental."

### `legacy-code-audit`
- Caminho: `.claude/skills/legacy-code-audit/SKILL.md`.
- Finalidade/ativação: descobrir o comportamento real de uma base existente antes de planejar uma nova etapa; não presume que a documentação anterior esteja correta.
- Quando usar: antes de mexer em um módulo pouco conhecido ou recém-criado (ex.: revisar o que a E03 realmente implementou antes da E04).
- Quando não usar: para revisar um diff pontual recente — isso é `senior-code-review`/`/review-code`.
- Procedimento e restrições: mapeia entrypoints/módulos/contratos/dados/consumidores; compara documentação, testes e comportamento implementado; identifica código órfão/duplicação/acoplamento/risco de regressão; separa fatos de hipóteses.
- Capacidade de edição: nenhuma — "a auditoria é somente leitura".
- Saída esperada: inventário da base, fluxos atuais, divergências documentais, riscos classificados, pré-condições para a próxima implementação.
- Command semelhante: **nenhum**. Não existe `/legacy-code-audit` em `.claude/commands/` — esta é a única skill sem par direto. Conceitualmente se aproxima de `/continue-from-codex` (que também parte do estado real do Git) e dos commands de revisão, mas nenhum cobre exatamente "auditar base legada antes de nova etapa".
- Exemplo de solicitação: "Antes de implementar a tela de cozinha, faça uma auditoria de código legado no fluxo de pedidos já implementado na E02/E03."

### `safe-refactor`
- Caminho: `.claude/skills/safe-refactor/SKILL.md`.
- Finalidade/ativação: orientar refatoração com preservação comprovável de comportamento, contratos, autorização, dados e fluxos financeiros.
- Quando usar: ao refatorar código que já tem comportamento em produção/uso, especialmente perto de auth, banco, checkout ou pedidos.
- Quando não usar: para features novas — a skill não deve ser usada para justificar mudança de contrato.
- Procedimento e restrições: define o que não pode mudar e como será observado; mapeia consumidores/tipos/persistência/efeitos colaterais; cria/confirma testes de caracterização antes de mudar; muda pouco por vez; compara antes/depois. "Mudanças em Auth/RBAC, migrations, checkout ou pedidos exigem plano e revisão específica. A skill não amplia a autorização dada pela tarefa."
- Capacidade de edição: sim, dentro da autorização já concedida à tarefa que a invocou (a skill não concede autorização extra).
- Saída esperada: comparação antes/depois, diff revisado por regressões, ponto de parada se a preservação não puder ser demonstrada.
- Command semelhante: `/refactor-code`.
- Diferença prática: o command é o entrypoint formal (com leitura obrigatória e relatório padronizado); a skill é a disciplina interna que qualquer refatoração (via command ou não) deve seguir — não é uma alternativa a escolher em vez do command, é a metodologia que o command aplica.
- Exemplo de solicitação: "Refatore o serviço de cálculo de taxa de entrega com segurança, preservando os contratos do checkout."

### `senior-code-agent`
- Caminho: `.claude/skills/senior-code-agent/SKILL.md`.
- Finalidade/ativação: executar implementação já aprovada com escopo controlado e menor alteração segura suficiente.
- Quando usar: quando alguém pede implementação em linguagem natural, sem digitar `/create-code` explicitamente.
- Quando não usar: para revisão ou auditoria — "esta skill não substitui commands de revisão ou auditoria".
- Procedimento e restrições: confirma branch/status/objetivo/critérios de aceite/autorizações; lê rules e implementação relacionadas; declara arquivos prováveis/proibidos/contratos preservados; valida plano antes de editar em área sensível; implementa incrementalmente sem feature creep.
- Capacidade de edição: sim — é a skill de implementação geral.
- Saída esperada: arquivos, decisões, resultados, riscos, próximo passo.
- Command semelhante: `/create-code`.
- Diferença prática: mesmo papel e mesmas restrições — o command é o modo formal de acionar (via `$ARGUMENTS` e o padrão curto da seção 3.1); a skill é o mesmo comportamento ativado quando o usuário descreve a tarefa em linguagem natural, sem usar `/`.
- Exemplo de solicitação: "Implemente com postura sênior o CRUD de categorias no admin, seguindo o checklist de validação."

### `senior-code-review`
- Caminho: `.claude/skills/senior-code-review/SKILL.md`.
- Finalidade/ativação: revisar diff/implementação sem editar, priorizando defeitos, regressões, segurança e aderência a critérios de aceite.
- Quando usar: quando o pedido de revisão vem em linguagem natural, sem exigir um relatório persistido.
- Quando não usar: quando um relatório em `docs/ia-auditorias/*-revisao.md` precisa existir — nesse caso use `/review-code`, que tem contrato de escrita.
- Procedimento e restrições: confirma escopo/branch/status/base de comparação; lê diff e contexto de cada contrato alterado; avalia testes pelo risco mitigado, não pela existência; classifica achados por severidade.
- Capacidade de edição: nenhuma — "a skill não autoriza escrita; use command com caminho explícito quando um relatório for necessário".
- Saída esperada: achados por severidade, dúvidas, validações executadas/não executadas, riscos residuais, veredito.
- Command semelhante: `/review-code` (também relacionado a `/checklist-merge`, `/revisar-performance`, `/revisar-prisma-banco`, `/revisar-seguranca` — todos seguem o mesmo padrão "não editar, classificar por severidade").
- Diferença prática: mesmo conteúdo de revisão; a skill nunca produz arquivo, o command pode produzir exatamente um relatório com caminho validado.
- Exemplo de solicitação: "Faça uma revisão sênior do middleware de autenticação implementado na E03, sem gerar relatório em arquivo."

---

## 5. Rules

9 das 10 rules em `.claude/rules/*.md` (todas exceto `security-deploy.md`)
compartilham hoje esta estrutura curta — confirmado por leitura integral das
10: frontmatter `paths:` (lista de globs de arquivo) + uma linha "Derivada de
`PROJECT_RULES.md §X`. Se esta rule divergir, atualize `PROJECT_RULES.md`
primeiro." + **uma única seção** `## Invariantes` (lista curta de bullets).
Não repetem mais procedimento obrigatório, validações recomendadas nem sinais
de bloqueio — isso foi centralizado por referência ao protocolo comum
(`AGENTS.md §3-§10`, `PROJECT_RULES.md §17`; ver proveniência na seção 2).

**Exceção confirmada — `security-deploy.md`:** a rule transversal de
segurança/secrets/deploy (sem domínio de arquivo específico) hoje **não** tem
frontmatter `paths:` e mantém a estrutura longa antiga: `## Aplicação`, `##
Regras específicas`, `## Procedimento obrigatório`, `## Validações
recomendadas`, `## Sinais de bloqueio`. Isso é uma inconsistência real e atual
do próprio arquivo, não um erro deste documento: `AGENTS.md §2.1` diz
explicitamente que rules não devem "repetir procedimento/validação/bloqueio
genéricos", mas esta rule ainda repete. Registrado aqui como observação —
corrigir `.claude/rules/security-deploy.md` está fora do escopo desta
atualização de documentação.

Por isso, a tabela abaixo foca no que **muda** — domínio e invariantes
específicos:

| Rule | Domínio | Invariantes principais | Commands/skills mais relacionados |
|---|---|---|---|
| `auth-admin-rbac.md` | Auth.js, sessão, RBAC | Roles OWNER/MANAGER/ATTENDANT/KITCHEN; toda ação admin valida sessão+role no servidor; usuário inativo não autentica; nunca confiar em role do cliente; mudanças em user/role/senha/permissões geram `AuditLog`; Auth.js/middleware/cookies exigem plano. | `/revisar-seguranca`, `revisar-seguranca` (checklist), `create-code` quando toca admin |
| `cart-checkout-orders.md` | Carrinho, checkout, pedidos | Carrinho client-side é só UX; checkout recalcula subtotal/taxa/desconto/total no servidor; pedido grava snapshot; código de pedido único e seguro; criação transacional e idempotente. | `/create-code`, `/revisar-seguranca`, `/revisar-prisma-banco` |
| `catalog-products.md` | Catálogo, produtos, adicionais | Catálogo público só lista itens ativos/disponíveis; Zod valida nome/slug/preço/categoria/disponibilidade; preço não pode ser negativo; imagens com `altText`+`sortOrder`; nunca usar mock permanente como produto real. | `/create-code`, `/melhorar-ui-ux` |
| `delivery-store-settings.md` | StoreSettings, OperatingHour, DeliveryArea | `StoreSettings` define nome/WhatsApp/abertura manual/tempo médio/pedido mínimo; checkout valida loja aberta+pedido mínimo+entrega antes de criar pedido; mudanças operacionais geram `AuditLog`. | `/create-code`, `/revisar-seguranca` |
| `kitchen-order-flow.md` | Tela de cozinha, fluxo de status | Legibilidade/contraste/rapidez; KITCHEN só acessa fila e transições permitidas; transições validadas por serviço de domínio; polling simples aceitável no MVP; evitar dados pessoais desnecessários. | `/melhorar-ui-ux`, `/create-code` |
| `nextjs-app-router.md` | Arquitetura App Router | Server Components por padrão; Client Components só para estado/handlers/efeitos/browser APIs; Server Actions para mutação interna; Route Handlers para health/webhook/API externa; nunca importar Prisma em Client Component; nunca `NEXT_PUBLIC_*` para secret; avaliar `revalidatePath`/`revalidateTag`. | `/create-code`, `/refactor-code`, `architecture-review` |
| `payments-webhooks.md` | Pagamento manual, webhooks futuros | MVP usa pagamento manual; gateway real exige ADR+autorização; adapters isolados em `services/payment`; webhook é Route Handler; webhook real valida assinatura/idempotência/`providerRef`; nunca salvar secret de gateway. | `/revisar-seguranca`, `/architecture-decision` |
| `prisma-database.md` | Schema, migrations, seed | Migrations pequenas/versionadas/revisáveis; não editar migration já aplicada sem autorização; nunca `migrate reset` sem autorização explícita; transações curtas para checkout/pedido; seed idempotente sem senha real; índices para slugs/código de pedido/status+data/auditoria. | `/revisar-prisma-banco` |
| `security-deploy.md` | Segurança, secrets, deploy | Nunca ler/editar `.env`/secrets; nunca deploy/push/reset/clean/sudo/ssh/curl/wget sem autorização; nunca expor senha/token/cookie/chave em log; Zod em toda entrada externa; proteger ação admin server-side; nunca migration destrutiva sem revisão humana. | `/revisar-seguranca`, todos os commands (regra transversal) |
| `ui-ux-tailwind.md` | UI/UX, Tailwind | Pública mobile-first e focada em conversão; admin objetivo/legível/eficiente; cozinha com botões grandes e alto contraste; Tailwind sem CSS global grande; formulários com label/erro/loading-disabled; nenhuma lib visual nova sem aprovação. | `/melhorar-ui-ux` |

---

## 6. Settings e segurança

### Resumo de `.claude/settings.json`

Sem `hooks`, sem `mcpServers`, sem plugins configurados. Campos de
comportamento automático: `autoCompactEnabled`, `autoMemoryEnabled`,
`cleanupPeriodDays: 14`, `defaultMode: "default"`, `disableAutoMode:
"disable"` e `disableBypassPermissionsMode: "disable"` (os dois últimos não
constavam no mapeamento anterior), além das exclusões de `CLAUDE.md` para
`node_modules`/`.next`/`dist`/`build`/`coverage`.

### Permissões

- **`allow` (auto-aprovado)** — leitura e validação segura e não destrutiva:
  `git status`/`branch`/`diff`/`log`, `find`, `ls`, `rg`, `cat package.json`,
  `npm run lint`/`typecheck`/`build`/`test` (+ variantes), `npx prisma
  validate`/`generate`/`migrate status`.
- **`ask` (pede confirmação)** — ações que alteram estado ou dependem de
  ambiente: `git add`/`commit`/`merge`/`rebase`, `npm install`/`npm i`/`npm ci`,
  `npx prisma migrate dev`/`db seed`, `npx` genérico, `docker*`, `psql`/`pg_dump`,
  `WebFetch`.
- **`deny` (bloqueado sempre)**, por categoria:
  - Acesso a secrets/credenciais: leitura e edição de `.env`/`.env.*`,
    `secrets/**` e qualquer caminho contendo `secret`, `credential`, `token`
    ou `cert`.
  - Autoproteção de config: não é possível editar `.claude/settings.local.json`.
  - Filesystem destrutivo: `rm -rf/-fr/-r/-f`, `dd`, `mkfs`, `shred`,
    `truncate`, `chmod 777`, `chown`.
  - Git destrutivo: `git reset --hard`, `git clean -fd/-xfd`, `git push`.
  - Escalação/acesso remoto: `sudo`, `su`, `ssh`.
  - Rede via shell: `curl`, `wget`.
  - Deploy: qualquer comando contendo a substring `deploy` (ver observação na
    seção 2 sobre o falso positivo com `security-deploy.md`).
  - Prisma destrutivo: `migrate reset`, `migrate deploy`.

### Implicações práticas para o uso diário

- Ações de leitura/diagnóstico do dia a dia (status, diff, lint, typecheck,
  build, test, prisma validate/generate/migrate status) rodam sem
  interromper o fluxo.
- Qualquer coisa que grave estado (`git add/commit`, instalar dependência,
  `prisma migrate dev`/`db seed`) para e pede confirmação — alinhado com
  `PROJECT_RULES.md` §15 e `AGENTS.md` §4.
- Nada relacionado a secrets, deploy, ou operações destrutivas de
  git/filesystem/banco passa despercebido — está bloqueado na camada de
  ferramenta, não depende do agente "lembrar" da regra.
- `.claude/settings.local.json` existe mas não foi lido nesta auditoria; por
  definição do próprio `settings.json`, nem o Claude Code pode editá-lo
  automaticamente.
- O glob amplo `Bash(*deploy*)` tem o efeito colateral de bloquear comandos de
  shell cujo argumento apenas *contenha* a palavra "deploy" em um nome de
  arquivo, mesmo sem relação com deploy real — é o caso do nome real da rule
  transversal de segurança, `security-deploy.md` (ver "Achado operacional" na
  seção 2). Isso não afeta a ferramenta de leitura direta de arquivo, só
  comandos de shell que recebam esse caminho como argumento literal.

---

## 7. Sobreposições e escolha do recurso

`CLAUDE.md` já estabelece a regra geral: "Não invoque command e skill
equivalentes simultaneamente; escolha o recurso mais específico para a
tarefa." Os pares abaixo são os únicos com nome/propósito coincidente
confirmados nesta auditoria — mais 1 assimetria (skill sem command).

| Par | Diferença real | Quando escolher qual |
|---|---|---|
| `/create-code` × `senior-code-agent` | Mesmo procedimento e mesmas restrições — o command é o entrypoint formal (`$ARGUMENTS`, padrão curto da seção 3.1); a skill é o mesmo comportamento ativado por linguagem natural, sem `/`. | Use `/create-code` quando quiser forçar a leitura obrigatória e o relatório padronizado explicitamente; a skill dispara sozinha quando você só descreve a implementação sem usar o command. Não peça as duas para a mesma tarefa. |
| `/review-code` × `senior-code-review` | O command tem contrato de escrita (pode gerar `docs/ia-auditorias/*-revisao.md` se caminho for informado); a skill nunca escreve arquivo, só responde no chat. | Use o command quando precisar de um relatório persistido para auditoria/handoff; use a skill (por nome) para uma revisão pontual sem artefato. |
| `/refactor-code` × `safe-refactor` | O command é o entrypoint de refatoração com relatório formal; a skill é a disciplina interna (testes de caracterização, comparação antes/depois) que a refatoração deve seguir — não amplia autorização por conta própria. | `/refactor-code` é o que você digita para iniciar a tarefa; a skill não é uma alternativa a escolher separadamente, é o método que a tarefa (via command ou outro contexto já autorizado) deve seguir. |
| `/architecture-decision` × `architecture-review` | O command é prospectivo — decidir entre alternativas para algo novo. A skill é retrospectiva — revisar um ADR/decisão já proposta. | Decisão nova pendente → `/architecture-decision`. ADR já escrito para validar → `architecture-review`. |
| `/implementation-plan` × `implementation-planning` | Conteúdo essencialmente equivalente — sem diferença de restrição encontrada nos dois arquivos. | Use o command como entrypoint formal; a skill dispara pelo mesmo pedido em linguagem natural ("antes de implementar X, crie um plano"). |
| `/final-audit` × skill `final-audit` (mesmo nome) | O command tem contrato de escrita rígido (caminho obrigatório em `docs/ia-auditorias/*-auditoria-final.md`, usa o template oficial, bloqueia se o caminho faltar). A skill nunca escreve — é metodologia pura para uso em chat. | Precisa de relatório de auditoria final gravado → command. Só quer o raciocínio de auditoria final no chat → skill. |

**Assimetria sem par:** a skill `legacy-code-audit` não tem command
equivalente em `.claude/commands/`. Também não há skill para 7 dos 13
commands: `checklist-merge`, `continue-from-codex`, `debug-app`,
`melhorar-ui-ux`, `revisar-performance`, `revisar-prisma-banco`,
`revisar-seguranca` — esses só existem como command.

---

## 8. Guia rápido

| Quero... | Uso... |
|---|---|
| Implementar algo com escopo já claro | `/create-code <descrição>` |
| Implementar via pedido em linguagem natural, sem `/` | skill `senior-code-agent` (automática) |
| Revisar um diff/implementação, com relatório persistido | `/review-code <contexto + caminho *-revisao.md>` |
| Revisar um diff, só no chat | skill `senior-code-review` |
| Refatorar com segurança | `/refactor-code <o que refatorar>` |
| Investigar um bug antes de corrigir | `/debug-app <descrição do bug>` |
| Decidir entre alternativas arquiteturais | `/architecture-decision <pergunta>` |
| Validar um ADR/decisão já tomada | skill `architecture-review` |
| Planejar uma etapa antes de implementar | `/implementation-plan <etapa>` ou skill `implementation-planning` |
| Auditar uma base existente antes de mexer nela | skill `legacy-code-audit` (sem command equivalente) |
| Checklist antes de merge | `/checklist-merge <branch/contexto>` |
| Auditoria final antes de commit/handoff, com relatório | `/final-audit <caminho *-auditoria-final.md>` |
| Auditoria final só em chat | skill `final-audit` |
| Continuar tarefa que o Codex deixou | `/continue-from-codex <relatório do Codex>` |
| Melhorar UI/UX de uma tela | `/melhorar-ui-ux <tela/problema>` |
| Investigar gargalo de performance | `/revisar-performance <área>` |
| Revisar schema/migrations/seed Prisma | `/revisar-prisma-banco <área>` |
| Revisar segurança (auth, RBAC, checkout, webhooks) | `/revisar-seguranca <área>` |

### Fluxo recomendado por etapa

1. **Planejar**: `/implementation-plan` (ou skill `implementation-planning`) antes de tocar código.
2. **Auditar base existente**, se o módulo já tiver histórico: skill `legacy-code-audit`.
3. **Implementar**: `/create-code`, `/refactor-code` ou `/melhorar-ui-ux`, conforme o caso.
4. **Revisar**: `/review-code` e, conforme o domínio tocado, `/revisar-seguranca`, `/revisar-prisma-banco` ou `/revisar-performance`.
5. **Checklist de merge**: `/checklist-merge`.
6. **Auditoria final**: `/final-audit` com caminho explícito em `docs/ia-auditorias/`.

### Exemplos prontos para o burger-system

```
/implementation-plan modelar o fluxo de cancelamento de pedido pelo admin, com motivo obrigatório e AuditLog
/create-code implemente o cancelamento de pedido pelo admin conforme o plano aprovado
/revisar-seguranca revise se o cancelamento de pedido valida role ANTES de alterar o status
/checklist-merge branch feature/e04-cancelamento-pedido pronta para merge na dev
/final-audit docs/ia-auditorias/E04-cancelamento-pedido-auditoria-final.md
```
