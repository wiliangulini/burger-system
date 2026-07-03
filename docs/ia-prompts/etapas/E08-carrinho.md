# E08 — Carrinho

## Referência obrigatória

Antes de executar qualquer ação, leia:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- Arquivo atual da etapa: `docs/ia-prompts/etapas/E08-carrinho.md`

## Correspondência no roadmap de execução

Esta etapa consolida as seguintes entradas do `roadmap-execucao-ia.md`:

- IA-07.01 — Criar modelo de estado do carrinho
- IA-07.02 — Criar página `/carrinho`

## Contexto obrigatório

- Projeto: Sistema de Hamburgueria.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Arquitetura: monolito modular, server-first, validação no servidor e separação entre área pública e admin.
- Execução: uma etapa por vez.
- MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos/status, configurações, dashboard, testes e deploy.
- Pós-MVP proibido: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.

## Objetivo da etapa

Implementar carrinho client-side sem login, com persistência local e preparação segura para checkout futuro.

## Pré-requisitos

E07 aprovada; catálogo público funcional; produtos ativos exibidos corretamente.

## Escopo permitido

- Criar modelo tipado de item de carrinho.
- Criar store/hook/context client-side para carrinho.
- Persistir carrinho em `localStorage` com validação defensiva.
- Adicionar/remover/alterar quantidade de produtos ativos.
- Criar página `/carrinho` com resumo local e CTA para checkout futuro.
- Exibir preços apenas como prévia, deixando claro que servidor recalculará no checkout.
- Criar testes unitários da lógica do carrinho quando possível.

## Escopo proibido

- Persistir carrinho no banco.
- Criar pedido.
- Confiar em preço do cliente como fonte definitiva.
- Implementar login de cliente.
- Implementar checkout nesta etapa.
- Criar cupons, adicionais complexos, frete dinâmico ou promoções.
- Não fazer commit, merge, push ou deploy automaticamente.

## Arquivos prováveis de alteração

- `app/(public)/carrinho/page.tsx`
- `components/cart/**`
- `lib/cart/**`
- `domain/cart/**`
- `stores/cart/**`
- `hooks/use-cart.*`
- `tests/cart/**`

## Arquivos proibidos de alteração

- `prisma/**`
- `app/checkout/**`
- `domain/order/**`
- `services/order/**`
- `app/api/orders/**`
- `app/admin/**`
- `auth.ts`
- `middleware.ts`
- `.env`
- `.env.local`

## Prompt de execução — Codex

````text
Atue como Codex no VS Code para executar a etapa E08 — Carrinho do Sistema de Hamburgueria.

Antes de alterar qualquer arquivo, leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E08-carrinho.md

Objetivo da etapa:
Implementar carrinho client-side sem login, com persistência local e preparação segura para checkout futuro.

Pré-requisito da etapa:
E07 aprovada; catálogo público funcional; produtos ativos exibidos corretamente.

Escopo permitido:
- Criar modelo tipado de item de carrinho.
- Criar store/hook/context client-side para carrinho.
- Persistir carrinho em `localStorage` com validação defensiva.
- Adicionar/remover/alterar quantidade de produtos ativos.
- Criar página `/carrinho` com resumo local e CTA para checkout futuro.
- Exibir preços apenas como prévia, deixando claro que servidor recalculará no checkout.
- Criar testes unitários da lógica do carrinho quando possível.

Escopo proibido:
- Persistir carrinho no banco.
- Criar pedido.
- Confiar em preço do cliente como fonte definitiva.
- Implementar login de cliente.
- Implementar checkout nesta etapa.
- Criar cupons, adicionais complexos, frete dinâmico ou promoções.

Procedimento obrigatório:
1. Execute `git status --short` e identifique alterações pendentes.
2. Se houver arquivos alterados fora do escopo desta etapa, pare e registre o bloqueador.
3. Faça somente a menor implementação/documentação necessária para cumprir os critérios de aceite.
4. Não implemente etapa futura.
5. Não faça commit, merge, push ou deploy automaticamente.
6. Execute os comandos obrigatórios de validação listados neste arquivo.
7. Gere relatório final completo no formato exigido.

Arquivos prováveis de alteração:
- `app/(public)/carrinho/page.tsx`
- `components/cart/**`
- `lib/cart/**`
- `domain/cart/**`
- `stores/cart/**`
- `hooks/use-cart.*`
- `tests/cart/**`

