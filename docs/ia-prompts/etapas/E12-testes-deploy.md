# ~~E12 — Testes e deploy~~ (DEPRECIADO)

> **Este arquivo foi substituído por E12a, E12b e E12c.** Não use este prompt.
>
> Use: `E12a-ux-seguranca.md` (IA-12–13), `E12b-testes.md` (IA-14), `E12c-deploy-auditoria.md` (IA-15–16).

---

## Referência obrigatória

Antes de executar qualquer ação, leia:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- Arquivo atual da etapa: `docs/ia-prompts/etapas/E12-testes-deploy.md`

## Correspondência no roadmap de execução

Esta etapa consolida as seguintes entradas do `roadmap-execucao-ia.md`:

- IA-12.01 — Padronizar componentes de formulário
- IA-12.02 — Criar tratamento de erro por rota
- IA-13.01 — Aplicar rate limiting básico
- IA-13.02 — Implementar logs mínimos seguros
- IA-13.03 — Revisão OWASP mínima
- IA-14.01 — Testes unitários de domínio
- IA-14.02 — Testes de integração
- IA-14.03 — Testes E2E
- IA-14.04 — Testes de acessibilidade
- IA-15.01 — Preparar variáveis de ambiente
- IA-15.02 — Configurar banco de produção
- IA-15.03 — Deploy na Vercel
- IA-15.04 — Health check e smoke test
- IA-16.01 — Auditoria funcional
- IA-16.02 — Auditoria técnica
- IA-16.03 — Auditoria de arquitetura

## Contexto obrigatório

- Projeto: Sistema de Hamburgueria.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Arquitetura: monolito modular, server-first, validação no servidor e separação entre área pública e admin.
- Execução: uma etapa por vez.
- MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos/status, configurações, dashboard, testes e deploy.
- Pós-MVP proibido: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.

## Objetivo da etapa

Consolidar qualidade final do MVP com UX, tratamento de erros, segurança mínima, testes críticos, preparação de ambiente, deploy Vercel, smoke test e auditoria final.

## Pré-requisitos

E11 aprovada; fluxo público/admin completo; CI inicial funcionando; variáveis reais disponíveis fora do repositório.

## Escopo permitido

- Padronizar formulários e mensagens de erro sem alterar regras de negócio.
- Criar `loading.tsx`, `error.tsx` e `not-found.tsx` onde fizer sentido.
- Aplicar rate limiting básico em login e criação de pedido conforme viabilidade do stack.
- Implementar logs mínimos sem dados sensíveis.
- Executar checklist OWASP mínimo.
- Criar/ampliar testes unitários, integração, E2E e acessibilidade do fluxo crítico.
- Preparar `.env.example` e documentação de variáveis.
- Configurar banco de produção e Vercel sem versionar secrets.
- Executar build, deploy, health check e smoke test.
- Gerar auditoria funcional, técnica e arquitetural final.

## Escopo proibido

- Criar novas features funcionais além do MVP.
- Adicionar observabilidade extensiva, Sentry obrigatório, BI avançado ou analytics sofisticado.
- Criar pipeline de deploy complexo sem necessidade.
- Versionar segredos.
- Alterar schema, checkout, auth ou status sem motivo crítico documentado.
- Fazer deploy sem migrations e envs conferidas.
- O agente fazer push/deploy automático sem autorização explícita do usuário.
- Não fazer commit, merge, push ou deploy automaticamente.

## Arquivos prováveis de alteração

- `app/**/loading.tsx`
- `app/**/error.tsx`
- `app/**/not-found.tsx`
- `components/ui/**`
- `lib/rate-limit/**`
- `lib/logger/**`
- `tests/**`
- `e2e/**`
- `playwright.config.*`
- `docs/deploy.md`
- `docs/seguranca.md`
- `docs/auditoria-final-mvp.md`
- `.env.example`
- `.github/workflows/**`
- `package.json`
- `package-lock.json`
- `vercel.json`

## Arquivos proibidos de alteração

- `prisma/schema.prisma exceto correção crítica aprovada`
- `prisma/migrations/** exceto migration indispensável aprovada`
- `domain/order/** exceto correção crítica testada`
- `services/order/** exceto correção crítica testada`
- `lib/auth/** exceto correção crítica testada`
- `auth.ts exceto correção crítica testada`
- `middleware.ts exceto correção crítica testada`
- `.env`
- `.env.local`
- `.env.production`
- `secrets de Vercel/GitHub`

## Prompt de execução — Codex

