# ADR 0002 — Stack e fronteiras entre agentes

## Status

Aceita

## Contexto

O sistema precisa entregar cardápio, carrinho, checkout, pedidos, admin, cozinha, RBAC, configurações e preparação futura para pagamentos e WhatsApp sem sobre-engenharia no MVP.

## Decisão

Adotar a stack principal:

```txt
Next.js App Router
React.js
TypeScript
Tailwind CSS
PostgreSQL
Prisma
Auth.js
Zod
```

Fronteiras técnicas:

- Server Components por padrão.
- Client Components somente para interatividade.
- Server Actions para mutações internas.
- Route Handlers para health checks, webhooks e APIs externas.
- Prisma apenas no servidor.
- Zod para entrada externa.
- Auth.js/RBAC validado server-side.

Fronteiras entre agentes:

- Codex: planejamento, implementação incremental, revisão de diff e continuidade técnica.
- Claude Code: planejamento em modo seguro, implementação controlada, auditoria, revisão sênior e aplicação de comandos/skills.
- Dev humano: aprovação de dependências, migrations sensíveis, deploy, push, alterações destrutivas e decisões arquiteturais amplas.

## Consequências

- MVP mais rápido e coeso.
- Menos JavaScript no cliente.
- Menor exposição de secrets.
- Mais disciplina em auth, checkout, banco e pedidos.
- Evolução futura para gateway, WhatsApp, analytics e deploy sem acoplamento prematuro.
