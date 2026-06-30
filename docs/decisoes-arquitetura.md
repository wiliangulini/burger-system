# Decisões de arquitetura

Este documento consolida decisões iniciais. ADRs continuam sendo a fonte para decisões formais e numeradas.

## Stack obrigatória

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma
- Auth.js
- Zod
- GitHub Actions
- Vercel

## Arquitetura

- Monolito modular.
- Server Components por padrão.
- Client Components apenas quando houver interatividade local.
- Server Actions para mutações internas.
- Route Handlers para APIs externas, health checks e webhooks.
- Prisma apenas no servidor.
- Validação server-side com Zod nas etapas de domínio.

## Fronteiras da E01

A E01 cria apenas a base do projeto:

- documentação de escopo e processo;
- Next.js App Router em `/app`;
- TypeScript, Tailwind, ESLint e Prettier;
- Jest com Testing Library;
- CI inicial.

A E01 não cria domínio, banco, Auth.js, RBAC, admin, carrinho, checkout, pedidos, APIs ou upload.

## Áreas sensíveis futuras

- Autenticação, sessão, RBAC e middleware.
- Prisma, migrations e seed.
- Checkout, cálculo financeiro, pedidos, snapshots e idempotência.
- Pagamentos, Pix futuro e webhooks.
- Upload de imagens.
- Configurações operacionais que afetam checkout.
