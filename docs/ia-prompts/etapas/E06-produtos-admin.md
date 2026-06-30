# E06 — Produtos admin

## Referência obrigatória

Antes de executar qualquer ação, leia:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- Arquivo atual da etapa: `docs/ia-prompts/etapas/E06-produtos-admin.md`

## Correspondência no roadmap de execução

Esta etapa consolida as seguintes entradas do `roadmap-execucao-ia.md`:

- IA-05.01 — Criar validação e serviço de produtos
- IA-05.02 — Implementar CRUD de produtos sem upload
- IA-05.03 — Implementar upload seguro de imagens

## Contexto obrigatório

- Projeto: Sistema de Hamburgueria.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Arquitetura: monolito modular, server-first, validação no servidor e separação entre área pública e admin.
- Execução: uma etapa por vez.
- MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos/status, configurações, dashboard, testes e deploy.
- Pós-MVP proibido: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.

## Objetivo da etapa

Implementar gerenciamento administrativo de produtos, incluindo validação server-side e upload seguro de imagens.

## Pré-requisitos

E05 aprovada; CRUD de categorias funcionando; Produto modelado; admin protegido.

## Escopo permitido

- Criar schema Zod para produto.
- Criar serviço/server actions/route handlers de produto.
- Criar telas admin para listar, criar, editar, ativar/inativar e excluir produtos quando seguro.
- Associar produto a categoria existente.
- Validar preço, estoque, categoria, ativo e campos textuais no servidor.
- Implementar upload seguro PNG/JPEG com limite de tamanho, validação MIME/extensão e nome seguro.
- Armazenar caminho de imagem permitido no produto.
- Adicionar testes mínimos de validação, serviço e upload.

## Escopo proibido

- Checkout, carrinho ou decremento real de estoque no pedido.
- Upload de qualquer tipo de arquivo.
- Armazenar caminho arbitrário enviado pelo cliente.
- Permitir produto sem categoria válida.
- Usar Float para preço.
- Implementar catálogo público além de ajustes necessários para não quebrar build.
- Não fazer commit, merge, push ou deploy automaticamente.

## Arquivos prováveis de alteração

- `app/admin/produtos/**`
- `components/admin/produtos/**`
- `lib/validations/produto.*`
- `domain/produtos/**`
- `services/produtos/**`
- `app/api/admin/produtos/**`
- `app/api/admin/uploads/**`
- `lib/uploads/**`
- `public/uploads/**`
- `tests/produtos/**`
- `tests/uploads/**`

## Arquivos proibidos de alteração

- `prisma/schema.prisma exceto correção indispensável e justificada`
- `prisma/migrations/**`
- `app/checkout/**`
- `app/carrinho/**`
- `domain/order/**`
- `services/order/**`
- `auth.ts`
- `middleware.ts`
- `.env`
- `.env.local`

## Prompt de execução — Codex

````text
Atue como Codex no VS Code para executar a etapa E06 — Produtos admin do Sistema de Hamburgueria.

Antes de alterar qualquer arquivo, leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E06-produtos-admin.md

Objetivo da etapa:
Implementar gerenciamento administrativo de produtos, incluindo validação server-side e upload seguro de imagens.

Pré-requisito da etapa:
E05 aprovada; CRUD de categorias funcionando; Produto modelado; admin protegido.

Escopo permitido:
- Criar schema Zod para produto.
- Criar serviço/server actions/route handlers de produto.
- Criar telas admin para listar, criar, editar, ativar/inativar e excluir produtos quando seguro.
- Associar produto a categoria existente.
- Validar preço, estoque, categoria, ativo e campos textuais no servidor.
- Implementar upload seguro PNG/JPEG com limite de tamanho, validação MIME/extensão e nome seguro.
- Armazenar caminho de imagem permitido no produto.
- Adicionar testes mínimos de validação, serviço e upload.

Escopo proibido:
- Checkout, carrinho ou decremento real de estoque no pedido.
- Upload de qualquer tipo de arquivo.
- Armazenar caminho arbitrário enviado pelo cliente.
- Permitir produto sem categoria válida.
- Usar Float para preço.
- Implementar catálogo público além de ajustes necessários para não quebrar build.

