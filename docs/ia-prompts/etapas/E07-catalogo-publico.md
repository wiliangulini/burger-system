# E07 — Catálogo público

## Referência obrigatória

Antes de executar qualquer ação, leia:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- Arquivo atual da etapa: `docs/ia-prompts/etapas/E07-catalogo-publico.md`

## Correspondência no roadmap de execução

Esta etapa consolida as seguintes entradas do `roadmap-execucao-ia.md`:

- IA-06.02 — Implementar home com categorias
- IA-06.03 — Implementar listagem por categoria
- IA-06.04 — Implementar detalhe do produto

## Contexto obrigatório

- Projeto: Sistema de Hamburgueria.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Arquitetura: monolito modular, server-first, validação no servidor e separação entre área pública e admin.
- Execução: uma etapa por vez.
- MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos/status, configurações, dashboard, testes e deploy.
- Pós-MVP proibido: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.

## Objetivo da etapa

Implementar catálogo público navegável com categorias e produtos ativos, mantendo leitura server-first e sem carrinho/checkout nesta etapa.

## Pré-requisitos

E06 aprovada; categorias/produtos administráveis; layout público criado.

## Escopo permitido

- Exibir home pública com categorias ativas e destaques simples.
- Criar listagem por categoria usando slug.
- Criar detalhe de produto ativo.
- Usar Server Components para consultas de leitura quando possível.
- Usar `Next/Image` e `Next/Link`.
- Tratar produto/categoria inativos com 404 ou indisponibilidade controlada.
- Criar estados de loading, not-found e erro básico.

## Escopo proibido

- Implementar carrinho funcional.
- Implementar checkout ou pedido.
- Permitir consulta pública de produto inativo como comprável.
- Criar filtros avançados, busca sofisticada, avaliações, favoritos ou SEO avançado fora do MVP.
- Alterar CRUD admin.
- Não fazer commit, merge, push ou deploy automaticamente.

## Arquivos prováveis de alteração

- `app/(public)/page.tsx`
- `app/(public)/categoria/[slug]/page.tsx`
- `app/(public)/produto/[id]/page.tsx`
- `app/(public)/loading.tsx`
- `app/(public)/not-found.tsx`
- `components/public/**`
- `domain/catalogo/**`
- `services/catalogo/**`
- `tests/catalogo/**`

## Arquivos proibidos de alteração

- `app/admin/** exceto links mínimos já existentes`
- `app/carrinho/**`
- `app/checkout/**`
- `domain/order/**`
- `services/order/**`
- `auth.ts`
- `middleware.ts`
- `prisma/migrations/**`
- `.env`
- `.env.local`

## Prompt de execução — Codex

````text
Atue como Codex no VS Code para executar a etapa E07 — Catálogo público do Sistema de Hamburgueria.

Antes de alterar qualquer arquivo, leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E07-catalogo-publico.md

Objetivo da etapa:
Implementar catálogo público navegável com categorias e produtos ativos, mantendo leitura server-first e sem carrinho/checkout nesta etapa.

Pré-requisito da etapa:
E06 aprovada; categorias/produtos administráveis; layout público criado.

Escopo permitido:
- Exibir home pública com categorias ativas e destaques simples.
- Criar listagem por categoria usando slug.
- Criar detalhe de produto ativo.
- Usar Server Components para consultas de leitura quando possível.
- Usar `Next/Image` e `Next/Link`.
- Tratar produto/categoria inativos com 404 ou indisponibilidade controlada.
- Criar estados de loading, not-found e erro básico.

Escopo proibido:
- Implementar carrinho funcional.
- Implementar checkout ou pedido.
- Permitir consulta pública de produto inativo como comprável.
- Criar filtros avançados, busca sofisticada, avaliações, favoritos ou SEO avançado fora do MVP.
- Alterar CRUD admin.

