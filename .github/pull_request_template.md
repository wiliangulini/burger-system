## Resumo

Descreva de forma objetiva o que mudou.

## Escopo

- [ ] A mudanca pertence a etapa planejada.
- [ ] Nao antecipa funcionalidade de etapa futura.
- [ ] Nao altera arquivos proibidos sem justificativa registrada.

## Validacoes

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] `git diff --check`

## Seguranca e dados

- [ ] Nao ha secrets, tokens, credenciais ou `.env` versionados.
- [ ] Nao houve alteracao em Auth.js, RBAC, Prisma, checkout, pedidos ou webhooks sem revisao reforcada.
- [ ] Nao houve deploy, push, merge ou migration destrutiva automatica.

## Relatorio

- [ ] Relatorio da etapa salvo em `docs/ia-auditorias/`.
- [ ] Pendencias, riscos e validacoes nao executadas foram registradas.