````text
Atue como Codex no VS Code para executar a etapa E12 — Testes e deploy do Sistema de Hamburgueria.

Antes de alterar qualquer arquivo, leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12-testes-deploy.md

Objetivo da etapa:
Consolidar qualidade final do MVP com UX, tratamento de erros, segurança mínima, testes críticos, preparação de ambiente, deploy Vercel, smoke test e auditoria final.

Pré-requisito da etapa:
E11 aprovada; fluxo público/admin completo; CI inicial funcionando; variáveis reais disponíveis fora do repositório.

Escopo permitido:
- Padronizar formulários e mensagens de erro sem alterar regras de negócio.
- Criar `loading.tsx`, `error.tsx` e `not-found.tsx` onde fizer sentido.
- Aplicar rate limiting básico em login e criação de pedido conforme viabilidade do stack.
- Implementar logs mínimos sem dados sensíveis.
- Executar checklist OWASP mínimo.
- Criar/ampliar testes unitários, integração, E2E e acessibilidade do fluxo crítico.
- Preparar `.env.example` e documentação de variáveis.
- Configurar banco de produção e Vercel sem versionar secrets.
- Executar build, deploy, health check e smoke test.
- Gerar auditoria funcional, técnica e arquitetural final.

Escopo proibido:
- Criar novas features funcionais além do MVP.
- Adicionar observabilidade extensiva, Sentry obrigatório, BI avançado ou analytics sofisticado.
- Criar pipeline de deploy complexo sem necessidade.
- Versionar segredos.
- Alterar schema, checkout, auth ou status sem motivo crítico documentado.
- Fazer deploy sem migrations e envs conferidas.
- O agente fazer push/deploy automático sem autorização explícita do usuário.

Procedimento obrigatório:
1. Execute `git status --short` e identifique alterações pendentes.
2. Se houver arquivos alterados fora do escopo desta etapa, pare e registre o bloqueador.
3. Faça somente a menor implementação/documentação necessária para cumprir os critérios de aceite.
4. Não implemente etapa futura.
5. Não faça commit, merge, push ou deploy automaticamente.
6. Execute os comandos obrigatórios de validação listados neste arquivo.
7. Gere relatório final completo no formato exigido.

Arquivos prováveis de alteração:
- `app/**/loading.tsx`
- `app/**/error.tsx`
- `app/**/not-found.tsx`
- `components/ui/**`
- `lib/rate-limit/**`
- `lib/logger/**`
- `tests/**`
- `e2e/**`
- `playwright.config.*`
- `docs/deploy.md`
- `docs/seguranca.md`
- `docs/auditoria-final-mvp.md`
- `.env.example`
- `.github/workflows/**`
- `package.json`
- `package-lock.json`
- `vercel.json`

Arquivos proibidos ou sensíveis:
- `prisma/schema.prisma exceto correção crítica aprovada`
- `prisma/migrations/** exceto migration indispensável aprovada`
- `domain/order/** exceto correção crítica testada`
- `services/order/** exceto correção crítica testada`
- `lib/auth/** exceto correção crítica testada`
- `auth.ts exceto correção crítica testada`
- `middleware.ts exceto correção crítica testada`
- `.env`
- `.env.local`
- `.env.production`
- `secrets de Vercel/GitHub`

Critérios de aceite:
- Fluxo crítico público: catálogo → carrinho → checkout → confirmação passa nos testes definidos.
- Fluxo crítico admin: login → categorias/produtos → pedidos/status → dashboard/configurações passa nos testes definidos.
- Rate limiting mínimo aplicado onde previsto ou limitação justificada.
- Logs não contêm dados sensíveis.
- Checklist OWASP mínimo sem bloqueadores críticos.
- Build de produção passa.
- Variáveis de ambiente documentadas sem segredos.
- Deploy Vercel executado somente com autorização humana.
- Smoke test de produção aprovado ou pendências registradas.
- Auditoria final aprova o MVP ou lista bloqueadores claros.

Comandos obrigatórios de validação:
```bash
npm run lint
npm run typecheck
npm test
npm run build
npx prisma validate
npx prisma migrate status
npm run test:e2e
npm run test:a11y
git diff --check
git status --short
```

Se algum comando não existir ainda no projeto, registre como pendência com justificativa. Não crie scripts fora do escopo da etapa apenas para mascarar ausência de validação.
````

## Prompt de revisão — Claude Code

````text
Atue como Claude Code no VS Code para revisar criticamente a implementação da etapa E12 — Testes e deploy feita pelo Codex.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12-testes-deploy.md
- diff atual da branch

