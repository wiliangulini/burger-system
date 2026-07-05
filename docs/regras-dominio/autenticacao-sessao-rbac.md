---
tipo: reference
area: regras-dominio
status: active
source: PROJECT_RULES.md
updated: 2026-07-05
---

# 6. Autenticação, sessão e RBAC

> Part of [PROJECT_RULES.md](../../PROJECT_RULES.md) — extracted here by drydocs. Load on demand.

### Roles iniciais

```txt
OWNER      acesso total administrativo
MANAGER    catálogo, pedidos, dashboard e configurações operacionais
ATTENDANT  atendimento e pedidos
KITCHEN    tela de cozinha e status operacionais permitidos
```

### Matriz mínima de autorização

| Área | Roles autorizadas |
|---|---|
| Autenticação inicial e bootstrap E03 | `OWNER` |
| Dashboard administrativo | `OWNER`, `MANAGER` |
| Categorias e produtos | `OWNER`, `MANAGER` |
| Pedidos e atendimento | `OWNER`, `MANAGER`, `ATTENDANT` |
| Cozinha e transições operacionais permitidas | `OWNER`, `MANAGER`, `KITCHEN` |
| Configurações operacionais | `OWNER`, `MANAGER` |
| Usuários, roles e permissões | `OWNER` |

Na E03, `OWNER` é o baseline seguro e exclusivo de acesso ao painel. As demais
roles devem ser habilitadas incrementalmente quando seus módulos existirem.
Autenticar uma role não concede acesso global ao painel: cada Server Action,
Route Handler e serviço sensível deve autorizar a operação conforme a matriz.
`KITCHEN` não acessa catálogo, configurações ou dados pessoais desnecessários;
`ATTENDANT` não altera catálogo, usuários ou configurações.

### Regras

- Admin/staff não autenticado não acessa área interna.
- Usuário inativo não autentica e não executa mutações.
- Toda Server Action administrativa deve validar sessão e role.
- Todo Route Handler administrativo deve validar sessão e role.
- Não confiar em role vinda do client-side.
- Sessão deve usar cookie seguro/HttpOnly via Auth.js.
- Alterações de senha, role, usuário ativo/inativo e permissões devem gerar `AuditLog`.
- Seed de admin deve usar senha forte via variável de ambiente apenas em `.env.example`; nunca hard-code de senha real.

### Áreas sensíveis

- `src/lib/auth/**`
- `src/middleware.ts`
- `src/actions/**` administrativas
- `src/app/admin/**`
- `src/app/api/**` com autenticação
- `prisma/schema.prisma` em modelos `User`, `Session`, `Account`, `AuditLog`

Mudanças nessas áreas exigem plano antes de implementação.

---
