---
paths:
  # módulo ainda não implementado — caminhos-alvo (a confirmar)
  - "app/(public)/checkout/**/*"
  # futuros: "src/services/{cart,checkout,order}/**/*", "src/actions/*pedido*", "src/schemas/*checkout*"
---

# Regra Claude — Carrinho, checkout e pedidos

Derivada de `PROJECT_RULES.md §9`. Se esta rule divergir da regra do projeto,
atualize `PROJECT_RULES.md` primeiro. Procedimento, validação e sinais de bloqueio
vivem no protocolo comum (`AGENTS.md §3-§10`, `PROJECT_RULES.md §17`).

## Invariantes

- Carrinho client-side é apenas UX, não fonte de verdade.
- Checkout recalcula subtotal, taxa, desconto e total no servidor.
- Pedidos gravam snapshots de produto, preço e adicionais.
- Código de pedido é único e seguro para acompanhamento público limitado.
- Criação de pedido é transacional e preferencialmente idempotente.
- Status e cancelamento seguem regras explícitas validadas por serviço de domínio.