Objetivo da revisão:
Verificar se a implementação cumpre a etapa E12 sem extrapolar escopo, sem enfraquecer segurança e sem antecipar etapas futuras.

Não implemente código nesta revisão, salvo autorização explícita do usuário. Priorize análise, apontamentos e bloqueadores.

Verifique obrigatoriamente:
- Fluxo crítico público: catálogo → carrinho → checkout → confirmação passa nos testes definidos.
- Fluxo crítico admin: login → categorias/produtos → pedidos/status → dashboard/configurações passa nos testes definidos.
- Rate limiting mínimo aplicado onde previsto ou limitação justificada.
- Logs não contêm dados sensíveis.
- Checklist OWASP mínimo sem bloqueadores críticos.
- Build de produção passa.
- Variáveis de ambiente documentadas sem segredos.
- Deploy Vercel executado somente com autorização humana.
- Smoke test de produção aprovado ou pendências registradas.
- Auditoria final aprova o MVP ou lista bloqueadores claros.

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
Atue como Codex no VS Code para aplicar somente as correções obrigatórias apontadas na revisão da etapa E12 — Testes e deploy.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12-testes-deploy.md
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
npx prisma validate
npx prisma migrate status
npm run test:e2e
npm run test:a11y
git diff --check
git status --short
```
````

## Prompt de auditoria final — Claude Code

````text
Atue como Claude Code no VS Code para realizar auditoria final da etapa E12 — Testes e deploy.

Esta auditoria é somente leitura quanto à implementação e aos documentos do produto. Não implemente nem altere código, configurações, schema, migrations, testes, prompts ou documentação funcional. A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E12-testes-deploy-auditoria-final.md`, que deve ser o único arquivo modificado pela auditoria.

Use `docs/ia-auditorias/TEMPLATE-agent-report.md`. Fundamente cada conclusão em arquivo, diff ou comando verificável; identifique os arquivos analisados; separe comandos reexecutados de resultados apenas registrados em relatórios anteriores; não declare validação executada ou aprovada sem evidência. Não faça commit, merge, push ou deploy.

Leia:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12-testes-deploy.md
- relatório de execução do Codex
- relatório de revisão do Claude Code
- relatório de correção do Codex, se existir
- diff final da branch

Objetivo:
Confirmar se a etapa pode ser encerrada e se está segura para avançar para a próxima etapa.

Audite:
- Fluxo crítico público: catálogo → carrinho → checkout → confirmação passa nos testes definidos.
- Fluxo crítico admin: login → categorias/produtos → pedidos/status → dashboard/configurações passa nos testes definidos.
- Rate limiting mínimo aplicado onde previsto ou limitação justificada.
- Logs não contêm dados sensíveis.
- Checklist OWASP mínimo sem bloqueadores críticos.
- Build de produção passa.
- Variáveis de ambiente documentadas sem segredos.
- Deploy Vercel executado somente com autorização humana.
- Smoke test de produção aprovado ou pendências registradas.
- Auditoria final aprova o MVP ou lista bloqueadores claros.

Bloqueadores conhecidos desta etapa:
- Segredo versionado.
- Falha de build.
- Fluxo crítico sem teste mínimo.
- Login/admin vulnerável.
- Checkout sem recálculo/idempotência preservados.
- Deploy sem envs/migrations conferidas.
- Auditoria final reprovada.

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

- Fluxo crítico público: catálogo → carrinho → checkout → confirmação passa nos testes definidos.
- Fluxo crítico admin: login → categorias/produtos → pedidos/status → dashboard/configurações passa nos testes definidos.
- Rate limiting mínimo aplicado onde previsto ou limitação justificada.
- Logs não contêm dados sensíveis.
- Checklist OWASP mínimo sem bloqueadores críticos.
- Build de produção passa.
- Variáveis de ambiente documentadas sem segredos.
- Deploy Vercel executado somente com autorização humana.
- Smoke test de produção aprovado ou pendências registradas.
- Auditoria final aprova o MVP ou lista bloqueadores claros.

## Comandos obrigatórios de validação

```bash
npm run lint
npm run typecheck
npm test
npm run build
npx prisma validate
npx prisma migrate status
npm run test:e2e
npm run test:a11y
git diff --check
git status --short
```

## Bloqueadores da etapa

- Segredo versionado.
- Falha de build.
- Fluxo crítico sem teste mínimo.
- Login/admin vulnerável.
- Checkout sem recálculo/idempotência preservados.
- Deploy sem envs/migrations conferidas.
- Auditoria final reprovada.
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
