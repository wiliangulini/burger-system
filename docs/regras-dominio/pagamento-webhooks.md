---
tipo: reference
area: regras-dominio
status: active
source: PROJECT_RULES.md
updated: 2026-07-05
---

# 11. Pagamento manual, Pix/gateway futuro e webhooks

> Part of [PROJECT_RULES.md](../../PROJECT_RULES.md) — extracted here by drydocs. Load on demand.

### MVP

- Pagamento manual é permitido: dinheiro, cartão na entrega/retirada, Pix manual informado fora do gateway.
- O sistema deve registrar `Payment.method` e `Payment.status`.
- Não implementar cobrança real sem ADR e validação de segurança.

### Futuro gateway/Pix

- Usar adapter em `src/services/payment/`.
- Webhook deve ser Route Handler.
- Webhook deve validar assinatura, idempotência, providerRef e status.
- Não confiar em payload sem validação.
- Não atualizar pedido pago sem reconciliação mínima.
- Não expor chaves do gateway.

---