Procedimento obrigatório:
1. Execute `git status --short` e identifique alterações pendentes.
2. Se houver arquivos alterados fora do escopo desta etapa, pare e registre o bloqueador.
3. Faça somente a menor implementação/documentação necessária para cumprir os critérios de aceite.
4. Não implemente etapa futura.
5. Não faça commit, merge, push ou deploy automaticamente.
6. Execute os comandos obrigatórios de validação listados neste arquivo.
7. Gere relatório final completo no formato exigido.

Arquivos prováveis de alteração:
- `app/admin/produtos/**`
- `components/admin/produtos/**`
- `lib/validations/produto.*`
- `domain/produtos/**`
- `services/produtos/**`
- `app/api/admin/produtos/**`
- `app/api/admin/uploads/**`
- `lib/uploads/**`
- `public/uploads/**`
- `tests/produtos/**`
- `tests/uploads/**`

Arquivos proibidos ou sensíveis:
- `prisma/schema.prisma exceto correção indispensável e justificada`
- `prisma/migrations/**`
- `app/checkout/**`
- `app/carrinho/**`
- `domain/order/**`
- `services/order/**`
- `auth.ts`
- `middleware.ts`
- `.env`
- `.env.local`

Critérios de aceite:
- CRUD de produtos funciona apenas para ADMIN autenticado.
- Produto sempre pertence a categoria válida.
- Preço é tratado de forma compatível com Decimal.
- Upload aceita somente PNG/JPEG dentro do limite definido.
- Nome de arquivo é gerado de forma segura.
- Erros de upload não expõem stack trace.
- Produto inativo não deve ser preparado para aparecer no catálogo público futuro.

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
Atue como Claude Code no VS Code para revisar criticamente a implementação da etapa E06 — Produtos admin feita pelo Codex.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E06-produtos-admin.md
- diff atual da branch

Objetivo da revisão:
Verificar se a implementação cumpre a etapa E06 sem extrapolar escopo, sem enfraquecer segurança e sem antecipar etapas futuras.

Não implemente código nesta revisão, salvo autorização explícita do usuário. Priorize análise, apontamentos e bloqueadores.

Verifique obrigatoriamente:
- CRUD de produtos funciona apenas para ADMIN autenticado.
- Produto sempre pertence a categoria válida.
- Preço é tratado de forma compatível com Decimal.
- Upload aceita somente PNG/JPEG dentro do limite definido.
- Nome de arquivo é gerado de forma segura.
- Erros de upload não expõem stack trace.
- Produto inativo não deve ser preparado para aparecer no catálogo público futuro.

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
Atue como Codex no VS Code para aplicar somente as correções obrigatórias apontadas na revisão da etapa E06 — Produtos admin.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E06-produtos-admin.md
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
Atue como Claude Code no VS Code para realizar auditoria final da etapa E06 — Produtos admin.

Esta auditoria é somente leitura. Não implemente código, não edite documentação, não faça commit, merge, push ou deploy.

Leia:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E06-produtos-admin.md
- relatório de execução do Codex
- relatório de revisão do Claude Code
- relatório de correção do Codex, se existir
- diff final da branch

Objetivo:
Confirmar se a etapa pode ser encerrada e se está segura para avançar para a próxima etapa.

Audite:
- CRUD de produtos funciona apenas para ADMIN autenticado.
- Produto sempre pertence a categoria válida.
- Preço é tratado de forma compatível com Decimal.
- Upload aceita somente PNG/JPEG dentro do limite definido.
- Nome de arquivo é gerado de forma segura.
- Erros de upload não expõem stack trace.
- Produto inativo não deve ser preparado para aparecer no catálogo público futuro.

Bloqueadores conhecidos desta etapa:
- Upload inseguro.
- Mutação sem role ADMIN.
- Preço tratado como Float.
- Path traversal ou extensão/MIME sem validação.
- Produto sem categoria válida.

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

- CRUD de produtos funciona apenas para ADMIN autenticado.
- Produto sempre pertence a categoria válida.
- Preço é tratado de forma compatível com Decimal.
- Upload aceita somente PNG/JPEG dentro do limite definido.
- Nome de arquivo é gerado de forma segura.
- Erros de upload não expõem stack trace.
- Produto inativo não deve ser preparado para aparecer no catálogo público futuro.

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

- Upload inseguro.
- Mutação sem role ADMIN.
- Preço tratado como Float.
- Path traversal ou extensão/MIME sem validação.
- Produto sem categoria válida.
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

