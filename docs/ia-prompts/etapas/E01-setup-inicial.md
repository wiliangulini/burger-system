# E01 — Setup inicial

## Referência obrigatória

Antes de executar qualquer ação, leia:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- Arquivo atual da etapa: `docs/ia-prompts/etapas/E01-setup-inicial.md`

## Correspondência no roadmap de execução

Esta etapa consolida as seguintes entradas do `roadmap-execucao-ia.md`:

- IA-00.01 — Consolidar premissas do MVP
- IA-00.02 — Definir convenções de trabalho
- IA-01.01 — Inicializar projeto Next.js
- IA-01.02 — Configurar qualidade mínima
- IA-01.03 — Configurar testes base
- IA-01.04 — Configurar CI inicial

## Contexto obrigatório

- Projeto: Sistema de Hamburgueria.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Arquitetura: monolito modular, server-first, validação no servidor e separação entre área pública e admin.
- Execução: uma etapa por vez.
- MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos/status, configurações, dashboard, testes e deploy.
- Pós-MVP proibido: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.

## Objetivo da etapa

Criar a base controlada do projeto: escopo congelado, convenções de trabalho, bootstrap Next.js App Router, qualidade mínima, testes base e CI inicial.

## Pré-requisitos

`roadmap-execucao-ia.md` aprovado; branch da etapa criada; nenhuma implementação de domínio iniciada.

## Escopo permitido

- Criar documentos de premissas, backlog pós-MVP, decisões iniciais e checklist de PR.
- Inicializar Next.js com App Router, TypeScript, Tailwind CSS e aliases.
- Criar layout público e página inicial apenas de sanity.
- Configurar ESLint, Prettier, typecheck, scripts mínimos e `.editorconfig`.
- Configurar Jest ou Vitest com Testing Library e um teste de sanity.
- Criar workflow inicial de CI com lint, typecheck, test e build.

## Escopo proibido

- Criar domínio de hamburgueria, models Prisma, Auth.js, CRUD, carrinho, checkout ou admin funcional.
- Usar Pages Router ou estrutura de microfrontend/microserviço.
- Adicionar bibliotecas sem necessidade para o bootstrap.
- Configurar deploy automático complexo ou secrets reais.
- Não fazer commit, merge, push ou deploy automaticamente.

## Arquivos prováveis de alteração

