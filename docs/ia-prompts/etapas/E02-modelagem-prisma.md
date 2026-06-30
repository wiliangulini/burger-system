# E02 — Modelagem Prisma

## Referência obrigatória

Antes de executar qualquer ação, leia:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- Arquivo atual da etapa: `docs/ia-prompts/etapas/E02-modelagem-prisma.md`

## Correspondência no roadmap de execução

Esta etapa consolida as seguintes entradas do `roadmap-execucao-ia.md`:

- IA-02.01 — Configurar Prisma e PostgreSQL
- IA-02.02 — Modelar Categoria e Produto
- IA-02.03 — Modelar Usuário Admin e roles
- IA-02.04 — Modelar Pedido, ItemPedido e snapshot
- IA-02.05 — Modelar ConfigLoja e Auditoria

## Contexto obrigatório

- Projeto: Sistema de Hamburgueria.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Arquitetura: monolito modular, server-first, validação no servidor e separação entre área pública e admin.
- Execução: uma etapa por vez.
- MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos/status, configurações, dashboard, testes e deploy.
- Pós-MVP proibido: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.

## Objetivo da etapa

Estabelecer a camada de persistência com Prisma/PostgreSQL e modelar os dados centrais do MVP sem criar UI ou fluxo funcional.

## Pré-requisitos

E01 aprovada; projeto Next.js buildando; PostgreSQL local/dev disponível; `.env.local` configurado fora do repositório.

## Escopo permitido

- Instalar e configurar Prisma e `@prisma/client`.
- Criar `prisma/schema.prisma` com PostgreSQL.
- Criar `lib/db.ts` com PrismaClient singleton.
- Criar `.env.example` sem segredo real e proteger `.env*` no `.gitignore`.
- Modelar Categoria, Produto, Usuario/Admin, roles, Pedido, ItemPedido, HistoricoStatus, ConfigLoja e Auditoria mínima.
- Usar `Decimal` para preços, taxa, subtotal e total.
- Criar migrations e seed mínimo seguro.

## Escopo proibido

- Criar CRUD admin, páginas públicas, login funcional, checkout ou alteração de status.
- Usar SQLite como banco principal.
- Armazenar senha em texto puro.
- Versionar `.env`, `.env.local`, string de conexão, hash sensível ou senha real.
- Usar `Float` para valores financeiros.
- Implementar upload real de imagens.
- Não fazer commit, merge, push ou deploy automaticamente.

## Arquivos prováveis de alteração

- `prisma/schema.prisma`
- `prisma/migrations/**`
- `prisma/seed.*`
- `lib/db.ts`
- `.env.example`
- `.gitignore`
- `package.json`
- `package-lock.json`
- `tests/domain/**`

## Arquivos proibidos de alteração

- `app/**`
- `components/**`
- `lib/auth/**`
- `auth.ts`
- `middleware.ts`
- `app/api/**`
- `public/uploads/**`
- `.env`
- `.env.local`
- `.env.production`
- `.github/workflows/**`

## Prompt de execução — Codex

````text
Atue como Codex no VS Code para executar a etapa E02 — Modelagem Prisma do Sistema de Hamburgueria.

Antes de alterar qualquer arquivo, leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E02-modelagem-prisma.md

Objetivo da etapa:
Estabelecer a camada de persistência com Prisma/PostgreSQL e modelar os dados centrais do MVP sem criar UI ou fluxo funcional.

Pré-requisito da etapa:
E01 aprovada; projeto Next.js buildando; PostgreSQL local/dev disponível; `.env.local` configurado fora do repositório.

Escopo permitido:
- Instalar e configurar Prisma e `@prisma/client`.
- Criar `prisma/schema.prisma` com PostgreSQL.
- Criar `lib/db.ts` com PrismaClient singleton.
- Criar `.env.example` sem segredo real e proteger `.env*` no `.gitignore`.
- Modelar Categoria, Produto, Usuario/Admin, roles, Pedido, ItemPedido, HistoricoStatus, ConfigLoja e Auditoria mínima.
- Usar `Decimal` para preços, taxa, subtotal e total.
- Criar migrations e seed mínimo seguro.

Escopo proibido:
- Criar CRUD admin, páginas públicas, login funcional, checkout ou alteração de status.
- Usar SQLite como banco principal.
- Armazenar senha em texto puro.
- Versionar `.env`, `.env.local`, string de conexão, hash sensível ou senha real.
- Usar `Float` para valores financeiros.
- Implementar upload real de imagens.

Procedimento obrigatório:
1. Execute `git status --short` e identifique alterações pendentes.
2. Se houver arquivos alterados fora do escopo desta etapa, pare e registre o bloqueador.
3. Faça somente a menor implementação/documentação necessária para cumprir os critérios de aceite.
4. Não implemente etapa futura.
5. Não faça commit, merge, push ou deploy automaticamente.
6. Execute os comandos obrigatórios de validação listados neste arquivo.
7. Gere relatório final completo no formato exigido.

