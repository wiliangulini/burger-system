---
tipo: reference
area: regras-dominio
status: active
source: PROJECT_RULES.md
updated: 2026-07-05
---

# 16. Padrão de implementação incremental

> Part of [PROJECT_RULES.md](../../PROJECT_RULES.md) — extracted here by drydocs. Load on demand.

Toda implementação deve ser:

- incremental;
- localizada;
- simples;
- testável;
- reversível;
- compatível com a arquitetura atual;
- pequena o suficiente para revisão humana.

Prefira:

- menor mudança suficiente;
- nomes explícitos;
- tipagem clara;
- Zod para entrada externa;
- services server-side para regra de negócio;
- Server Components por padrão;
- Client Components pequenos;
- Server Actions protegidas para mutações internas;
- Route Handlers para health/webhooks/API externa.

Evite:

- overengineering;
- abstrações prematuras;
- duplicação desnecessária;
- lógica de negócio complexa em componente visual;
- mocks permanentes;
- dependências novas sem necessidade comprovada;
- reformatação de arquivos inteiros sem relação com a tarefa.

---
