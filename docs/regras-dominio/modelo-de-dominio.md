---
tipo: reference
area: regras-dominio
status: active
source: PROJECT_RULES.md
updated: 2026-07-05
---

# 5. Modelo de domínio mínimo

> Part of [PROJECT_RULES.md](../../PROJECT_RULES.md) — extracted here by drydocs. Load on demand.

Entidades esperadas para o MVP ou MVP+:

```txt
User
Category
Product
ProductImage
Additional
ProductAdditional
Customer
Address
Order
OrderItem
OrderItemAdditional
Payment
DeliveryArea
StoreSettings
OperatingHour
AuditLog
```

Regras de modelagem:

- `Order.code` deve ser único e seguro para consulta pública limitada.
- `OrderItem` deve gravar snapshot de nome, preço e quantidade vendidos.
- `Payment` deve registrar método, status, provider e referência futura.
- `AuditLog` deve registrar ações administrativas relevantes.
- Slugs de categoria/produto devem ser únicos.
- Preços devem usar tipo decimal no banco e conversão segura na camada de domínio.
- Estados devem usar enum quando o conjunto for fechado.

---
