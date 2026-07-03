# Relatório de tarefa — Correção E02 Modelagem Prisma

## 1. Identificação

**Agente:** Codex
**Data:** 2026-06-30
**Branch atual:** `feature/e02-modelagem-prisma`
**Tipo de tarefa:** Implementação
**Status final:** Aprovado com observações

## 2. Objetivo

Aplicar exclusivamente a correção obrigatória C1 da revisão do Claude Code,
reposicionando o Prisma Client singleton em um caminho compatível com o alias
`@/*`.

## 3. Escopo solicitado

- Mover `lib/db.ts` para `src/lib/db.ts` sem alterar sua implementação.
- Atualizar o import usado por `prisma/seed.ts`.
- Executar novamente todas as validações obrigatórias da E02.
- Registrar pendências e riscos remanescentes sem implementar recomendações.

## 4. Escopo não incluído

- Alterações no schema ou em migrations.
- Inclusão de novos status de pedido.
- Modelagem de horários, pagamentos ou áreas de entrega.
- Alteração da validação de email do seed.
- UI, autenticação, checkout, APIs ou funcionalidades de etapas futuras.

## 5. Fontes de verdade consultadas

- `PROJECT_RULES.md`
- `AGENTS.md`
- `CODEX.md`
- `.codex/instructions.md`
- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- `docs/ia-prompts/etapas/E02-modelagem-prisma.md`
- `docs/ia-auditorias/E02-modelagem-prisma-revisao.md`
- `docs/ia-auditorias/E02-modelagem-prisma-execucao.md`
- `docs/ia-auditorias/TEMPLATE-agent-report.md`

## 6. Arquivos lidos

- `lib/db.ts` — implementação original do singleton.
- `prisma/seed.ts` — consumidor que precisava ter o import ajustado.
- `tsconfig.json` — confirmação de que `@/*` resolve para `./src/*`.
- `package.json` — confirmação dos scripts de validação.
- `prisma.config.ts` — configuração de schema, datasource e seed.

Nenhum arquivo `.env` ou conteúdo de credencial foi lido.

## 7. Arquivos alterados

- `prisma/seed.ts` — import alterado de `../lib/db` para
  `../src/lib/db`.

## 8. Arquivos criados

- `src/lib/db.ts` — conteúdo integral do antigo `lib/db.ts`.
- `docs/ia-auditorias/E02-modelagem-prisma-correcao.md` — relatório desta
  correção.

## 9. Arquivos preservados

- `prisma/schema.prisma` e `prisma/migrations/**` — nenhuma mudança de domínio
  ou banco foi necessária.
- Demais alterações não commitadas da E02 — preservadas sem sobrescrita.
- Arquivos proibidos da etapa — não alterados.

## 10. Arquivos removidos

- `lib/db.ts` — removido após transferência integral para `src/lib/db.ts`.

## 11. Estado inicial observado

A branch real era `feature/e02-modelagem-prisma` e já continha as alterações não
commitadas da E02. O singleton existia em `lib/db.ts`, enquanto o alias
`@/lib/db` apontava para `src/lib/db.ts`, caminho inexistente.

## 12. O que foi implementado ou analisado

- O Prisma Client singleton foi realocado para `src/lib/db.ts`.
- Sua implementação foi preservada integralmente.
- O seed passou a importar o singleton pelo novo caminho.
- O import público futuro `@/lib/db` agora resolve para o arquivo correto.
- Nenhuma recomendação não obrigatória da revisão foi implementada.

## 13. Decisões técnicas tomadas

### Caminho `src/lib/db.ts`

**Decisão:** usar exatamente `src/lib/db.ts`, uma das alternativas indicadas
pela correção C1.

**Justificativa:** é a menor alteração suficiente e torna `@/lib/db` compatível
com o alias existente no `tsconfig.json`.

**Alternativa considerada:** `src/lib/prisma/index.ts`.