Arquivos prováveis de alteração:
- `prisma/schema.prisma`
- `prisma/migrations/**`
- `prisma/seed.*`
- `lib/db.ts`
- `.env.example`
- `.gitignore`
- `package.json`
- `package-lock.json`
- `tests/domain/**`

Arquivos proibidos ou sensíveis:
- `app/**`
- `components/**`
- `lib/auth/**`
- `auth.ts`
- `middleware.ts`
- `app/api/**`
- `public/uploads/**`
- `.env`
- `.env.local`
- `.env.production`
- `.github/workflows/**`

Critérios de aceite:
- `npx prisma validate` passa.
- Banco principal é PostgreSQL.
- PrismaClient singleton existe.
- Categoria tem nome/slug únicos e relacionamento com Produto.
- Preço e totais usam Decimal.
- Usuario admin possui email único, role obrigatória e senha hash.
- Pedido possui snapshot, código público, idempotencyKey e histórico de status.
- Configuração da loja e auditoria mínima estão modeladas.
- Seed mínimo não expõe segredo real e não sobrescreve senha forte de produção.

Comandos obrigatórios de validação:
```bash
npx prisma validate
npx prisma migrate dev
npx prisma db seed
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
Atue como Claude Code no VS Code para revisar criticamente a implementação da etapa E02 — Modelagem Prisma feita pelo Codex.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E02-modelagem-prisma.md
- diff atual da branch

Objetivo da revisão:
Verificar se a implementação cumpre a etapa E02 sem extrapolar escopo, sem enfraquecer segurança e sem antecipar etapas futuras.

Não implemente código nesta revisão, salvo autorização explícita do usuário. Priorize análise, apontamentos e bloqueadores.

Verifique obrigatoriamente:
- `npx prisma validate` passa.
- Banco principal é PostgreSQL.
- PrismaClient singleton existe.
- Categoria tem nome/slug únicos e relacionamento com Produto.
- Preço e totais usam Decimal.
- Usuario admin possui email único, role obrigatória e senha hash.
- Pedido possui snapshot, código público, idempotencyKey e histórico de status.
- Configuração da loja e auditoria mínima estão modeladas.
- Seed mínimo não expõe segredo real e não sobrescreve senha forte de produção.

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
Atue como Codex no VS Code para aplicar somente as correções obrigatórias apontadas na revisão da etapa E02 — Modelagem Prisma.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E02-modelagem-prisma.md
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
npx prisma validate
npx prisma migrate dev
npx prisma db seed
npm run typecheck
npm test
npm run build
git diff --check
git status --short
```
````

## Prompt de auditoria final — Claude Code

````text
Atue como Claude Code no VS Code para realizar auditoria final da etapa E02 — Modelagem Prisma.

Esta auditoria é somente leitura. Não implemente código, não edite documentação, não faça commit, merge, push ou deploy.

Leia:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E02-modelagem-prisma.md
- relatório de execução do Codex
- relatório de revisão do Claude Code
- relatório de correção do Codex, se existir
- diff final da branch

Objetivo:
Confirmar se a etapa pode ser encerrada e se está segura para avançar para a próxima etapa.

Audite:
- `npx prisma validate` passa.
- Banco principal é PostgreSQL.
- PrismaClient singleton existe.
- Categoria tem nome/slug únicos e relacionamento com Produto.
- Preço e totais usam Decimal.
- Usuario admin possui email único, role obrigatória e senha hash.
- Pedido possui snapshot, código público, idempotencyKey e histórico de status.
- Configuração da loja e auditoria mínima estão modeladas.
- Seed mínimo não expõe segredo real e não sobrescreve senha forte de produção.

Bloqueadores conhecidos desta etapa:
- Prisma não valida.
- Migration falha.
- Segredo versionado.
- Uso de Float em dinheiro.
- Modelo de pedido sem snapshot ou idempotência.
- Seed inseguro.

Formato da resposta:
- Veredito final: aprovado para avançar, aprovado com ressalvas ou bloqueado.
- Evidências objetivas.
- Arquivos alterados no diff final.
- Comandos validados e resultados informados.
- Riscos remanescentes.
- Pendências para próxima etapa.
- Confirmação de ausência de aumento de escopo.
````

## Critérios de aceite

- `npx prisma validate` passa.
- Banco principal é PostgreSQL.
- PrismaClient singleton existe.
- Categoria tem nome/slug únicos e relacionamento com Produto.
- Preço e totais usam Decimal.
- Usuario admin possui email único, role obrigatória e senha hash.
- Pedido possui snapshot, código público, idempotencyKey e histórico de status.
- Configuração da loja e auditoria mínima estão modeladas.
- Seed mínimo não expõe segredo real e não sobrescreve senha forte de produção.

## Comandos obrigatórios de validação

```bash
npx prisma validate
npx prisma migrate dev
npx prisma db seed
npm run typecheck
npm test
npm run build
git diff --check
git status --short
```

## Bloqueadores da etapa

- Prisma não valida.
- Migration falha.
- Segredo versionado.
- Uso de Float em dinheiro.
- Modelo de pedido sem snapshot ou idempotência.
- Seed inseguro.
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

