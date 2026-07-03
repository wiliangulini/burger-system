# E12a — UX, erros e segurança

## Referência obrigatória

Antes de executar qualquer ação, leia:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- Arquivo atual da etapa: `docs/ia-prompts/etapas/E12a-ux-seguranca.md`

## Correspondência no roadmap de execução

Esta etapa consolida as seguintes entradas do `roadmap-execucao-ia.md`:

- IA-12.01 — Padronizar componentes de formulário
- IA-12.02 — Criar tratamento de erro por rota
- IA-13.01 — Aplicar rate limiting básico
- IA-13.02 — Implementar logs mínimos seguros
- IA-13.03 — Revisão OWASP mínima

## Contexto obrigatório

- Projeto: Sistema de Hamburgueria.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Arquitetura: monolito modular, server-first, validação no servidor e separação entre área pública e admin.
- Execução: uma etapa por vez.
- MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos/status, configurações, dashboard, testes e deploy.
- Pós-MVP proibido: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.

## Objetivo da etapa

Melhorar UX de formulários e tratamento de erros, aplicar rate limiting básico em rotas críticas e garantir que logs não exponham dados sensíveis.

## Pré-requisitos

E11 aprovada; fluxo público/admin completo; CI inicial funcionando.

## Escopo permitido

- Padronizar formulários e mensagens de erro sem alterar regras de negócio.
- Criar `loading.tsx`, `error.tsx` e `not-found.tsx` onde fizer sentido.
- Aplicar rate limiting básico em login e criação de pedido usando middleware do Next.js ou biblioteca já aprovada — sem adicionar nova dependência sem justificativa.
- Implementar logs mínimos (nível info/warn/error) sem logar senha, token, cookie, dados pessoais ou stack trace em produção.
- Executar checklist OWASP mínimo e registrar resultado como documento.

## Escopo proibido

- Criar novas features funcionais além do MVP.
- Adicionar Sentry obrigatório, observabilidade extensiva ou analytics externo.
- Alterar schema, checkout, auth ou lógica de status sem motivo crítico documentado.
- Instalar biblioteca de rate limiting sem aprovação prévia do usuário.
- Não fazer commit, merge, push ou deploy automaticamente.

## Arquivos prováveis de alteração

- `app/**/loading.tsx`
- `app/**/error.tsx`
- `app/**/not-found.tsx`
- `components/ui/**`
- `lib/rate-limit/**`
- `lib/logger/**`
- `middleware.ts` (somente para rate limiting, com revisão reforçada)
- `docs/seguranca.md`

## Arquivos proibidos de alteração

- `prisma/schema.prisma`
- `prisma/migrations/**`
- `domain/order/**`
- `services/order/**`
- `lib/auth/**`
- `auth.ts`
- `.env`
- `.env.local`
- `.env.production`

## Prompt de execução — Codex

````text
Atue como Codex no VS Code para executar a etapa E12a — UX, erros e segurança do Sistema de Hamburgueria.

Antes de alterar qualquer arquivo, leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12a-ux-seguranca.md

Objetivo da etapa:
Melhorar UX de formulários e tratamento de erros, aplicar rate limiting básico em rotas críticas e garantir que logs não exponham dados sensíveis.

Pré-requisito da etapa:
E11 aprovada; fluxo público/admin completo; CI inicial funcionando.

Escopo permitido:
- Padronizar formulários e mensagens de erro sem alterar regras de negócio.
- Criar `loading.tsx`, `error.tsx` e `not-found.tsx` onde fizer sentido.
- Aplicar rate limiting básico em login e criação de pedido usando middleware do Next.js ou biblioteca já aprovada — sem adicionar nova dependência sem justificativa.
- Implementar logs mínimos (nível info/warn/error) sem logar senha, token, cookie, dados pessoais ou stack trace em produção.
- Executar checklist OWASP mínimo e registrar resultado como documento.

Escopo proibido:
- Criar novas features funcionais além do MVP.
- Adicionar Sentry obrigatório, observabilidade extensiva ou analytics externo.
- Alterar schema, checkout, auth ou lógica de status sem motivo crítico documentado.
- Instalar biblioteca de rate limiting sem aprovação prévia do usuário.
- Não fazer commit, merge, push ou deploy automaticamente.

Procedimento obrigatório:
1. Execute `git status --short` e identifique alterações pendentes.
2. Se houver arquivos alterados fora do escopo desta etapa, pare e registre o bloqueador.
3. Faça somente a menor implementação necessária para cumprir os critérios de aceite.
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
- `middleware.ts` (somente para rate limiting, com revisão reforçada)
- `docs/seguranca.md`

Arquivos proibidos ou sensíveis:
- `prisma/schema.prisma`
- `prisma/migrations/**`
- `domain/order/**`
- `services/order/**`
- `lib/auth/**`
- `auth.ts`
- `.env`
- `.env.local`
- `.env.production`

