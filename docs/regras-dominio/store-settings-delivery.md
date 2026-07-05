---
tipo: reference
area: regras-dominio
status: active
source: PROJECT_RULES.md
updated: 2026-07-05
---

# 12. Store settings, horários e delivery

> Part of [PROJECT_RULES.md](../../PROJECT_RULES.md) — extracted here by drydocs. Load on demand.

- `StoreSettings` define nome, WhatsApp, abertura manual, tempo médio, pedido mínimo e flags operacionais.
- `OperatingHour` define horários por dia da semana.
- `DeliveryArea` define área/bairro, taxa, pedido mínimo e disponibilidade.
- Checkout deve validar se a loja aceita pedido naquele momento.
- Mudanças em horários, taxas e pedido mínimo devem gerar `AuditLog`.
- Cálculo dinâmico por distância não entra no MVP sem ADR.

---
