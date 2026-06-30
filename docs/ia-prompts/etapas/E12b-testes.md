# E12b — Testes críticos

## Referência obrigatória

Antes de executar qualquer ação, leia:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- Arquivo atual da etapa: `docs/ia-prompts/etapas/E12b-testes.md`

## Correspondência no roadmap de execução

Esta etapa consolida as seguintes entradas do `roadmap-execucao-ia.md`:

- IA-14.01 — Testes unitários de domínio
- IA-14.02 — Testes de integração
- IA-14.03 — Testes E2E
- IA-14.04 — Testes de acessibilidade

## Contexto obrigatório

- Projeto: Sistema de Hamburgueria.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Arquitetura: monolito modular, server-first, validação no servidor e separação entre área pública e admin.
- Execução: uma etapa por vez.
- MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos/status, configurações, dashboard, testes e deploy.
- Pós-MVP proibido: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.

## Objetivo da etapa

Criar ou ampliar testes unitários de domínio, testes de integração, testes E2E dos fluxos críticos e testes mínimos de acessibilidade.

## Pré-requisitos

E12a aprovada; E11 aprovada; fluxo completo público/admin funcionando.

## Bibliotecas de referência

- **Unitários e integração**: Jest ou Vitest (já configurado na E01).
- **E2E**: Playwright — instalar somente se não existir; script `test:e2e` no `package.json`.
- **Acessibilidade**: `jest-axe` (integração) ou `@axe-core/playwright` (E2E) — escolher uma conforme o que já estiver no projeto; script `test:a11y` no `package.json`.

Se nenhuma das libs de E2E/a11y estiver presente, registre a ausência como bloqueador antes de instalar qualquer dependência nova.

## Escopo permitido

- Criar/ampliar testes unitários de: cálculo de pedido, snapshot, idempotência, máquina de estados, validações Zod e regras de domínio.
- Criar testes de integração de Server Actions e Route Handlers críticos.
- Criar testes E2E com Playwright cobrindo: catálogo → carrinho → checkout → confirmação e login → admin → pedido → status.
- Criar testes de acessibilidade básicos (contraste, labels, foco, ARIA) nos fluxos públicos e de admin.
- Criar scripts `test:e2e` e `test:a11y` no `package.json` se não existirem.
- Atualizar CI para executar os novos scripts.

## Escopo proibido

- Alterar lógica de negócio para fazer testes passarem — corrija o teste, não o domínio.
- Criar mocks permanentes para regras de negócio que deveriam ser testadas de verdade.
- Instalar bibliotecas não listadas sem aprovação prévia do usuário.
- Criar features novas ou antecipar E12c.
- Não fazer commit, merge, push ou deploy automaticamente.

## Arquivos prováveis de alteração

- `tests/**`
- `e2e/**`
- `playwright.config.*`
- `package.json`
- `package-lock.json`
- `.github/workflows/ci.yml`

## Arquivos proibidos de alteração

- `domain/**` (salvo correção crítica de bug encontrado nos testes)
- `services/**` (salvo correção crítica de bug encontrado nos testes)
- `prisma/schema.prisma`
- `prisma/migrations/**`
- `lib/auth/**`
- `auth.ts`
- `middleware.ts`
- `.env`
- `.env.local`
- `.env.production`

## Prompt de execução — Codex

````text
Atue como Codex no VS Code para executar a etapa E12b — Testes críticos do Sistema de Hamburgueria.

Antes de alterar qualquer arquivo, leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12b-testes.md

Objetivo da etapa:
Criar ou ampliar testes unitários de domínio, testes de integração, testes E2E dos fluxos críticos e testes mínimos de acessibilidade.

Pré-requisito da etapa:
E12a aprovada; fluxo completo público/admin funcionando.

Bibliotecas de referência:
- Unitários/integração: Jest ou Vitest (já configurado).
- E2E: Playwright.
- Acessibilidade: jest-axe (integração) ou @axe-core/playwright (E2E).
Se nenhuma das libs de E2E/a11y estiver presente, registre como bloqueador antes de instalar.

Escopo permitido:
- Criar/ampliar testes unitários de cálculo, snapshot, idempotência, máquina de estados e validações.
- Criar testes de integração de Server Actions e Route Handlers críticos.
- Criar testes E2E cobrindo: catálogo → carrinho → checkout → confirmação e login → admin → pedido → status.
- Criar testes de acessibilidade básicos nos fluxos públicos e de admin.
- Criar scripts `test:e2e` e `test:a11y` no `package.json` se não existirem.
- Atualizar CI para executar os novos scripts.

Escopo proibido:
- Alterar lógica de negócio para fazer testes passarem.
- Criar mocks permanentes para regras de negócio reais.
- Instalar bibliotecas não listadas sem aprovação.
- Criar features novas ou antecipar E12c.

Procedimento obrigatório:
1. Execute `git status --short` e identifique alterações pendentes.
2. Se houver arquivos alterados fora do escopo desta etapa, pare e registre o bloqueador.
3. Verifique quais libs de teste já existem no projeto antes de instalar qualquer dependência.
4. Faça somente a menor implementação necessária para cumprir os critérios de aceite.
5. Não faça commit, merge, push ou deploy automaticamente.
6. Execute os comandos obrigatórios de validação.
7. Gere relatório final completo no formato exigido.

