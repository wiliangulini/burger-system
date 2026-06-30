# E10 — Pedidos admin e status

## Referência obrigatória

Antes de executar qualquer ação, leia:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- Arquivo atual da etapa: `docs/ia-prompts/etapas/E10-pedidos-admin-status.md`

## Correspondência no roadmap de execução

Esta etapa consolida as seguintes entradas do `roadmap-execucao-ia.md`:

- IA-09.01 — Criar listagem de pedidos
- IA-09.02 — Criar detalhe do pedido
- IA-09.03 — Implementar máquina de estados
- IA-09.04 — Implementar alteração de status com histórico

## Contexto obrigatório

- Projeto: Sistema de Hamburgueria.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Arquitetura: monolito modular, server-first, validação no servidor e separação entre área pública e admin.
- Execução: uma etapa por vez.
- MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos/status, configurações, dashboard, testes e deploy.
- Pós-MVP proibido: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.

## Objetivo da etapa

Implementar operação administrativa de pedidos: listagem, detalhe, máquina de estados e alteração controlada de status com histórico.

## Pré-requisitos

E09 aprovada; pedidos são persistidos com snapshot e status inicial; admin protegido.

## Escopo permitido

- Criar listagem admin de pedidos com paginação/filtro simples por status.
- Criar detalhe do pedido com snapshot completo.
- Implementar máquina de estados explícita.
- Permitir transições válidas de status.
- Registrar histórico de mudança de status com usuário/data.
- Validar autorização ADMIN em toda mutação.
- Adicionar testes unitários da máquina de estados e integração mínima da alteração.

## Escopo proibido

- Editar itens, preços ou dados financeiros do pedido.
- Permitir retornar de `CANCELADO` para status ativo.
- Permitir transição inválida sem erro.
- Criar automação de cozinha, impressão, notificação externa ou integração iFood.
- Alterar checkout fora de correção indispensável.
- Não fazer commit, merge, push ou deploy automaticamente.

## Arquivos prováveis de alteração

- `app/admin/pedidos/**`
- `components/admin/pedidos/**`
- `domain/pedidos/**`
- `services/pedidos/**`
- `lib/validations/pedido-status.*`
- `app/api/admin/pedidos/**`
- `tests/pedidos/**`

## Arquivos proibidos de alteração

- `app/(public)/checkout/**`
- `app/(public)/pedido/**`
- `components/cart/**`
- `domain/cart/**`
- `prisma/schema.prisma exceto ajuste indispensável e justificado`
- `prisma/migrations/** exceto ajuste indispensável e justificado`
- `auth.ts exceto ajuste mínimo se indispensável`
- `middleware.ts`
- `.env`
- `.env.local`

## Prompt de execução — Codex

````text
Atue como Codex no VS Code para executar a etapa E10 — Pedidos admin e status do Sistema de Hamburgueria.

Antes de alterar qualquer arquivo, leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E10-pedidos-admin-status.md

Objetivo da etapa:
Implementar operação administrativa de pedidos: listagem, detalhe, máquina de estados e alteração controlada de status com histórico.

Pré-requisito da etapa:
E09 aprovada; pedidos são persistidos com snapshot e status inicial; admin protegido.

Escopo permitido:
- Criar listagem admin de pedidos com paginação/filtro simples por status.
- Criar detalhe do pedido com snapshot completo.
- Implementar máquina de estados explícita.
- Permitir transições válidas de status.
- Registrar histórico de mudança de status com usuário/data.
- Validar autorização ADMIN em toda mutação.
- Adicionar testes unitários da máquina de estados e integração mínima da alteração.

Escopo proibido:
- Editar itens, preços ou dados financeiros do pedido.
- Permitir retornar de `CANCELADO` para status ativo.
- Permitir transição inválida sem erro.
- Criar automação de cozinha, impressão, notificação externa ou integração iFood.
- Alterar checkout fora de correção indispensável.

Procedimento obrigatório:
1. Execute `git status --short` e identifique alterações pendentes.
2. Se houver arquivos alterados fora do escopo desta etapa, pare e registre o bloqueador.
3. Faça somente a menor implementação/documentação necessária para cumprir os critérios de aceite.
4. Não implemente etapa futura.
5. Não faça commit, merge, push ou deploy automaticamente.
6. Execute os comandos obrigatórios de validação listados neste arquivo.
7. Gere relatório final completo no formato exigido.

Arquivos prováveis de alteração:
- `app/admin/pedidos/**`
- `components/admin/pedidos/**`
- `domain/pedidos/**`
- `services/pedidos/**`
- `lib/validations/pedido-status.*`
- `app/api/admin/pedidos/**`
- `tests/pedidos/**`

Arquivos proibidos ou sensíveis:
- `app/(public)/checkout/**`
- `app/(public)/pedido/**`
- `components/cart/**`
- `domain/cart/**`
- `prisma/schema.prisma exceto ajuste indispensável e justificado`
- `prisma/migrations/** exceto ajuste indispensável e justificado`
- `auth.ts exceto ajuste mínimo se indispensável`
- `middleware.ts`
- `.env`
- `.env.local`

Critérios de aceite:
- Admin lista pedidos com dados essenciais.
- Detalhe mostra snapshot, itens, cliente, total e histórico.
- Máquina de estados rejeita transições inválidas.
- Mudança de status registra histórico.
- Apenas ADMIN autenticado altera status.
- Pedido cancelado não volta para fluxo ativo.
- Nenhum valor financeiro histórico é recalculado/alterado.

Comandos obrigatórios de validação:
```bash
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
git status --short
```

