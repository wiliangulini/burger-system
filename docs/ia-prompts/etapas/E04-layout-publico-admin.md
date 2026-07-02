# E04 — Layout público e admin

## Referência obrigatória

Antes de executar qualquer ação, leia:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- Arquivo atual da etapa: `docs/ia-prompts/etapas/E04-layout-publico-admin.md`

## Correspondência no roadmap de execução

Esta etapa consolida as seguintes entradas do `roadmap-execucao-ia.md`:

- IA-03.03 — Criar layout administrativo
- IA-06.01 — Criar layout público
- IA-12.01 — Padronizar componentes de formulário

## Contexto obrigatório

- Projeto: Sistema de Hamburgueria.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Arquitetura: monolito modular, server-first, validação no servidor e separação entre área pública e admin.
- Execução: uma etapa por vez.
- MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos/status, configurações, dashboard, testes e deploy.
- Pós-MVP proibido: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.

## Objetivo da etapa

Criar a base visual e estrutural das áreas pública e administrativa sem implementar CRUD, catálogo completo, carrinho ou checkout.

## Pré-requisitos

E03 aprovada; rotas admin protegidas; base de Tailwind e qualidade funcionando.

## Escopo permitido

- Organizar layouts segmentados para público e admin no App Router.
- Criar header, footer, navegação pública e shell administrativo.
- Criar componentes base reutilizáveis de UI/formulário sem regra de negócio complexa.
- Adicionar estados básicos de loading, empty e error visual quando aplicável.
- Garantir responsividade mobile-first e HTML semântico.

## Escopo proibido

- Implementar CRUD de categorias/produtos.
- Consultar banco para catálogo real fora de mocks mínimos de layout.
- Implementar carrinho, checkout ou pedidos.
- Alterar proteção Auth.js.
- Criar dashboard funcional ou métricas reais.
- Não fazer commit, merge, push ou deploy automaticamente.

## Arquivos prováveis de alteração

- `app/(public)/layout.tsx`
- `app/(public)/page.tsx`
- `app/admin/layout.tsx`
- `app/admin/page.tsx`
- `components/layout/**`
- `components/ui/**`
- `components/admin/**`
- `app/globals.css`
- `tailwind.config.ts`

## Arquivos proibidos de alteração

- `prisma/**`
- `lib/db.ts`
- `auth.ts`
- `middleware.ts exceto ajuste mínimo de rota se indispensável`
- `app/api/**`
- `domain/**`
- `services/**`
- `components/cart/**`
- `app/checkout/**`
- `app/carrinho/**`
- `public/uploads/**`
- `.env`
- `.env.local`

## Prompt de execução — Codex

````text
Atue como Codex no VS Code para executar a etapa E04 — Layout público e admin do Sistema de Hamburgueria.

Antes de alterar qualquer arquivo, leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E04-layout-publico-admin.md

Objetivo da etapa:
Criar a base visual e estrutural das áreas pública e administrativa sem implementar CRUD, catálogo completo, carrinho ou checkout.

Pré-requisito da etapa:
E03 aprovada; rotas admin protegidas; base de Tailwind e qualidade funcionando.

Escopo permitido:
- Organizar layouts segmentados para público e admin no App Router.
- Criar header, footer, navegação pública e shell administrativo.
- Criar componentes base reutilizáveis de UI/formulário sem regra de negócio complexa.
- Adicionar estados básicos de loading, empty e error visual quando aplicável.
- Garantir responsividade mobile-first e HTML semântico.

Escopo proibido:
- Implementar CRUD de categorias/produtos.
- Consultar banco para catálogo real fora de mocks mínimos de layout.
- Implementar carrinho, checkout ou pedidos.
- Alterar proteção Auth.js.
- Criar dashboard funcional ou métricas reais.

Procedimento obrigatório:
1. Execute `git status --short` e identifique alterações pendentes.
2. Se houver arquivos alterados fora do escopo desta etapa, pare e registre o bloqueador.
3. Faça somente a menor implementação/documentação necessária para cumprir os critérios de aceite.
4. Não implemente etapa futura.
5. Não faça commit, merge, push ou deploy automaticamente.
6. Execute os comandos obrigatórios de validação listados neste arquivo.
7. Gere relatório final completo no formato exigido.

