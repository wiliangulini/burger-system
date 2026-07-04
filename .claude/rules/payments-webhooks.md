---
paths:
  # módulo ainda não implementado — caminhos-alvo (a confirmar)
  - "app/api/**/webhook*/**/*"
  # futuros: "src/services/payment/**/*", "app/api/webhooks/**/*"
---

# Regra Claude — Pagamentos e webhooks

Derivada de `PROJECT_RULES.md §11`. Se esta rule divergir da regra do projeto,
atualize `PROJECT_RULES.md` primeiro. Procedimento, validação e sinais de bloqueio
vivem no protocolo comum (`AGENTS.md §3-§10`, `PROJECT_RULES.md §17`).

## Invariantes

- MVP usa pagamento manual; gateway real exige ADR e autorização.
- Adapters de pagamento ficam isolados em `src/services/payment/`.
- Webhooks são Route Handlers.
- Todo webhook real valida assinatura, idempotência e `providerRef`.
- Não salve secrets de gateway em código ou documentação.
- Não atualize pedido pago sem reconciliação mínima.
