---
tipo: reference
area: regras-dominio
status: active
source: PROJECT_RULES.md
updated: 2026-07-05
---

# 8. Catálogo, produtos, imagens e adicionais

> Part of [PROJECT_RULES.md](../../PROJECT_RULES.md) — extracted here by drydocs. Load on demand.

### Catálogo público

- Deve listar apenas categorias/produtos ativos e disponíveis.
- Deve tratar estado vazio, loading e erro.
- Deve ser responsivo e mobile-first.
- Deve preservar SEO básico com metadata adequada.

### Admin de catálogo

- Criar, editar, ativar/desativar e ordenar categorias.
- Criar, editar, ativar/desativar produtos.
- Validar nome, slug, preço, categoria e disponibilidade com Zod.
- Não permitir preço negativo.
- Imagens devem ter `altText` e ordem.
- Upload ou storage real só deve ser implementado com política de segurança definida.

### Adicionais/opcionais

- Adicionais devem ter preço e disponibilidade próprios.
- Produtos devem declarar quais adicionais aceitam e quantidade máxima.
- Checkout deve gravar snapshot de adicionais vendidos.

---