Arquivos prováveis de alteração:
- `tests/**`
- `e2e/**`
- `playwright.config.*`
- `package.json`
- `package-lock.json`
- `.github/workflows/ci.yml`

Arquivos proibidos ou sensíveis:
- `domain/**` (salvo correção crítica de bug encontrado nos testes)
- `services/**` (salvo correção crítica de bug encontrado nos testes)
- `prisma/schema.prisma`
- `prisma/migrations/**`
- `lib/auth/**`
- `auth.ts`
- `middleware.ts`
- `.env`
- `.env.local`
- `.env.production`

Critérios de aceite:
- Fluxo crítico público (catálogo → carrinho → checkout → confirmação) coberto por teste E2E.
- Fluxo crítico admin (login → categorias/produtos → pedidos/status → dashboard) coberto por teste E2E.
- Cálculo de pedido, snapshot e idempotência cobertos por testes unitários.
- Testes de acessibilidade básicos passam nos fluxos públicos principais.
- Scripts `test:e2e` e `test:a11y` existem e executam sem erro fatal.
- CI atualizado para rodar os novos scripts.

Comandos obrigatórios de validação:
```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
npm run test:a11y
git diff --check
git status --short
```

Se algum script não existir ainda, registre como pendência com justificativa antes de criá-lo.
````

## Prompt de revisão — Claude Code

````text
Atue como Claude Code no VS Code para revisar criticamente a implementação da etapa E12b — Testes críticos feita pelo Codex.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12b-testes.md
- diff atual da branch

Objetivo da revisão:
Verificar se os testes cobrem os fluxos críticos, se nenhuma lógica de negócio foi alterada para fazer testes passarem e se nenhuma dependência inesperada foi instalada.

Não implemente código nesta revisão, salvo autorização explícita do usuário.

Verifique obrigatoriamente:
- Fluxo público coberto por E2E.
- Fluxo admin coberto por E2E.
- Cálculo, snapshot e idempotência cobertos por testes unitários.
- Testes de acessibilidade básicos existem e passam.
- Scripts `test:e2e` e `test:a11y` criados e funcionando.
- CI atualizado.
- Nenhuma lógica de negócio foi alterada para satisfazer testes.
- Mocks são mínimos e não substituem regras reais.
- Dependências instaladas estão nas listadas no arquivo da etapa.

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
Atue como Codex no VS Code para aplicar somente as correções obrigatórias apontadas na revisão da etapa E12b — Testes críticos.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12b-testes.md
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
npm run test:e2e
npm run test:a11y
git diff --check
git status --short
```
````

## Prompt de auditoria final — Claude Code

````text
Atue como Claude Code no VS Code para realizar auditoria final da etapa E12b — Testes críticos.

Esta auditoria é somente leitura. Não implemente código, não edite documentação, não faça commit, merge, push ou deploy.

Leia:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12b-testes.md
- relatório de execução do Codex
- relatório de revisão do Claude Code
- relatório de correção do Codex, se existir
- diff final da branch

Objetivo:
Confirmar se a etapa pode ser encerrada e se está segura para avançar para E12c — Deploy e auditoria final.

Audite:
- Fluxo crítico público coberto por E2E.
- Fluxo crítico admin coberto por E2E.
- Cálculo, snapshot e idempotência cobertos por testes unitários.
- Testes de acessibilidade básicos passam.
- Scripts `test:e2e` e `test:a11y` criados e funcionando.
- CI atualizado.
- Nenhuma lógica de negócio alterada para satisfazer testes.

Bloqueadores conhecidos desta etapa:
- Fluxo crítico sem cobertura E2E.
- Cálculo ou idempotência sem teste unitário.
- Testes falhando no CI.
- Lógica de negócio alterada sem justificativa.
- Dependência não listada instalada.

Formato da resposta:
- Veredito final: aprovado para avançar, aprovado com ressalvas ou bloqueado.
- Evidências objetivas.
- Arquivos alterados no diff final.
- Comandos validados e resultados informados.
- Riscos remanescentes.
- Pendências para próxima etapa (E12c).
- Confirmação de ausência de aumento de escopo.

Salve o relatório de auditoria em `docs/ia-auditorias/E12b-testes-auditoria.md`.
````

## Critérios de aceite

- Fluxo crítico público (catálogo → carrinho → checkout → confirmação) coberto por teste E2E.
- Fluxo crítico admin (login → categorias/produtos → pedidos/status → dashboard) coberto por teste E2E.
- Cálculo de pedido, snapshot e idempotência cobertos por testes unitários.
- Testes de acessibilidade básicos passam nos fluxos públicos principais.
- Scripts `test:e2e` e `test:a11y` existem e executam sem erro fatal.
- CI atualizado para rodar os novos scripts.

## Comandos obrigatórios de validação

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
npm run test:a11y
git diff --check
git status --short
```

## Bloqueadores da etapa

- Fluxo crítico sem cobertura E2E.
- Cálculo ou idempotência sem teste unitário.
- Testes falhando no CI.
- Lógica de negócio alterada sem justificativa.
- Dependência não listada instalada.
- Ausência de relatório final.
- Alterações em arquivos proibidos sem justificativa e revisão reforçada.

## Critérios para avançar para a próxima etapa

- Testes implementados e passando.
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
