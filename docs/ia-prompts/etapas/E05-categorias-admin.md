# E05 — Categorias admin

## Referência obrigatória

Antes de executar qualquer ação, leia:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- Arquivo atual da etapa: `docs/ia-prompts/etapas/E05-categorias-admin.md`

## Correspondência no roadmap de execução

Esta etapa consolida as seguintes entradas do `roadmap-execucao-ia.md`:

- IA-04.01 — Criar camada de validação de categoria
- IA-04.02 — Implementar CRUD de categorias no admin

## Contexto obrigatório

- Projeto: Sistema de Hamburgueria.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Arquitetura: monolito modular, server-first, validação no servidor e separação entre área pública e admin.
- Execução: uma etapa por vez.
- MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos/status, configurações, dashboard, testes e deploy.
- Pós-MVP proibido: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.

## Objetivo da etapa

Implementar gerenciamento administrativo de categorias com validação server-side e autorização para `OWNER` ou `MANAGER`.

## Pré-requisitos

E04 aprovada; Auth admin funcionando; Prisma com Categoria modelada.

## Escopo permitido

- Criar schema Zod para categoria.
- Criar serviço/server actions/route handlers para CRUD de categorias.
- Criar telas admin de listagem, criação, edição e exclusão/inativação de categoria.
- Validar nome, slug, ativo e unicidade conforme schema.
- Revalidar cache público relacionado quando necessário.
- Adicionar testes mínimos de validação e serviço.

## Escopo proibido

- CRUD de produtos.
- Catálogo público completo.
- Upload de imagens.
- Alterar autenticação, checkout ou modelo de pedido.
- Permitir mutação de categoria sem sessão ou sem role `OWNER`/`MANAGER`.
- Excluir categoria com produtos/pedidos sem regra segura.
- Não fazer commit, merge, push ou deploy automaticamente.

## Arquivos prováveis de alteração

- `app/admin/categorias/**`
- `components/admin/categorias/**`
- `lib/validations/categoria.*`
- `domain/categorias/**`
- `services/categorias/**`
- `app/api/admin/categorias/**`
- `tests/categorias/**`

## Arquivos proibidos de alteração

- `prisma/schema.prisma exceto correção indispensável e justificada`
- `prisma/migrations/**`
- `app/(public)/** exceto revalidação mínima se existir`
- `app/admin/produtos/**`
- `components/admin/produtos/**`
- `components/cart/**`
- `app/checkout/**`
- `domain/order/**`
- `auth.ts`
- `middleware.ts`
- `.env`
- `.env.local`

## Prompt de execução — Codex

````text
Atue como Codex no VS Code para executar a etapa E05 — Categorias admin do Sistema de Hamburgueria.

Antes de alterar qualquer arquivo, leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E05-categorias-admin.md

Objetivo da etapa:
Implementar gerenciamento administrativo de categorias com validação server-side e autorização para `OWNER` ou `MANAGER`.

Pré-requisito da etapa:
E04 aprovada; Auth admin funcionando; Prisma com Categoria modelada.

Escopo permitido:
- Criar schema Zod para categoria.
- Criar serviço/server actions/route handlers para CRUD de categorias.
- Criar telas admin de listagem, criação, edição e exclusão/inativação de categoria.
- Validar nome, slug, ativo e unicidade conforme schema.
- Revalidar cache público relacionado quando necessário.
- Adicionar testes mínimos de validação e serviço.

Escopo proibido:
- CRUD de produtos.
- Catálogo público completo.
- Upload de imagens.
- Alterar autenticação, checkout ou modelo de pedido.
- Permitir mutação de categoria sem sessão ou sem role `OWNER`/`MANAGER`.
- Excluir categoria com produtos/pedidos sem regra segura.

Procedimento obrigatório:
1. Execute `git status --short` e identifique alterações pendentes.
2. Se houver arquivos alterados fora do escopo desta etapa, pare e registre o bloqueador.
3. Faça somente a menor implementação/documentação necessária para cumprir os critérios de aceite.
4. Não implemente etapa futura.
5. Não faça commit, merge, push ou deploy automaticamente.
6. Execute os comandos obrigatórios de validação listados neste arquivo.
7. Gere relatório final completo no formato exigido.

