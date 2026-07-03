---
paths:
  # módulo ainda não implementado — caminhos-alvo (a confirmar)
  - "app/admin/**/categorias/**/*"
  - "app/admin/**/produtos/**/*"
  - "app/(public)/**/*"
  # futuros: "src/services/catalog/**/*", "src/schemas/*produto*", "src/schemas/*categoria*"
---

# Regra Claude — Catálogo, produtos e adicionais

Derivada de `PROJECT_RULES.md §8`. Se esta rule divergir da regra do projeto,
atualize `PROJECT_RULES.md` primeiro. Procedimento, validação e sinais de bloqueio
vivem no protocolo comum (`AGENTS.md §3-§10`, `PROJECT_RULES.md §17`).

## Invariantes

- Catálogo público lista apenas itens ativos/disponíveis.
- Admin valida nome, slug, preço, categoria, imagem e disponibilidade com Zod.
- Preço não pode ser negativo.
- Imagens devem ter `altText` e `sortOrder`.
- Adicionais declaram preço, disponibilidade e limite por produto.
- Não use mock permanente como produto real.
