---
tipo: reference
area: regras-dominio
status: active
source: PROJECT_RULES.md
updated: 2026-07-05
---

# 4. Arquitetura Next.js App Router

> Part of [PROJECT_RULES.md](../../PROJECT_RULES.md) — extracted here by drydocs. Load on demand.

### Regra de ouro

- Página e leitura de dados: Server Components + services server-side.
- Interatividade local: Client Components pequenos e isolados.
- Mutações internas autenticadas: Server Actions.
- APIs públicas, health checks e webhooks: Route Handlers.
- Validação de entrada: Zod no servidor.
- Acesso ao banco: Prisma apenas no servidor.

### Estrutura recomendada

```txt
src/app/(public)/
src/app/admin/
src/app/api/
src/components/ui/
src/components/public/
src/components/admin/
src/components/kitchen/
src/lib/auth/
src/lib/prisma/
src/lib/env/
src/lib/observability/
src/services/catalog/
src/services/cart/
src/services/checkout/
src/services/order/
src/services/payment/
src/services/delivery/
src/actions/
src/schemas/
src/types/
prisma/
```

### Regras

- Nunca importe Prisma Client em Client Component.
- Não coloque secrets em `NEXT_PUBLIC_*`.
- Use `revalidatePath`/`revalidateTag` após mutações que afetam páginas cacheadas, quando aplicável.
- `use client` deve aparecer apenas onde houver estado, event handlers, efeitos, APIs de browser ou stores locais.
- Componentes de UI devem ser puros sempre que possível.
- Server Actions sensíveis devem validar sessão, role e payload.
- Route Handlers sensíveis devem validar método HTTP, autenticação, assinatura/idempotência e rate limit quando aplicável.

---
