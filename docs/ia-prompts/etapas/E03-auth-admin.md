# E03 — Auth admin

## Referência obrigatória

Antes de executar qualquer ação, leia:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- Arquivo atual da etapa: `docs/ia-prompts/etapas/E03-auth-admin.md`

## Correspondência no roadmap de execução

Esta etapa consolida as seguintes entradas do `roadmap-execucao-ia.md`:

- IA-03.01 — Configurar Auth.js/NextAuth
- IA-03.02 — Proteger rotas `/admin/*`
- IA-03.03 — Criar layout administrativo

## Contexto obrigatório

- Projeto: Sistema de Hamburgueria.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Arquitetura: monolito modular, server-first, validação no servidor e separação entre área pública e admin.
- Execução: uma etapa por vez.
- MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos/status, configurações, dashboard, testes e deploy.
- Pós-MVP proibido: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.

## Objetivo da etapa

Implementar autenticação administrativa com Auth.js, sessão segura, autorização inicial exclusiva para `OWNER` e proteção server-side da área `/admin/*`.

## Pré-requisitos

E02 aprovada; model de Usuario/Admin e roles criado; seed local seguro disponível; variáveis de Auth.js definidas fora do repositório.

## Escopo permitido

- Configurar Auth.js/NextAuth com Credentials Provider.
- Validar credenciais no servidor.
- Comparar senha com bcrypt/argon2.
- Incluir a role canônica `OWNER` na sessão de forma tipada e segura.
- Proteger `/admin/*` por middleware ou checagem server-side equivalente.
- Criar `/admin/login`, logout e layout administrativo mínimo.
- Criar testes mínimos de autenticação/autorização quando possível.

## Escopo proibido

- Login de cliente, login social, cadastro público ou recuperação de senha completa.
- Proteger admin apenas por UI.
- Expor senha, token, stack trace ou motivo detalhado de falha de login.
- Tratar autenticação como autorização global ou ignorar a matriz RBAC nas mutações futuras.
- Alterar schema de pedidos/checkout fora de necessidade documentada.
- Não fazer commit, merge, push ou deploy automaticamente.

## Arquivos prováveis de alteração

- `auth.ts`
- `middleware.ts`
- `lib/auth/**`
- `types/next-auth.d.ts`
- `app/admin/login/page.tsx`
- `app/admin/layout.tsx`
- `app/admin/page.tsx`
- `app/api/auth/[...nextauth]/route.ts`
- `components/admin/**`
- `.env.example`
- `package.json`
- `tests/auth/**`

## Arquivos proibidos de alteração

- `prisma/migrations/** exceto correção indispensável e justificada`
- `prisma/schema.prisma exceto ajuste tipado indispensável`
- `app/(public)/**`
- `components/cart/**`
- `domain/order/**`
- `services/order/**`
- `public/uploads/**`
- `.env`
- `.env.local`

## Prompt de execução — Codex

````text
Atue como Codex no VS Code para executar a etapa E03 — Auth admin do Sistema de Hamburgueria.

Antes de alterar qualquer arquivo, leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E03-auth-admin.md

Objetivo da etapa:
Implementar autenticação administrativa com Auth.js, sessão segura, autorização inicial exclusiva para `OWNER` e proteção server-side da área `/admin/*`.

Pré-requisito da etapa:
E02 aprovada; model de Usuario/Admin e roles criado; seed local seguro disponível; variáveis de Auth.js definidas fora do repositório.

Escopo permitido:
- Configurar Auth.js/NextAuth com Credentials Provider.
- Validar credenciais no servidor.
- Comparar senha com bcrypt/argon2.
- Incluir a role canônica `OWNER` na sessão de forma tipada e segura.
- Proteger `/admin/*` por middleware ou checagem server-side equivalente.
- Criar `/admin/login`, logout e layout administrativo mínimo.
- Criar testes mínimos de autenticação/autorização quando possível.

Escopo proibido:
- Login de cliente, login social, cadastro público ou recuperação de senha completa.
- Proteger admin apenas por UI.
- Expor senha, token, stack trace ou motivo detalhado de falha de login.
- Tratar autenticação como autorização global ou ignorar a matriz RBAC nas mutações futuras.
- Alterar schema de pedidos/checkout fora de necessidade documentada.

Procedimento obrigatório:
1. Execute `git status --short` e identifique alterações pendentes.
2. Se houver arquivos alterados fora do escopo desta etapa, pare e registre o bloqueador.
3. Faça somente a menor implementação/documentação necessária para cumprir os critérios de aceite.
4. Não implemente etapa futura.
5. Não faça commit, merge, push ou deploy automaticamente.
6. Execute os comandos obrigatórios de validação listados neste arquivo.
7. Gere relatório final completo no formato exigido.