**Trade-off:** o caminho escolhido é menos segmentado, mas evita uma
refatoração adicional fora da correção obrigatória.

## 14. Riscos identificados

| Risco | Severidade | Impacto | Mitigação |
|---|---|---|---|
| Executar validações no banco errado | Alto | Alteração de dados indevida | O Prisma confirmou `burger_system_dev` em `127.0.0.1:5432` antes da execução autorizada. |
| Recomendações de domínio permanecerem pendentes | Médio | Migrations futuras podem ser mais complexas | Registrar R2, R3, R4 e R5 para planejamento antes das etapas consumidoras. |
| Alterações E02 ainda não commitadas | Baixo | Estado depende de revisão humana antes de integração | Manter commit, push e merge manuais. |

## 15. Compatibilidade com o sistema de hamburgueria

- Stack Next.js App Router preservada: Sim
- Server Components por padrão preservados: Não aplicável
- Client Components justificados por interatividade: Não aplicável
- Auth.js/RBAC preservado: Sim
- Prisma/migrations preservados: Sim
- Catálogo/produtos preservados: Sim
- Carrinho/checkout/pedidos preservados: Sim
- Status/cozinha preservados: Sim
- Pagamento manual/webhook futuro preservados: Sim
- Store settings/delivery preservados: Sim
- Segurança/secrets preservados: Sim

## 16. Validações executadas

- [x] `npx prisma validate` — schema válido.
- [x] `npx prisma migrate dev` — PostgreSQL local
  `burger_system_dev` em `127.0.0.1:5432`; banco sincronizado, sem schema
  alterado e sem migration pendente.
- [x] `npx prisma db seed` — seed mínimo concluído.
- [x] `npm run typecheck` — passou sem erros.
- [x] `npm test` — 1 suíte e 1 teste passaram.
- [x] `npm run build` — build Next.js concluído; rotas `/` e `/_not-found`
  geradas.
- [x] `git diff --check` — passou sem saída.
- [x] `git status --short` — somente alterações não commitadas da E02,
  incluindo a correção atual.

O primeiro `npx prisma migrate dev` falhou com `Schema engine error` porque o
sandbox não alcançou o PostgreSQL local. O primeiro `npx prisma db seed` falhou
com `listen EPERM` ao criar o socket IPC do `tsx`. Ambos foram repetidos fora do
sandbox, com autorização, e passaram conforme registrado acima.

## 17. Validações não executadas

Nenhuma validação obrigatória ficou pendente.

## 18. Validações recomendadas

- [ ] Auditoria final somente leitura da E02.
- [ ] Revisão humana do diff antes de qualquer commit.

## 19. Diff revisado

- `git diff --stat`: Sim
- `git diff --name-only`: Sim
- `git diff --check`: Sim
- Observações: arquivos não rastreados da E02 foram considerados pelo estado do
  Git e pelos arquivos diretamente inspecionados.

## 20. Continuidade para outro agente

**Pode ser continuado por:** Claude Code
**Skill/comando sugerido:** `final-audit`
**Próximo passo recomendado:** auditar a E02 corrigida antes do commit manual.

## 21. Pendências

- R2: avaliar a inclusão futura de `CONFIRMADO` e `SAIU_PARA_ENTREGA` em
  `StatusPedido`.
- R3: modelar horário de funcionamento de forma programática antes do checkout.
- R4: planejar `Payment` e `DeliveryArea` antes das etapas consumidoras.
- R5: fortalecer a validação de email do seed em uma etapa autorizada.
- A branch `feature/e02-modelagem-prisma` difere da branch padrão assumida
  `main`; nenhuma troca de branch foi realizada.

## 22. Conclusão

A única correção obrigatória C1 foi aplicada e todas as validações obrigatórias
terminaram com sucesso. Não houve alteração de schema, migration, funcionalidade
ou escopo futuro. Nenhum commit, merge, push ou deploy foi executado.

Status final: Aprovado com observações
