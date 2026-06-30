# Regra Claude — Cozinha e fluxo de pedidos

## Aplicação

Use esta regra quando a tarefa tocar cozinha e fluxo de pedidos no `burger-shop-system`.

## Regras específicas

- Tela de cozinha deve priorizar legibilidade, contraste e rapidez operacional.
- Role KITCHEN acessa apenas fila e transições permitidas.
- Transições de status devem ser validadas por serviço de domínio.
- Polling simples é aceitável no MVP; realtime precisa de justificativa.
- Evite expor dados pessoais desnecessários na cozinha.

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