Arquivos prováveis de alteração:
- `app/admin/categorias/**`
- `components/admin/categorias/**`
- `lib/validations/categoria.*`
- `domain/categorias/**`
- `services/categorias/**`
- `app/api/admin/categorias/**`
- `tests/categorias/**`

Arquivos proibidos ou sensíveis:
- `prisma/schema.prisma exceto correção indispensável e justificada`
- `prisma/migrations/**`
- `app/(public)/** exceto revalidação mínima se existir`
- `app/admin/produtos/**`
- `components/admin/produtos/**`
- `components/cart/**`
- `app/checkout/**`
- `domain/order/**`
- `auth.ts`
- `middleware.ts`
- `.env`
- `.env.local`

Critérios de aceite:
- CRUD de categorias funciona apenas para `OWNER` ou `MANAGER` autenticado.
- Dados são validados no servidor.
- Slug/nome duplicados são rejeitados ou tratados com erro claro.
- Não há mutação baseada apenas no client.
- Exclusão/inativação respeita integridade referencial.
- Relatório lista qualquer decisão sobre delete vs inativação.

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
Atue como Claude Code no VS Code para revisar criticamente a implementação da etapa E05 — Categorias admin feita pelo Codex.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E05-categorias-admin.md
- diff atual da branch

Objetivo da revisão:
Verificar se a implementação cumpre a etapa E05 sem extrapolar escopo, sem enfraquecer segurança e sem antecipar etapas futuras.

Não implemente código nesta revisão, salvo autorização explícita do usuário. Priorize análise, apontamentos e bloqueadores.

A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E05-categorias-admin-revisao.md`; esse deve ser o único arquivo modificado pela revisão.

Verifique obrigatoriamente:
- CRUD de categorias funciona apenas para `OWNER` ou `MANAGER` autenticado.
- Dados são validados no servidor.
- Slug/nome duplicados são rejeitados ou tratados com erro claro.
- Não há mutação baseada apenas no client.
- Exclusão/inativação respeita integridade referencial.
- Relatório lista qualquer decisão sobre delete vs inativação.

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
Atue como Codex no VS Code para aplicar somente as correções obrigatórias apontadas na revisão da etapa E05 — Categorias admin.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E05-categorias-admin.md
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
Atue como Claude Code no VS Code para realizar auditoria final da etapa E05 — Categorias admin.

Esta auditoria é somente leitura quanto à implementação e aos documentos do produto. Não implemente nem altere código, configurações, schema, migrations, testes, prompts ou documentação funcional. A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E05-categorias-admin-auditoria-final.md`, que deve ser o único arquivo modificado pela auditoria.

Use `docs/ia-auditorias/TEMPLATE-agent-report.md`. Fundamente cada conclusão em arquivo, diff ou comando verificável; identifique os arquivos analisados; separe comandos reexecutados de resultados apenas registrados em relatórios anteriores; não declare validação executada ou aprovada sem evidência. Não faça commit, merge, push ou deploy.

Leia:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E05-categorias-admin.md
- relatório de execução do Codex
- relatório de revisão do Claude Code
- relatório de correção do Codex, se existir
- diff final da branch

Objetivo:
Confirmar se a etapa pode ser encerrada e se está segura para avançar para a próxima etapa.

Audite:
- CRUD de categorias funciona apenas para `OWNER` ou `MANAGER` autenticado.
- Dados são validados no servidor.
- Slug/nome duplicados são rejeitados ou tratados com erro claro.
- Não há mutação baseada apenas no client.
- Exclusão/inativação respeita integridade referencial.
- Relatório lista qualquer decisão sobre delete vs inativação.

Bloqueadores conhecidos desta etapa:
- Mutação sem proteção admin.
- Validação apenas no cliente.
- Alteração indevida do schema.
- Categoria duplicada aceita.
- Delete inseguro que quebra relacionamento futuro.

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

- CRUD de categorias funciona apenas para `OWNER` ou `MANAGER` autenticado.
- Dados são validados no servidor.
- Slug/nome duplicados são rejeitados ou tratados com erro claro.
- Não há mutação baseada apenas no client.
- Exclusão/inativação respeita integridade referencial.
- Relatório lista qualquer decisão sobre delete vs inativação.

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

- Mutação sem proteção admin.
- Validação apenas no cliente.
- Alteração indevida do schema.
- Categoria duplicada aceita.
- Delete inseguro que quebra relacionamento futuro.
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
