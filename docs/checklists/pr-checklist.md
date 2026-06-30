# Checklist de PR

Use este checklist antes de solicitar revisão.

## Escopo

- [ ] A alteração pertence à etapa planejada.
- [ ] Não há feature futura antecipada.
- [ ] Arquivos proibidos não foram alterados sem justificativa.
- [ ] O diff está pequeno o suficiente para revisão humana.

## Segurança

- [ ] Nenhum secret, token, senha, cookie ou `.env` foi lido ou versionado.
- [ ] Auth.js, RBAC, checkout, pedidos, Prisma, upload e webhooks não foram alterados sem revisão reforçada.
- [ ] Dados administrativos não foram expostos em área pública.

## Qualidade

- [ ] `npm run lint` passou.
- [ ] `npm run typecheck` passou.
- [ ] `npm test` passou.
- [ ] `npm run build` passou.
- [ ] `git diff --check` passou.

## Relatório

- [ ] Relatório salvo em `docs/ia-auditorias/`.
- [ ] Riscos e pendências foram registrados.
- [ ] Comandos executados e resultados foram registrados.