Arquivos prováveis de alteração:
- `app/(public)/layout.tsx`
- `app/(public)/page.tsx`
- `app/admin/layout.tsx`
- `app/admin/page.tsx`
- `components/layout/**`
- `components/ui/**`
- `components/admin/**`
- `app/globals.css`
- `tailwind.config.ts`

Arquivos proibidos ou sensíveis:
- `prisma/**`
- `lib/db.ts`
- `auth.ts`
- `middleware.ts exceto ajuste mínimo de rota se indispensável`
- `app/api/**`
- `domain/**`
- `services/**`
- `components/cart/**`
- `app/checkout/**`
- `app/carrinho/**`
- `public/uploads/**`
- `.env`
- `.env.local`

Critérios de aceite:
- Área pública tem layout base responsivo.
- Área admin tem shell protegido e navegação básica.
- Componentes base não acoplam regras futuras.
- Nenhum CRUD ou fluxo de negócio foi implementado.
- Não houve regressão na proteção `/admin/*`.
- Lint, typecheck e build passam.

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
Atue como Claude Code no VS Code para revisar criticamente a implementação da etapa E04 — Layout público e admin feita pelo Codex.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E04-layout-publico-admin.md
- diff atual da branch

Objetivo da revisão:
Verificar se a implementação cumpre a etapa E04 sem extrapolar escopo, sem enfraquecer segurança e sem antecipar etapas futuras.

Não implemente código nesta revisão, salvo autorização explícita do usuário. Priorize análise, apontamentos e bloqueadores.

A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E04-layout-publico-admin-revisao.md`; esse deve ser o único arquivo modificado pela revisão.

Verifique obrigatoriamente:
- Área pública tem layout base responsivo.
- Área admin tem shell protegido e navegação básica.
- Componentes base não acoplam regras futuras.
- Nenhum CRUD ou fluxo de negócio foi implementado.
- Não houve regressão na proteção `/admin/*`.
- Lint, typecheck e build passam.

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
Atue como Codex no VS Code para aplicar somente as correções obrigatórias apontadas na revisão da etapa E04 — Layout público e admin.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E04-layout-publico-admin.md
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
Atue como Claude Code no VS Code para realizar auditoria final da etapa E04 — Layout público e admin.

Esta auditoria é somente leitura quanto à implementação e aos documentos do produto. Não implemente nem altere código, configurações, schema, migrations, testes, prompts ou documentação funcional. A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E04-layout-publico-admin-auditoria-final.md`, que deve ser o único arquivo modificado pela auditoria.

Use `docs/ia-auditorias/TEMPLATE-agent-report.md`. Fundamente cada conclusão em arquivo, diff ou comando verificável; identifique os arquivos analisados; separe comandos reexecutados de resultados apenas registrados em relatórios anteriores; não declare validação executada ou aprovada sem evidência. Não faça commit, merge, push ou deploy.

Leia:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E04-layout-publico-admin.md
- relatório de execução do Codex
- relatório de revisão do Claude Code
- relatório de correção do Codex, se existir
- diff final da branch

Objetivo:
Confirmar se a etapa pode ser encerrada e se está segura para avançar para a próxima etapa.

Audite:
- Área pública tem layout base responsivo.
- Área admin tem shell protegido e navegação básica.
- Componentes base não acoplam regras futuras.
- Nenhum CRUD ou fluxo de negócio foi implementado.
- Não houve regressão na proteção `/admin/*`.
- Lint, typecheck e build passam.

Bloqueadores conhecidos desta etapa:
- Layout admin acessível sem sessão `OWNER` válida nesta etapa.
- CRUD, carrinho ou checkout antecipados.
- Hooks usados em Server Components sem necessidade.
- Componentes globais com lógica de domínio indevida.

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

- Área pública tem layout base responsivo.
- Área admin tem shell protegido e navegação básica.
- Componentes base não acoplam regras futuras.
- Nenhum CRUD ou fluxo de negócio foi implementado.
- Não houve regressão na proteção `/admin/*`.
- Lint, typecheck e build passam.

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

- Layout admin acessível sem sessão `OWNER` válida nesta etapa.
- CRUD, carrinho ou checkout antecipados.
- Hooks usados em Server Components sem necessidade.
- Componentes globais com lógica de domínio indevida.
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