- `README.md`
- `docs/adr/0001-escopo-mvp.md`
- `docs/decisoes-arquitetura.md`
- `docs/backlog-pos-mvp.md`
- `docs/roteiro-desenvolvimento.md`
- `docs/checklists/pr-checklist.md`
- `.github/pull_request_template.md`
- `.github/workflows/ci.yml`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.js`
- `eslint.config.*`
- `.prettierrc`
- `.prettierignore`
- `.editorconfig`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `tests/sanity.test.ts`
- `tests/setup.ts`
- `vitest.config.*`
- `jest.config.*`
- `next.config.*`

## Arquivos proibidos de alteração

- `prisma/**`
- `lib/db.ts`
- `lib/auth/**`
- `auth.ts`
- `middleware.ts`
- `app/admin/**`
- `app/api/**`
- `components/admin/**`
- `components/cart/**`
- `domain/**`
- `services/**`
- `public/uploads/**`
- `.env`
- `.env.local`

## Prompt de execução — Codex

````text
Atue como Codex no VS Code para executar a etapa E01 — Setup inicial do Sistema de Hamburgueria.

Antes de alterar qualquer arquivo, leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E01-setup-inicial.md

Objetivo da etapa:
Criar a base controlada do projeto: escopo congelado, convenções de trabalho, bootstrap Next.js App Router, qualidade mínima, testes base e CI inicial.

Pré-requisito da etapa:
`roadmap-execucao-ia.md` aprovado; branch da etapa criada; nenhuma implementação de domínio iniciada.

Escopo permitido:
- Criar documentos de premissas, backlog pós-MVP, decisões iniciais e checklist de PR.
- Inicializar Next.js com App Router, TypeScript, Tailwind CSS e aliases.
- Criar layout público e página inicial apenas de sanity.
- Configurar ESLint, Prettier, typecheck, scripts mínimos e `.editorconfig`.
- Configurar Jest ou Vitest com Testing Library e um teste de sanity.
- Criar workflow inicial de CI com lint, typecheck, test e build.

Escopo proibido:
- Criar domínio de hamburgueria, models Prisma, Auth.js, CRUD, carrinho, checkout ou admin funcional.
- Usar Pages Router ou estrutura de microfrontend/microserviço.
- Adicionar bibliotecas sem necessidade para o bootstrap.
- Configurar deploy automático complexo ou secrets reais.

Procedimento obrigatório:
1. Execute `git status --short` e identifique alterações pendentes.
2. Se houver arquivos alterados fora do escopo desta etapa, pare e registre o bloqueador.
3. Faça somente a menor implementação/documentação necessária para cumprir os critérios de aceite.
4. Não implemente etapa futura.
5. Não faça commit, merge, push ou deploy automaticamente.
6. Execute os comandos obrigatórios de validação listados neste arquivo.
7. Gere relatório final completo no formato exigido.

Arquivos prováveis de alteração:
- `README.md`
- `docs/adr/0001-escopo-mvp.md`
- `docs/decisoes-arquitetura.md`
- `docs/backlog-pos-mvp.md`
- `docs/roteiro-desenvolvimento.md`
- `docs/checklists/pr-checklist.md`
- `.github/pull_request_template.md`
- `.github/workflows/ci.yml`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.js`
- `eslint.config.*`
- `.prettierrc`
- `.prettierignore`
- `.editorconfig`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `tests/sanity.test.ts`
- `tests/setup.ts`
- `vitest.config.*`
- `jest.config.*`
- `next.config.*`

Arquivos proibidos ou sensíveis:
- `prisma/**`
- `lib/db.ts`
- `lib/auth/**`
- `auth.ts`
- `middleware.ts`
- `app/admin/**`
- `app/api/**`
- `components/admin/**`
- `components/cart/**`
- `domain/**`
- `services/**`
- `public/uploads/**`
- `.env`
- `.env.local`

Critérios de aceite:
- Escopo MVP explícito, fechado e separado do backlog pós-MVP.
- Fluxo de branches, PRs e relatório final documentado.
- Projeto usa `/app` e não Pages Router.
- Home de sanity renderiza sem regra de negócio.
- Scripts `lint`, `typecheck`, `test` e `build` existem e passam.
- CI executa install, lint, typecheck, test e build sem secrets reais.

Comandos obrigatórios de validação:
```bash
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
git status --short
```

Se algum comando não existir ainda no projeto, registre como pendência com justificativa. Não crie scripts fora do escopo da etapa apenas para mascarar ausência de validação.
````

## Prompt de revisão — Claude Code

````text
Atue como Claude Code no VS Code para revisar criticamente a implementação da etapa E01 — Setup inicial feita pelo Codex.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E01-setup-inicial.md
- diff atual da branch

Objetivo da revisão:
Verificar se a implementação cumpre a etapa E01 sem extrapolar escopo, sem enfraquecer segurança e sem antecipar etapas futuras.

Não implemente código nesta revisão, salvo autorização explícita do usuário. Priorize análise, apontamentos e bloqueadores.

A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E01-setup-inicial-revisao.md`; esse deve ser o único arquivo modificado pela revisão.

Verifique obrigatoriamente:
- Escopo MVP explícito, fechado e separado do backlog pós-MVP.
- Fluxo de branches, PRs e relatório final documentado.
- Projeto usa `/app` e não Pages Router.
- Home de sanity renderiza sem regra de negócio.
- Scripts `lint`, `typecheck`, `test` e `build` existem e passam.
- CI executa install, lint, typecheck, test e build sem secrets reais.

Verifique também:
- arquivos alterados versus arquivos prováveis;
- ausência de alterações em arquivos proibidos;
- comandos executados e resultado;
- riscos de autenticação, autorização, dados, pedido, checkout, upload, deploy ou segurança quando aplicável;
- ausência de feature creep;
- qualidade de tipagem, validação server-side e separação de responsabilidades.

Formato da resposta:
- Veredito geral: aprovado, aprovado com ajustes ou reprovado.
- Problemas encontrados por arquivo.
- Correções obrigatórias.
- Correções recomendadas.
- Riscos remanescentes.
- Evidências dos critérios de aceite.
- Confirmação de que nenhum commit, merge, push ou deploy foi feito automaticamente.
````

## Prompt de correção — Codex

````text
Atue como Codex no VS Code para aplicar somente as correções obrigatórias apontadas na revisão da etapa E01 — Setup inicial.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E01-setup-inicial.md
- relatório de revisão do Claude Code

Regras obrigatórias:
- Aplique apenas correções obrigatórias da revisão.
- Não refatore por preferência pessoal.
- Não implemente etapa futura.
- Não adicione nova funcionalidade.
- Não altere arquivos proibidos, salvo se a revisão apontou correção obrigatória e justificada.
- Não faça commit, merge, push ou deploy automaticamente.

Após corrigir:
1. Liste exatamente o que foi corrigido.
2. Execute novamente os comandos obrigatórios de validação.
3. Gere relatório final com pendências e riscos remanescentes.

Comandos obrigatórios:
```bash
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
git status --short
```
````

## Prompt de auditoria final — Claude Code

````text
Atue como Claude Code no VS Code para realizar auditoria final da etapa E01 — Setup inicial.

Esta auditoria é somente leitura quanto à implementação e aos documentos do produto. Não implemente nem altere código, configurações, schema, migrations, testes, prompts ou documentação funcional. A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E01-setup-inicial-auditoria-final.md`, que deve ser o único arquivo modificado pela auditoria.

Use `docs/ia-auditorias/TEMPLATE-agent-report.md`. Fundamente cada conclusão em arquivo, diff ou comando verificável; identifique os arquivos analisados; separe comandos reexecutados de resultados apenas registrados em relatórios anteriores; não declare validação executada ou aprovada sem evidência. Não faça commit, merge, push ou deploy.

Leia:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E01-setup-inicial.md
- relatório de execução do Codex
- relatório de revisão do Claude Code
- relatório de correção do Codex, se existir
- diff final da branch

Objetivo:
Confirmar se a etapa pode ser encerrada e se está segura para avançar para a próxima etapa.

Audite:
- Escopo MVP explícito, fechado e separado do backlog pós-MVP.
- Fluxo de branches, PRs e relatório final documentado.
- Projeto usa `/app` e não Pages Router.
- Home de sanity renderiza sem regra de negócio.
- Scripts `lint`, `typecheck`, `test` e `build` existem e passam.
- CI executa install, lint, typecheck, test e build sem secrets reais.

Bloqueadores conhecidos desta etapa:
- Build, lint, typecheck ou teste de sanity falhando.
- Pages Router criado.
- Arquivos de domínio criados sem autorização.
- Pós-MVP registrado como requisito obrigatório.
- CI ignora validações essenciais.

Formato da resposta:
- Veredito final: aprovado para avançar, aprovado com ressalvas ou bloqueado.
- Evidências objetivas.
- Arquivos alterados no diff final.
- Comandos validados e resultados informados.
- Validações reexecutadas separadas das evidências históricas.
- Riscos remanescentes.
- Pendências para próxima etapa.
- Confirmação de ausência de aumento de escopo.
- Status final: Aprovado, Aprovado com observações, Requer ajustes ou Bloqueado.
````

## Critérios de aceite

- Escopo MVP explícito, fechado e separado do backlog pós-MVP.
- Fluxo de branches, PRs e relatório final documentado.
- Projeto usa `/app` e não Pages Router.
- Home de sanity renderiza sem regra de negócio.
- Scripts `lint`, `typecheck`, `test` e `build` existem e passam.
- CI executa install, lint, typecheck, test e build sem secrets reais.

## Comandos obrigatórios de validação

```bash
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
git status --short
```

## Bloqueadores da etapa

- Build, lint, typecheck ou teste de sanity falhando.
- Pages Router criado.
- Arquivos de domínio criados sem autorização.
- Pós-MVP registrado como requisito obrigatório.
- CI ignora validações essenciais.
- Ausência de relatório final.
- Alterações em arquivos proibidos sem justificativa e revisão reforçada.

## Critérios para avançar para a próxima etapa

- Implementação ou documentação da etapa concluída.
- Revisão cruzada concluída.
- Correções obrigatórias aplicadas.
- Auditoria final aprovada.
- Comandos obrigatórios executados ou pendências justificadas.
- Relatórios salvos em `docs/ia-auditorias/`.
- Commit da etapa realizado manualmente pelo usuário ou responsável humano.

## Relatório esperado

O agente deve responder com:

- Tarefa.
- Objetivo.
- Arquivos criados/alterados/removidos.
- Decisões técnicas.
- Comandos executados.
- Resultado dos comandos.
- Testes executados.
- Pendências.
- Riscos.
- Confirmação de ausência de aumento de escopo.
