# promptConfig-ia-burgerSystem.md

## Execução recomendada no Claude Code

- Repositório aberto no VS Code: `burger-system`.
- Branch principal do projeto: `dev`.
- Branches conhecidas: `dev`, `feature/e01-setup-inicial`, `feature/e02-modelagem-e-prisma`, `feature/e03-auth-admin`, `docs/ia-prompts-lote-1`.
- Ative o **Plan Mode** antes de colar este prompt.
- Se o command `/implementation-plan` existir no projeto, execute assim:

```txt
/implementation-plan [cole este prompt inteiro aqui]
```

- Se `/implementation-plan` não estiver disponível, cole o prompt diretamente em Plan Mode e peça explicitamente as skills `implementation-planning` e `architecture-review`.
- Não use `/create-code` na primeira execução.
- Após aprovação humana do plano, a implementação pode ser feita com `/refactor-code` ou `/create-code`, mas somente dentro do escopo aprovado e sem tocar código funcional do app.

## Arquivos de referência necessários

Para uma análise completa, use como referência as configurações atuais do `burger-system` e as configurações do `MokBeats`.

### Obrigatório no workspace atual do burger-system

Leia, se existirem:

- `AGENTS.md`
- `CLAUDE.md`
- `CODEX.md`
- `PROJECT_RULES.md`
- `.claude/settings.json`
- `.claude/settings.local.json` apenas para diagnosticar risco; não copiar conteúdo e não transformar em fonte de verdade
- `.claude/scheduled_tasks.lock` apenas para diagnosticar se está versionado indevidamente
- `.claude/commands/**/*.md`
- `.claude/rules/**/*.md`
- `.claude/skills/**/SKILL.md`
- `.codex/config.toml`
- `.codex/instructions.md`
- `.gitignore`
- `docs/ia-agentes/**`, se existir
- `docs/ia-auditorias/TEMPLATE-agent-report.md`, se existir
- `docs/ia-auditorias/auditoria-prompts-skills.md`, se existir
- `docs/ia-auditorias/correcao-prompts-skills.md`, se existir
- `docs/ia-prompts/**`, se existir

### Referência externa necessária: MokBeats

Se o ZIP de configurações do `MokBeats` estiver importado no Claude Code ou disponível no workspace, use-o como referência. Caso contrário, solicite ao usuário **somente** o pacote de configuração de IA do MokBeats, contendo:

- `AGENTS.md`
- `CLAUDE.md`
- `CODEX.md`
- `PROJECT_RULES.md`
- `.claude/settings.json`
- `.claude/commands/**/*.md`
- `.claude/rules/**/*.md`
- `.claude/skills/**/SKILL.md`
- `.codex/config.toml`
- `.codex/instructions.md`
- `.gitignore`
- `docs/ia-auditorias/TEMPLATE-agent-report.md`, se existir
- `CLAUDE_SKILLS_COMMANDS.md`, se disponível como mapeamento de commands/skills

Não peça o repositório inteiro se os arquivos acima forem suficientes.

---

# Tarefa

Atue como arquiteto sênior de software, especialista em engenharia de prompts operacionais, Claude Code, Codex, VS Code, governança de agentes, economia de tokens, segurança operacional, Next.js App Router, Prisma, Auth.js, TypeScript, Zod, RBAC e desenvolvimento FullStack.

O objetivo é revisar e otimizar as configurações de IA do projeto **burger-system**, aproveitando os pontos fortes encontrados no `MokBeats`, sem descaracterizar o burger-system e sem copiar regras de stack incompatíveis.

O `burger-system` é um projeto novo, com branch principal `dev`, stack baseada em Next.js App Router, TypeScript, Prisma, Auth.js, Zod, Tailwind e domínio de sistema de hamburgueria com catálogo, carrinho, checkout, pedidos, painel admin, cozinha, delivery, pagamentos manuais e configurações da loja.

O `MokBeats` é apenas referência comparativa para padrões melhores de economia de tokens, commands enxutos, rules com `paths` e separação prática de comandos, skills e rules. Não copie regras de Angular, RxJS, WaveSurfer, player, música, produtor, comprador ou checkout de licenças para o burger-system.

---

