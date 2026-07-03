---
paths:
  - "prisma/schema.prisma"
  - "prisma/migrations/**/*"
  - "prisma/seed.ts"
  - "prisma.config.ts"
  - "src/lib/db.ts"
  # a confirmar: "src/lib/prisma/**/*" (não existe hoje; src/generated/prisma é gerado/ignorado)
---

# Regra Claude — Prisma e banco de dados

Derivada de `PROJECT_RULES.md §7`. Se esta rule divergir da regra do projeto,
atualize `PROJECT_RULES.md` primeiro. Procedimento, validação e sinais de bloqueio
vivem no protocolo comum (`AGENTS.md §3-§10`, `PROJECT_RULES.md §17`).

## Invariantes

- Migrations pequenas, versionadas e revisáveis.
- Não edite migration já aplicada em ambiente compartilhado sem autorização.
- Não rode `migrate reset` sem autorização explícita.
- Use transações curtas para checkout e criação de pedido; sem chamadas externas lentas dentro delas.
- Seed idempotente e nunca com senha real hard-coded.
- Adicione índices para slugs, código de pedido, status/data e auditoria.
