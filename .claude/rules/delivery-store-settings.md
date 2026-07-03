---
paths:
  # módulo ainda não implementado — caminhos-alvo (a confirmar)
  - "app/admin/**/configuracoes/**/*"
  # futuros: "src/services/delivery/**/*", "src/schemas/*loja*", "src/schemas/*delivery*"
---

# Regra Claude — Delivery e configurações da loja

Derivada de `PROJECT_RULES.md §12`. Se esta rule divergir da regra do projeto,
atualize `PROJECT_RULES.md` primeiro. Procedimento, validação e sinais de bloqueio
vivem no protocolo comum (`AGENTS.md §3-§10`, `PROJECT_RULES.md §17`).

## Invariantes

- `StoreSettings` define nome, WhatsApp, abertura manual, tempo médio e pedido mínimo.
- `OperatingHour` define disponibilidade por dia/horário.
- `DeliveryArea` define área, taxa, mínimo e status.
- Checkout valida loja aberta, pedido mínimo e entrega antes de criar pedido.
- Alterações operacionais relevantes geram `AuditLog`.