# Modo obrigatório nesta primeira execução

Nesta primeira execução, trabalhe **exclusivamente em modo planejamento**.

Você pode:

- ler arquivos;
- mapear estrutura;
- comparar padrões;
- identificar duplicações;
- propor arquitetura-alvo;
- listar riscos;
- montar plano incremental;
- sugerir arquivos a alterar;
- sugerir arquivos a remover do versionamento;
- sugerir comandos de validação.

Você não pode:

- criar arquivos;
- editar arquivos;
- mover arquivos;
- apagar arquivos;
- executar `git add`, `git commit`, `git push`, `git merge`, `git rebase`, `git reset`, `git clean`;
- executar deploy;
- executar `ssh`, `curl`, `wget`, `sudo`;
- instalar dependências;
- executar migrations destrutivas;
- ler ou expor `.env`, secrets, tokens, certificados, credenciais ou arquivos sensíveis.

Se encontrar `.claude/settings.local.json` ou `.claude/scheduled_tasks.lock`, trate como arquivo local/operacional que provavelmente não deve ser versionado. Pode relatar sua existência e o tipo de risco, mas não replique comandos locais, caminhos absolutos, tokens ou conteúdo operacional sensível no relatório.

---

# Objetivo principal

Criar um plano para melhorar as configurações de IA do `burger-system` com base nos pontos fortes do MokBeats, principalmente:

1. reduzir drasticamente redundância nos commands;
2. preservar a boa segurança atual do burger-system;
3. adicionar ou adaptar `paths` nas `.claude/rules/*.md`, seguindo a ideia do MokBeats;
4. separar melhor o que é regra global, command, skill e rule;
5. manter as regras específicas de Next.js, Prisma, Auth.js, Zod, Tailwind, checkout e pedidos;
6. evitar que cada command repita todo o protocolo global;
7. centralizar protocolos comuns em `CLAUDE.md`, `AGENTS.md` ou `PROJECT_RULES.md`;
8. manter `/implementation-plan` e `/revisar-prisma-banco`, pois são úteis para este projeto;
9. alinhar Claude Code e Codex sem criar dois sistemas concorrentes;
10. não tocar em `src/`, `prisma/`, `package.json`, `package-lock.json`, `next.config.*`, `tsconfig.json` ou código funcional nesta tarefa, salvo se o usuário aprovar explicitamente em etapa futura.

---

# Pontos fortes do MokBeats que devem ser considerados para trazer ao burger-system

Avalie se faz sentido adaptar, sem copiar cegamente:

- commands mais curtos, objetivos e econômicos;
- `.claude/rules/*.md` com frontmatter `paths`, permitindo ativação contextual por área do projeto;
- rules que declaram de qual seção do `PROJECT_RULES.md` derivam;
- menor repetição de protocolo global dentro de cada command;
- separação mais simples entre command e skill;
- uso claro de commands para entrypoints e skills para metodologias internas;
- auditorias com status final objetivo;
- foco em evidência real do repositório antes de alterar arquivos.

---

# Pontos fortes do burger-system que devem ser preservados

Não destrua os pontos fortes atuais do burger-system:

- segurança mais rígida em `.claude/settings.json`;
- `.codex/instructions.md` mais completo;
- rules específicas para Next.js App Router, Prisma, Auth admin/RBAC, checkout/pedidos, pagamentos/webhooks, cozinha, delivery e UI/Tailwind;
- skills mais enxutas e canônicas;
- command `/implementation-plan`;
- command `/revisar-prisma-banco`;
- documentação em `docs/ia-agentes/` e `docs/ia-prompts/`, se estiver realmente útil;
- governança de migrations, seed, Auth.js, RBAC e validação server-side;
- preocupação com Zod, snapshots de pedido, transações, audit log e segurança.

---

# Análise obrigatória

Antes de propor o plano, produza um inventário comparativo com pelo menos estes itens:

## 1. Inventário burger-system

Liste:

- arquivos de configuração de IA existentes;
- commands existentes;
- skills existentes;
- rules existentes;
- arquivos locais/sensíveis que não deveriam ser versionados;
- duplicações óbvias;
- arquivos muito grandes ou com responsabilidade excessiva.

