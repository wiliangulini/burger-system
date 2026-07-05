---
paths:
  - ".env.example"
  - "auth.ts"
  - "proxy.ts"                    # middleware atual; "middleware.ts"/"src/middleware.ts" a confirmar
  - "src/lib/auth/**/*"
  - "src/actions/**/*"
  - "app/api/**/*"
  - "prisma/schema.prisma"
  - "next.config.ts"
  - "package.json"
  - ".github/workflows/**/*"
---

# Regra Claude — Segurança, secrets e deploy

Derivada de `PROJECT_RULES.md §15` (regra transversal; ver também `AGENTS.md §4` e §9).
Se esta rule divergir da regra do projeto, atualize `PROJECT_RULES.md` primeiro.
Procedimento, validação e sinais de bloqueio vivem no protocolo comum
(`AGENTS.md §3-§10`, `PROJECT_RULES.md §17`).

## Invariantes

- Não leia nem edite `.env`, `.env.*` ou secrets; use `.env.example` só com placeholders.
- Não execute deploy, `git push`, reset, clean, `sudo`, `ssh`, `curl` ou `wget` sem autorização.
- Não exponha senhas, tokens, cookies ou chaves em logs/relatórios.
- Valide entradas externas com Zod.
- Proteja ações administrativas no servidor; não confie em dado do cliente para permissão.
- Não rode migrations destrutivas nem `prisma migrate reset` sem revisão humana.
