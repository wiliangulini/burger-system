---
tipo: reference
area: regras-dominio
status: active
source: PROJECT_RULES.md
updated: 2026-07-05
---

# 9. Carrinho, checkout e pedidos

> Part of [PROJECT_RULES.md](../../PROJECT_RULES.md) — extracted here by drydocs. Load on demand.

### Carrinho

- Pode usar estado client-side/localStorage para UX.
- Não é fonte de verdade para preço, estoque, taxa ou disponibilidade.
- Deve enviar payload mínimo para o servidor: produto, quantidade, adicionais e observações.

### Checkout

- Deve validar dados do cliente, telefone, endereço, delivery/retirada, forma de pagamento e observações.
- Deve recalcular subtotal, taxa, desconto e total no servidor.
- Deve validar horário de funcionamento e pedido mínimo.
- Deve criar pedido de forma idempotente quando possível.
- Deve gravar snapshots de produtos/adicionais.
- Deve retornar código de acompanhamento seguro.

### Pedidos

Status sugeridos:

```txt
RECEIVED
CONFIRMED
IN_PREPARATION
READY
OUT_FOR_DELIVERY
DELIVERED
CANCELLED
```

Transições devem ser validadas por serviço de domínio. Cancelamento deve registrar motivo e ator quando feito pelo admin.

---
