---
name: architecture-review
description: Use esta skill para revisar decisões arquiteturais, ADRs, fronteiras entre Server Components, Server Actions, Prisma, Auth.js e módulos críticos do sistema de hamburgueria.
---

# architecture-review — burger-shop-system

## Finalidade

Revisar ADRs e decisões que alterem fronteiras entre App Router, Server
Components, Server Actions, Route Handlers, Auth.js, Prisma e serviços de
domínio. Esta skill não implementa a decisão nem concede escrita.

## Procedimento

1. Leia `PROJECT_RULES.md`, `AGENTS.md`, `CLAUDE.md` e as rules aplicáveis.
2. Confirme o problema, as restrições e os contratos afetados.
3. Compare ao menos duas alternativas viáveis, incluindo manter o desenho atual.
4. Avalie segurança, dados, operação, reversibilidade e custo de migração.
5. Verifique aderência ao monolito modular, server-first e ao escopo do MVP.
6. Recomende uma alternativa e registre consequências, riscos e gatilhos de revisão.

## Saída

Entregue contexto, decisão proposta, alternativas, trade-offs, riscos,
compatibilidade e validações necessárias. Implementação deve ocorrer em tarefa
separada.