Procedimento obrigatório:
1. Execute `git status --short` e identifique alterações pendentes.
2. Se houver arquivos alterados fora do escopo desta etapa, pare e registre o bloqueador.
3. Faça somente a menor implementação/documentação necessária para cumprir os critérios de aceite.
4. Não implemente etapa futura.
5. Não faça commit, merge, push ou deploy automaticamente.
6. Execute os comandos obrigatórios de validação listados neste arquivo.
7. Gere relatório final completo no formato exigido.

Arquivos prováveis de alteração:
- `app/(public)/page.tsx`
- `app/(public)/categoria/[slug]/page.tsx`
- `app/(public)/produto/[id]/page.tsx`
- `app/(public)/loading.tsx`
- `app/(public)/not-found.tsx`
- `components/public/**`
- `domain/catalogo/**`
- `services/catalogo/**`
- `tests/catalogo/**`

Arquivos proibidos ou sensíveis:
- `app/admin/** exceto links mínimos já existentes`
- `app/carrinho/**`
- `app/checkout/**`
- `domain/order/**`
- `services/order/**`
- `auth.ts`
- `middleware.ts`
- `prisma/migrations/**`
- `.env`
- `.env.local`

Critérios de aceite:
- Home mostra categorias/produtos ativos de forma responsiva.
- Listagem por categoria respeita slug e status ativo.
- Detalhe do produto não permite compra ainda se carrinho não estiver nesta etapa.
- Produtos inativos não aparecem como disponíveis.
- Leituras sensíveis permanecem server-side.
- Build e testes passam.

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
Atue como Claude Code no VS Code para revisar criticamente a implementação da etapa E07 — Catálogo público feita pelo Codex.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E07-catalogo-publico.md
- diff atual da branch

Objetivo da revisão:
Verificar se a implementação cumpre a etapa E07 sem extrapolar escopo, sem enfraquecer segurança e sem antecipar etapas futuras.

Não implemente código nesta revisão, salvo autorização explícita do usuário. Priorize análise, apontamentos e bloqueadores.

Verifique obrigatoriamente:
- Home mostra categorias/produtos ativos de forma responsiva.
- Listagem por categoria respeita slug e status ativo.
- Detalhe do produto não permite compra ainda se carrinho não estiver nesta etapa.
- Produtos inativos não aparecem como disponíveis.
- Leituras sensíveis permanecem server-side.
- Build e testes passam.

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
Atue como Codex no VS Code para aplicar somente as correções obrigatórias apontadas na revisão da etapa E07 — Catálogo público.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E07-catalogo-publico.md
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
Atue como Claude Code no VS Code para realizar auditoria final da etapa E07 — Catálogo público.

Esta auditoria é somente leitura. Não implemente código, não edite documentação, não faça commit, merge, push ou deploy.

Leia:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E07-catalogo-publico.md
- relatório de execução do Codex
- relatório de revisão do Claude Code
- relatório de correção do Codex, se existir
- diff final da branch

Objetivo:
Confirmar se a etapa pode ser encerrada e se está segura para avançar para a próxima etapa.

Audite:
- Home mostra categorias/produtos ativos de forma responsiva.
- Listagem por categoria respeita slug e status ativo.
- Detalhe do produto não permite compra ainda se carrinho não estiver nesta etapa.
- Produtos inativos não aparecem como disponíveis.
- Leituras sensíveis permanecem server-side.
- Build e testes passam.

Bloqueadores conhecidos desta etapa:
- Produto inativo visível como comprável.
- Carrinho/checkout antecipado.
- Erro de renderização em rotas dinâmicas.
- Consultas client-side desnecessárias para dados públicos estáticos.

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

- Home mostra categorias/produtos ativos de forma responsiva.
- Listagem por categoria respeita slug e status ativo.
- Detalhe do produto não permite compra ainda se carrinho não estiver nesta etapa.
- Produtos inativos não aparecem como disponíveis.
- Leituras sensíveis permanecem server-side.
- Build e testes passam.

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

- Produto inativo visível como comprável.
- Carrinho/checkout antecipado.
- Erro de renderização em rotas dinâmicas.
- Consultas client-side desnecessárias para dados públicos estáticos.
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

