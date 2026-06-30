# Regra Claude — UI/UX e Tailwind

## Aplicação

Use esta regra quando a tarefa tocar ui/ux e tailwind no `burger-shop-system`.

## Regras específicas

- Interface pública deve ser mobile-first e focada em conversão.
- Admin deve ser objetivo, legível e eficiente.
- Cozinha exige botões grandes e alto contraste.
- Use Tailwind sem criar CSS global grande sem necessidade.
- Formulários devem ter labels, mensagens de erro e estado loading/disabled.
- Não adicione biblioteca visual sem aprovação.

## Procedimento obrigatório

1. Confirme branch e `git status`.
2. Leia `PROJECT_RULES.md`, `AGENTS.md` e `CLAUDE.md`.
3. Leia os arquivos diretamente relacionados ao módulo.
4. Identifique contratos, consumidores e riscos.
5. Se a mudança for sensível ou multiarquivo, proponha plano antes de editar.
6. Implemente a menor alteração segura suficiente.
7. Revise diff.
8. Execute validações existentes e relevantes.
9. Informe validações não executadas.
10. Finalize com status.

## Validações recomendadas

- `npm run lint`, se existir.
- `npm run typecheck`, se existir.
- `npm run build`, se existir.
- Testes unitários/e2e relevantes, se existirem.
- Validação manual do fluxo afetado.
- `npx prisma validate` quando houver Prisma.

## Sinais de bloqueio

- necessidade de secrets ou `.env`;
- dependência nova sem aprovação;
- alteração destrutiva de banco;
- mudança de contrato público sem revisão;
- risco de expor admin, pedido, pagamento ou dados pessoais.
