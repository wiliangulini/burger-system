---
tipo: reference
area: regras-dominio
status: active
source: PROJECT_RULES.md
updated: 2026-07-05
---

# 7. Prisma, banco e migrations

> Part of [PROJECT_RULES.md](../../PROJECT_RULES.md) — extracted here by drydocs. Load on demand.

### Regras gerais

- `schema.prisma` é contrato central de dados.
- Migrations devem ser versionadas, pequenas e revisáveis.
- Não editar migration já aplicada em ambiente compartilhado sem autorização.
- Não executar `prisma migrate reset` sem autorização explícita.
- Não rodar migrations contra produção sem confirmação explícita do ambiente.
- Antes de `migrate dev`, confirmar que é ambiente local.
- Preferir constraints, índices e relações explícitas.
- Seeds devem ser idempotentes.

### Índices mínimos recomendados

```txt
Category.slug
Product.slug
Order.code
Order.status + Order.createdAt
Order.createdAt
Order.paymentStatus
Order.customerPhone, quando existir campo normalizado
DeliveryArea.isActive
AuditLog.createdAt
```

### Transações

Use transação Prisma para checkout/criação de pedido. Não coloque chamadas externas lentas dentro da transação. Webhooks devem ser idempotentes.

---
