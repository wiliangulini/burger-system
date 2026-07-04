---
paths:
  - "auth.ts"
  - "proxy.ts"                    # middleware atual; "middleware.ts"/"src/middleware.ts" a confirmar
  - "src/lib/auth/**/*"
  - "src/actions/auth.ts"
  - "app/admin/**/*"
  - "app/api/auth/**/*"
  - "src/components/admin/login-form.tsx"
---

# Regra Claude — Auth admin e RBAC

Derivada de `PROJECT_RULES.md §6`. Se esta rule divergir da regra do projeto,
atualize `PROJECT_RULES.md` primeiro. Procedimento, validação e sinais de bloqueio
vivem no protocolo comum (`AGENTS.md §3-§10`, `PROJECT_RULES.md §17`).

## Invariantes

- Roles iniciais: `OWNER`, `MANAGER`, `ATTENDANT`, `KITCHEN`; na E03, `OWNER` é o baseline exclusivo do painel.
- Toda Server Action e Route Handler admin valida sessão e role no servidor.
- Usuário inativo não autentica nem executa mutações.
- Não confie em role vinda do cliente.
- Alterações em usuário, role, senha e permissões geram `AuditLog`.
- Auth.js, middleware, cookies e proteção admin são áreas sensíveis e exigem plano antes de editar.