Se algum comando não existir ainda no projeto, registre como pendência com justificativa. Não crie scripts fora do escopo da etapa apenas para mascarar ausência de validação.
````

## Prompt de revisão — Claude Code

````text
Atue como Claude Code no VS Code para revisar criticamente a implementação da etapa E10 — Pedidos admin e status feita pelo Codex.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E10-pedidos-admin-status.md
- diff atual da branch

Objetivo da revisão:
Verificar se a implementação cumpre a etapa E10 sem extrapolar escopo, sem enfraquecer segurança e sem antecipar etapas futuras.

Não implemente código nesta revisão, salvo autorização explícita do usuário. Priorize análise, apontamentos e bloqueadores.

Verifique obrigatoriamente:
- Admin lista pedidos com dados essenciais.
- Detalhe mostra snapshot, itens, cliente, total e histórico.
- Máquina de estados rejeita transições inválidas.
- Mudança de status registra histórico.
- Apenas ADMIN autenticado altera status.
- Pedido cancelado não volta para fluxo ativo.
- Nenhum valor financeiro histórico é recalculado/alterado.

Verifique também:
- arquivos alterados versus arquivos prováveis;
- ausência de alterações em arquivos proibidos;
- comandos executados e resultado;
- riscos de autenticação, autorização, dados, pedido, checkout, upload, deploy ou segurança quando aplicável;
- ausência de feature creep;
- qualidade de tipagem, validação server-side e separação de responsabilidades.

Formato da resposta:
- Veredito geral: aprovado, aprovado com ajustes ou reprovado.
- Problemas encontrados por arquivo.
- Correções obrigatórias.
- Correções recomendadas.
- Riscos remanescentes.
- Evidências dos critérios de aceite.
- Confirmação de que nenhum commit, merge, push ou deploy foi feito automaticamente.
````

## Prompt de correção — Codex

````text
Atue como Codex no VS Code para aplicar somente as correções obrigatórias apontadas na revisão da etapa E10 — Pedidos admin e status.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E10-pedidos-admin-status.md
- relatório de revisão do Claude Code

Regras obrigatórias:
- Aplique apenas correções obrigatórias da revisão.
- Não refatore por preferência pessoal.
- Não implemente etapa futura.
- Não adicione nova funcionalidade.
- Não altere arquivos proibidos, salvo se a revisão apontou correção obrigatória e justificada.
- Não faça commit, merge, push ou deploy automaticamente.

Após corrigir:
1. Liste exatamente o que foi corrigido.
2. Execute novamente os comandos obrigatórios de validação.
3. Gere relatório final com pendências e riscos remanescentes.

Comandos obrigatórios:
```bash
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
git status --short
```
````

## Prompt de auditoria final — Claude Code

````text
Atue como Claude Code no VS Code para realizar auditoria final da etapa E10 — Pedidos admin e status.

Esta auditoria é somente leitura. Não implemente código, não edite documentação, não faça commit, merge, push ou deploy.

Leia:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E10-pedidos-admin-status.md
- relatório de execução do Codex
- relatório de revisão do Claude Code
- relatório de correção do Codex, se existir
- diff final da branch

Objetivo:
Confirmar se a etapa pode ser encerrada e se está segura para avançar para a próxima etapa.

Audite:
- Admin lista pedidos com dados essenciais.
- Detalhe mostra snapshot, itens, cliente, total e histórico.
- Máquina de estados rejeita transições inválidas.
- Mudança de status registra histórico.
- Apenas ADMIN autenticado altera status.
- Pedido cancelado não volta para fluxo ativo.
- Nenhum valor financeiro histórico é recalculado/alterado.

Bloqueadores conhecidos desta etapa:
- Transição inválida aceita.
- Histórico não registrado.
- Mutação sem role ADMIN.
- Dados financeiros de pedido editáveis.
- Cancelado pode voltar para ativo.

Formato da resposta:
- Veredito final: aprovado para avançar, aprovado com ressalvas ou bloqueado.
- Evidências objetivas.
- Arquivos alterados no diff final.
- Comandos validados e resultados informados.
- Riscos remanescentes.
- Pendências para próxima etapa.
- Confirmação de ausência de aumento de escopo.
````

## Critérios de aceite

- Admin lista pedidos com dados essenciais.
- Detalhe mostra snapshot, itens, cliente, total e histórico.
- Máquina de estados rejeita transições inválidas.
- Mudança de status registra histórico.
- Apenas ADMIN autenticado altera status.
- Pedido cancelado não volta para fluxo ativo.
- Nenhum valor financeiro histórico é recalculado/alterado.

## Comandos obrigatórios de validação

```bash
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
git status --short
```

## Bloqueadores da etapa

- Transição inválida aceita.
- Histórico não registrado.
- Mutação sem role ADMIN.
- Dados financeiros de pedido editáveis.
- Cancelado pode voltar para ativo.
- Ausência de relatório final.
- Alterações em arquivos proibidos sem justificativa e revisão reforçada.

## Critérios para avançar para a próxima etapa

- Implementação ou documentação da etapa concluída.
- Revisão cruzada concluída.
- Correções obrigatórias aplicadas.
- Auditoria final aprovada.
- Comandos obrigatórios executados ou pendências justificadas.
- Relatórios salvos em `docs/ia-auditorias/`.
- Commit da etapa realizado manualmente pelo usuário ou responsável humano.

## Relatório esperado

O agente deve responder com:

- Tarefa.
- Objetivo.
- Arquivos criados/alterados/removidos.
- Decisões técnicas.
- Comandos executados.
- Resultado dos comandos.
- Testes executados.
- Pendências.
- Riscos.
- Confirmação de ausência de aumento de escopo.