Critérios de aceite:
- Formulários exibem erros próximos ao campo e têm estado loading/disabled durante mutações.
- `loading.tsx`, `error.tsx` e `not-found.tsx` existem nas rotas críticas.
- Rate limiting básico aplicado em login e criação de pedido ou limitação justificada documentada.
- Logs não contêm senha, token, cookie, dados pessoais ou stack trace.
- Checklist OWASP mínimo executado e resultado salvo em `docs/seguranca.md`.
- Build de produção continua passando.

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
Atue como Claude Code no VS Code para revisar criticamente a implementação da etapa E12a — UX, erros e segurança feita pelo Codex.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12a-ux-seguranca.md
- diff atual da branch

Objetivo da revisão:
Verificar se a implementação cumpre a etapa E12a sem extrapolar escopo, sem enfraquecer segurança e sem antecipar etapas futuras.

Não implemente código nesta revisão, salvo autorização explícita do usuário. Priorize análise, apontamentos e bloqueadores.

A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E12a-ux-seguranca-revisao.md`; esse deve ser o único arquivo modificado pela revisão.

Verifique obrigatoriamente:
- Formulários exibem erros próximos ao campo e têm estado loading/disabled durante mutações.
- `loading.tsx`, `error.tsx` e `not-found.tsx` existem nas rotas críticas.
- Rate limiting básico aplicado em login e criação de pedido ou limitação justificada documentada.
- Logs não contêm senha, token, cookie, dados pessoais ou stack trace.
- Checklist OWASP mínimo executado e resultado salvo em `docs/seguranca.md`.
- Build de produção continua passando.

Verifique também:
- arquivos alterados versus arquivos prováveis;
- ausência de alterações em arquivos proibidos (especialmente auth, order, schema);
- middleware.ts não enfraquece proteção de rotas admin;
- comandos executados e resultado;
- ausência de feature creep;
- nenhuma nova dependência instalada sem justificativa.

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
Atue como Codex no VS Code para aplicar somente as correções obrigatórias apontadas na revisão da etapa E12a — UX, erros e segurança.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12a-ux-seguranca.md
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
Atue como Claude Code no VS Code para realizar auditoria final da etapa E12a — UX, erros e segurança.

Esta auditoria é somente leitura quanto à implementação e aos documentos do produto. Não implemente nem altere código, configurações, schema, migrations, testes, prompts ou documentação funcional. A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E12a-ux-seguranca-auditoria-final.md`, que deve ser o único arquivo modificado pela auditoria.

Use `docs/ia-auditorias/TEMPLATE-agent-report.md`. Fundamente cada conclusão em arquivo, diff ou comando verificável; identifique os arquivos analisados; separe comandos reexecutados de resultados apenas registrados em relatórios anteriores; não declare validação executada ou aprovada sem evidência. Não faça commit, merge, push ou deploy.

Leia:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12a-ux-seguranca.md
- relatório de execução do Codex
- relatório de revisão do Claude Code
- relatório de correção do Codex, se existir
- diff final da branch

Objetivo:
Confirmar se a etapa pode ser encerrada e se está segura para avançar para E12b.

Audite:
- Formulários exibem erros próximos ao campo e têm estado loading/disabled durante mutações.
- `loading.tsx`, `error.tsx` e `not-found.tsx` existem nas rotas críticas.
- Rate limiting básico aplicado em login e criação de pedido ou limitação justificada documentada.
- Logs não contêm senha, token, cookie, dados pessoais ou stack trace.
- Checklist OWASP mínimo executado e resultado salvo em `docs/seguranca.md`.
- Build de produção continua passando.
- middleware.ts não enfraquece proteção de rotas admin.

Bloqueadores conhecidos desta etapa:
- Log com dados sensíveis.
- Rate limiting que remove proteção de rotas admin.
- Build falhando.
- Middleware reescrito sem revisão reforçada.
- Nova dependência instalada sem aprovação.

Formato da resposta:
- Veredito final: aprovado para avançar, aprovado com ressalvas ou bloqueado.
- Evidências objetivas.
- Arquivos alterados no diff final.
- Comandos validados e resultados informados.
- Validações reexecutadas separadas das evidências históricas.
- Riscos remanescentes.
- Pendências para próxima etapa (E12b).
- Confirmação de ausência de aumento de escopo.
- Status final: Aprovado, Aprovado com observações, Requer ajustes ou Bloqueado.
````

## Critérios de aceite

- Formulários exibem erros próximos ao campo e têm estado loading/disabled durante mutações.
- `loading.tsx`, `error.tsx` e `not-found.tsx` existem nas rotas críticas.
- Rate limiting básico aplicado em login e criação de pedido ou limitação justificada documentada.
- Logs não contêm senha, token, cookie, dados pessoais ou stack trace.
- Checklist OWASP mínimo executado e resultado salvo em `docs/seguranca.md`.
- Build de produção continua passando.

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

- Log com dados sensíveis.
- Rate limiting que remove proteção de rotas admin.
- Build falhando.
- Middleware reescrito sem revisão reforçada.
- Nova dependência instalada sem aprovação.
- Ausência de relatório final.
- Alterações em arquivos proibidos sem justificativa e revisão reforçada.

## Critérios para avançar para a próxima etapa

- Implementação concluída.
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