Arquivos proibidos ou sensíveis:
- `prisma/**`
- `app/checkout/**`
- `domain/order/**`
- `services/order/**`
- `app/api/orders/**`
- `app/admin/**`
- `auth.ts`
- `middleware.ts`
- `.env`
- `.env.local`

Critérios de aceite:
- Usuário consegue adicionar, remover e alterar quantidade no carrinho.
- Carrinho persiste no navegador.
- Dados inválidos em localStorage são tratados sem quebrar a aplicação.
- Preço exibido é prévia e não fonte da verdade.
- Nenhum pedido é criado nesta etapa.
- Sem login de cliente.

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
Atue como Claude Code no VS Code para revisar criticamente a implementação da etapa E08 — Carrinho feita pelo Codex.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E08-carrinho.md
- diff atual da branch

Objetivo da revisão:
Verificar se a implementação cumpre a etapa E08 sem extrapolar escopo, sem enfraquecer segurança e sem antecipar etapas futuras.

Não implemente código nesta revisão, salvo autorização explícita do usuário. Priorize análise, apontamentos e bloqueadores.

A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E08-carrinho-revisao.md`; esse deve ser o único arquivo modificado pela revisão.

Verifique obrigatoriamente:
- Usuário consegue adicionar, remover e alterar quantidade no carrinho.
- Carrinho persiste no navegador.
- Dados inválidos em localStorage são tratados sem quebrar a aplicação.
- Preço exibido é prévia e não fonte da verdade.
- Nenhum pedido é criado nesta etapa.
- Sem login de cliente.

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
Atue como Codex no VS Code para aplicar somente as correções obrigatórias apontadas na revisão da etapa E08 — Carrinho.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E08-carrinho.md
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
Atue como Claude Code no VS Code para realizar auditoria final da etapa E08 — Carrinho.

Esta auditoria é somente leitura quanto à implementação e aos documentos do produto. Não implemente nem altere código, configurações, schema, migrations, testes, prompts ou documentação funcional. A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E08-carrinho-auditoria-final.md`, que deve ser o único arquivo modificado pela auditoria.

Use `docs/ia-auditorias/TEMPLATE-agent-report.md`. Fundamente cada conclusão em arquivo, diff ou comando verificável; identifique os arquivos analisados; separe comandos reexecutados de resultados apenas registrados em relatórios anteriores; não declare validação executada ou aprovada sem evidência. Não faça commit, merge, push ou deploy.

Leia:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E08-carrinho.md
- relatório de execução do Codex
- relatório de revisão do Claude Code
- relatório de correção do Codex, se existir
- diff final da branch

Objetivo:
Confirmar se a etapa pode ser encerrada e se está segura para avançar para a próxima etapa.

Audite:
- Usuário consegue adicionar, remover e alterar quantidade no carrinho.
- Carrinho persiste no navegador.
- Dados inválidos em localStorage são tratados sem quebrar a aplicação.
- Preço exibido é prévia e não fonte da verdade.
- Nenhum pedido é criado nesta etapa.
- Sem login de cliente.

Bloqueadores conhecidos desta etapa:
- Pedido criado prematuramente.
- Preço do carrinho tratado como definitivo.
- Carrinho quebrando SSR/hydration.
- Dependência de banco para carrinho.

Formato da resposta:
- Veredito final: aprovado para avançar, aprovado com ressalvas ou bloqueado.
- Evidências objetivas.
- Arquivos alterados no diff final.
- Comandos validados e resultados informados.
- Validações reexecutadas separadas das evidências históricas.
- Riscos remanescentes.
- Pendências para próxima etapa.
- Confirmação de ausência de aumento de escopo.
- Status final: Aprovado, Aprovado com observações, Requer ajustes ou Bloqueado.
````

## Critérios de aceite

- Usuário consegue adicionar, remover e alterar quantidade no carrinho.
- Carrinho persiste no navegador.
- Dados inválidos em localStorage são tratados sem quebrar a aplicação.
- Preço exibido é prévia e não fonte da verdade.
- Nenhum pedido é criado nesta etapa.
- Sem login de cliente.

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

- Pedido criado prematuramente.
- Preço do carrinho tratado como definitivo.
- Carrinho quebrando SSR/hydration.
- Dependência de banco para carrinho.
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
