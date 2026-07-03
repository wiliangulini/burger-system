---
paths:
  # módulo ainda não implementado — caminhos-alvo (a confirmar)
  - "app/admin/**/cozinha/**/*"
  # futuros: "src/services/order/**/*", "src/components/kitchen/**/*"
---

# Regra Claude — Cozinha e fluxo de pedidos

Derivada de `PROJECT_RULES.md §10`. Se esta rule divergir da regra do projeto,
atualize `PROJECT_RULES.md` primeiro. Procedimento, validação e sinais de bloqueio
vivem no protocolo comum (`AGENTS.md §3-§10`, `PROJECT_RULES.md §17`).

## Invariantes

- Tela de cozinha prioriza legibilidade, contraste e rapidez operacional.
- Role `KITCHEN` acessa apenas fila e transições permitidas.
- Transições de status são validadas por serviço de domínio.
- Polling simples é aceitável no MVP; realtime precisa de justificativa.
- Não exponha dados pessoais desnecessários na cozinha.