## 2. Inventário MokBeats usado como referência

Liste somente os padrões úteis para o burger-system, separando:

- padrões adaptáveis;
- padrões incompatíveis com burger-system;
- padrões que devem ser ignorados por serem específicos de Angular/MokBeats/música/player/produtor.

## 3. Matriz de decisão

Crie uma tabela com colunas:

- Item avaliado;
- Estado atual no burger-system;
- Referência útil no MokBeats;
- Decisão: manter, adaptar, remover, fundir ou ignorar;
- Risco;
- Benefício esperado;
- Arquivos impactados.

## 4. Diagnóstico de redundância

Identifique redundâncias entre:

- `AGENTS.md`;
- `CLAUDE.md`;
- `CODEX.md`;
- `PROJECT_RULES.md`;
- `.claude/commands/*.md`;
- `.claude/skills/**/SKILL.md`;
- `.claude/rules/*.md`;
- `.codex/instructions.md`;
- `docs/ia-agentes/**`;
- `docs/ia-prompts/**`.

Classifique cada redundância como:

- aceitável;
- útil para segurança;
- prejudicial por consumo de tokens;
- perigosa por gerar dualidade.

## 5. Diagnóstico de rules sem `paths`

Para cada arquivo em `.claude/rules/*.md`, proponha frontmatter `paths` compatível com Next.js App Router e o domínio real do burger-system.

Exemplos esperados, ajuste conforme a estrutura real do repositório:

```md
---
paths:
  - "src/app/(admin)/**/*"
  - "src/app/admin/**/*"
  - "src/lib/auth/**/*"
  - "src/middleware.ts"
  - "auth.ts"
  - "middleware.ts"
---
```

```md
---
paths:
  - "prisma/schema.prisma"
  - "prisma/migrations/**/*"
  - "prisma/seed*"
  - "src/lib/prisma/**/*"
  - "src/server/db/**/*"
---
```

Não invente caminhos definitivos sem verificar a estrutura real do repositório. Quando não houver certeza, sinalize como `a confirmar`.

## 6. Diagnóstico de segurança

Avalie:

- se `.claude/settings.local.json` está presente;
- se `.claude/scheduled_tasks.lock` está presente;
- se `.gitignore` protege arquivos locais de IA;
- se `.claude/settings.json` nega arquivos sensíveis;
- se comandos perigosos estão bloqueados ou exigem aprovação;
- se Codex e Claude seguem as mesmas restrições;
- se há risco de expor deploy, SSH, tokens, secrets, caminhos absolutos ou dados locais.

Não exponha valores sensíveis encontrados. Relate apenas a categoria do problema.

---

# Arquitetura-alvo esperada para burger-system

Proponha uma arquitetura final parecida com esta, adaptada ao estado real encontrado:

```txt
AGENTS.md
CLAUDE.md
CODEX.md
PROJECT_RULES.md
.codex/
  config.toml
  instructions.md
.claude/
  settings.json
  commands/
    architecture-decision.md
    checklist-merge.md
    continue-from-codex.md
    create-code.md
    debug-app.md
    final-audit.md
    implementation-plan.md
    melhorar-ui-ux.md
    refactor-code.md
    review-code.md
    revisar-performance.md
    revisar-prisma-banco.md
    revisar-seguranca.md
  rules/
    auth-admin-rbac.md
    cart-checkout-orders.md
    catalog-products.md
    delivery-store-settings.md
    kitchen-order-flow.md
    nextjs-app-router.md
    payments-webhooks.md
    prisma-database.md
    security-secrets-deploy.md
    ui-ux-tailwind.md
  skills/
    architecture-review/SKILL.md
    final-audit/SKILL.md
    implementation-planning/SKILL.md
    legacy-code-audit/SKILL.md
    safe-refactor/SKILL.md
    senior-code-agent/SKILL.md
    senior-code-review/SKILL.md
```

O foco não é remover recursos úteis. O foco é tornar os arquivos mais econômicos, menos repetitivos e mais acionáveis pelo contexto.

---

# Plano incremental obrigatório

Monte um plano em fases, sem implementar ainda:

## Fase 0 — Segurança e higiene

