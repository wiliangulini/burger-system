---
paths:
  - "app/**/*"
  - "src/actions/**/*"
  - "src/components/**/*"
  # a confirmar: "src/services/**/*", "src/app/**/*" (se migrar app→src/app)
---

# Regra Claude — Next.js App Router

Derivada de `PROJECT_RULES.md §4`. Se esta rule divergir da regra do projeto,
atualize `PROJECT_RULES.md` primeiro. Procedimento, validação e sinais de bloqueio
vivem no protocolo comum (`AGENTS.md §3-§10`, `PROJECT_RULES.md §17`).

## Invariantes

- Pages e layouts são Server Components por padrão.
- Use Client Components apenas para estado, event handlers, efeitos, browser APIs ou stores locais.
- Use Server Actions para mutações internas autenticadas.
- Use Route Handlers para health checks, webhooks e APIs externas.
- Não importe Prisma em Client Components.
- Não exponha secrets via `NEXT_PUBLIC_*`.
- Após mutações, avalie `revalidatePath`/`revalidateTag` quando houver cache afetado.