Arquivos prováveis de alteração:
- `auth.ts`
- `middleware.ts`
- `lib/auth/**`
- `types/next-auth.d.ts`
- `app/admin/login/page.tsx`
- `app/admin/layout.tsx`
- `app/admin/page.tsx`
- `app/api/auth/[...nextauth]/route.ts`
- `components/admin/**`
- `.env.example`
- `package.json`
- `tests/auth/**`

Arquivos proibidos ou sensíveis:
- `prisma/migrations/** exceto correção indispensável e justificada`
- `prisma/schema.prisma exceto ajuste tipado indispensável`
- `app/(public)/**`
- `components/cart/**`
- `domain/order/**`
- `services/order/**`
- `public/uploads/**`
- `.env`
- `.env.local`

Critérios de aceite:
- Login admin funciona com credenciais válidas.
- Credenciais inválidas falham sem vazamento de detalhe sensível.
- Senha é verificada por hash forte.
- Sessão inclui role de forma tipada.
- Usuário sem sessão ou sem role `OWNER` não acessa `/admin/*` nesta etapa.
- Rotas admin não dependem apenas de ocultação visual.
- Logout funciona.
- Build, typecheck e testes passam.

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
Atue como Claude Code no VS Code para revisar criticamente a implementação da etapa E03 — Auth admin feita pelo Codex.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E03-auth-admin.md
- diff atual da branch

Objetivo da revisão:
Verificar se a implementação cumpre a etapa E03 sem extrapolar escopo, sem enfraquecer segurança e sem antecipar etapas futuras.

Não implemente código nesta revisão, salvo autorização explícita do usuário. Priorize análise, apontamentos e bloqueadores.

A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E03-auth-admin-revisao.md`; esse deve ser o único arquivo modificado pela revisão.

Verifique obrigatoriamente:
- Login admin funciona com credenciais válidas.
- Credenciais inválidas falham sem vazamento de detalhe sensível.
- Senha é verificada por hash forte.
- Sessão inclui role de forma tipada.
- Usuário sem sessão ou sem role `OWNER` não acessa `/admin/*` nesta etapa.
- Rotas admin não dependem apenas de ocultação visual.
- Logout funciona.
- Build, typecheck e testes passam.

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
Atue como Codex no VS Code para aplicar somente as correções obrigatórias apontadas na revisão da etapa E03 — Auth admin.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E03-auth-admin.md
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
Atue como Claude Code no VS Code para realizar auditoria final da etapa E03 — Auth admin.

Esta auditoria é somente leitura quanto à implementação e aos documentos do produto. Não implemente nem altere código, configurações, schema, migrations, testes, prompts ou documentação funcional. A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E03-auth-admin-auditoria-final.md`, que deve ser o único arquivo modificado pela auditoria.

Use `docs/ia-auditorias/TEMPLATE-agent-report.md`. Fundamente cada conclusão em arquivo, diff ou comando verificável; identifique os arquivos analisados; separe comandos reexecutados de resultados apenas registrados em relatórios anteriores; não declare validação executada ou aprovada sem evidência. Não faça commit, merge, push ou deploy.

Leia:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E03-auth-admin.md
- relatório de execução do Codex
- relatório de revisão do Claude Code
- relatório de correção do Codex, se existir
- diff final da branch

Objetivo:
Confirmar se a etapa pode ser encerrada e se está segura para avançar para a próxima etapa.

Audite:
- Login admin funciona com credenciais válidas.
- Credenciais inválidas falham sem vazamento de detalhe sensível.
- Senha é verificada por hash forte.
- Sessão inclui role de forma tipada.
- Usuário sem sessão ou sem role `OWNER` não acessa `/admin/*` nesta etapa.
- Rotas admin não dependem apenas de ocultação visual.
- Logout funciona.
- Build, typecheck e testes passam.

Bloqueadores conhecidos desta etapa:
- Bypass de `/admin/*` sem sessão/role.
- Senha em texto puro.
- AUTH_SECRET ou segredo versionado.
- Type augmentation de sessão quebrada.
- Erros de autenticação expostos ao usuário.

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

- Login admin funciona com credenciais válidas.
- Credenciais inválidas falham sem vazamento de detalhe sensível.
- Senha é verificada por hash forte.
- Sessão inclui role de forma tipada.
- Usuário sem sessão ou sem role `OWNER` não acessa `/admin/*` nesta etapa.
- Rotas admin não dependem apenas de ocultação visual.
- Logout funciona.
- Build, typecheck e testes passam.

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

- Bypass de `/admin/*` sem sessão/role.
- Senha em texto puro.
- AUTH_SECRET ou segredo versionado.
- Type augmentation de sessão quebrada.
- Erros de autenticação expostos ao usuário.
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