- proteger `.claude/settings.local.json` no `.gitignore`;
- proteger `.claude/scheduled_tasks.lock` no `.gitignore`;
- avaliar se arquivos locais precisam sair do versionamento com `git rm --cached`;
- preservar denies fortes em `.claude/settings.json`;
- alinhar restrições do Codex sem enfraquecer segurança.

## Fase 1 — Canonização de responsabilidades

Definir qual arquivo responde por qual assunto:

- `PROJECT_RULES.md`: fonte de verdade do projeto;
- `AGENTS.md`: roteador operacional e regras comuns para agentes;
- `CLAUDE.md`: comportamento do Claude Code;
- `CODEX.md`: comportamento do Codex;
- `.codex/instructions.md`: instruções práticas do Codex;
- `.claude/commands/`: entrypoints de tarefa;
- `.claude/skills/`: metodologias internas;
- `.claude/rules/`: regras de domínio acionáveis por caminho;
- `docs/ia-agentes/`: documentação humana complementar;
- `docs/ia-prompts/`: prompts históricos ou modelos, sem virar regra concorrente.

## Fase 2 — Redução de commands repetitivos

- comparar tamanho e conteúdo dos commands atuais;
- identificar blocos repetidos;
- propor uma versão curta para cada command;
- manter somente instruções específicas do command;
- mover protocolo comum para `CLAUDE.md` ou `AGENTS.md`;
- preservar `/implementation-plan` e `/revisar-prisma-banco`.

## Fase 3 — Adição de `paths` nas rules

- adicionar frontmatter `paths` em cada rule;
- derivar paths da estrutura real do repositório;
- adicionar referência à seção correspondente do `PROJECT_RULES.md`, se aplicável;
- manter regras específicas de domínio;
- não copiar paths do MokBeats.

## Fase 4 — Alinhamento Claude ↔ Codex

- garantir que Claude e Codex compartilhem restrições essenciais;
- evitar dois formatos concorrentes de relatório;
- garantir handoff consistente entre Codex e Claude;
- preservar template de auditoria se ele já for usado.

## Fase 5 — Validação

Sugerir validações sem executá-las nesta primeira rodada, por exemplo:

- `git status`
- `git diff -- .claude .codex AGENTS.md CLAUDE.md CODEX.md PROJECT_RULES.md .gitignore docs/ia-agentes docs/ia-prompts docs/ia-auditorias`
- `npm run lint`, se aplicável e se já existir;
- `npm run typecheck`, se aplicável e se já existir;
- `npm run build`, se aplicável e se já existir;
- `npx prisma validate`, se aplicável e se já existir Prisma configurado;
- revisão manual dos arquivos de IA.

---

# Formato de saída obrigatório

Entregue a resposta em português do Brasil, com esta estrutura:

1. **Resumo executivo**
2. **Branch atual e recomendação de branch**
3. **Arquivos analisados**
4. **Inventário burger-system**
5. **Padrões úteis do MokBeats**
6. **Padrões que não devem ser copiados**
7. **Matriz de decisão**
8. **Riscos encontrados**
9. **Proposta de `paths` para cada rule**
10. **Arquitetura-alvo proposta**
11. **Plano incremental de implementação**
12. **Lista exata de arquivos que seriam alterados**
13. **Lista exata de arquivos que não devem ser alterados**
14. **Comandos de validação sugeridos**
15. **Critérios de aceite**
16. **Pergunta final de aprovação**

A pergunta final deve ser objetiva:

> Posso executar a Fase 0 e a Fase 1 exatamente como descritas, sem tocar em `src/`, `prisma/`, sem instalar dependências, sem rodar migration e sem fazer commit?

---

# Critérios de aceite do plano

O plano só será considerado bom se:

- preservar a identidade técnica do burger-system;
- não copiar stack do MokBeats;
- reduzir redundância real nos commands;
- adicionar `paths` úteis às rules;
- preservar a segurança atual;
- não criar dualidade entre Claude e Codex;
- manter `/implementation-plan` e `/revisar-prisma-banco`;
- indicar exatamente quais arquivos locais devem ser ignorados;
- explicar riscos antes de qualquer edição;
- separar claramente planejamento de implementação;
- respeitar a branch `dev` como referência principal do projeto.
