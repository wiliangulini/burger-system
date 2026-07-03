# E12c — Deploy e auditoria final

## Referência obrigatória

Antes de executar qualquer ação, leia:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- Arquivo atual da etapa: `docs/ia-prompts/etapas/E12c-deploy-auditoria.md`

## Correspondência no roadmap de execução

Esta etapa consolida as seguintes entradas do `roadmap-execucao-ia.md`:

- IA-15.01 — Preparar variáveis de ambiente
- IA-15.02 — Configurar banco de produção
- IA-15.03 — Deploy na Vercel
- IA-15.04 — Health check e smoke test
- IA-16.01 — Auditoria funcional
- IA-16.02 — Auditoria técnica
- IA-16.03 — Auditoria de arquitetura

## Contexto obrigatório

- Projeto: Sistema de Hamburgueria.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Arquitetura: monolito modular, server-first, validação no servidor e separação entre área pública e admin.
- Execução: uma etapa por vez.
- MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos/status, configurações, dashboard, testes e deploy.
- Pós-MVP proibido: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.

## Objetivo da etapa

Preparar o ambiente de produção, documentar variáveis de ambiente, executar o deploy (ação humana com gate explícito), realizar smoke test e gerar a auditoria final do MVP.

## Pré-requisitos

E12b aprovada; todos os testes passando; CI funcionando; variáveis reais de produção disponíveis fora do repositório.

## Escopo do agente (Codex/Claude)

O agente **não executa** deploy, `prisma migrate deploy` em produção, push para Vercel ou qualquer ação destrutiva em ambiente compartilhado. O escopo do agente é:

- Revisar e atualizar `.env.example` com todas as variáveis necessárias (sem valores reais).
- Criar ou atualizar `docs/deploy.md` com checklist detalhado para o responsável humano executar.
- Executar `npm run build` localmente para confirmar que o build de produção passa.
- Executar `npx prisma migrate status` para verificar estado local.
- Gerar a auditoria final (funcional, técnica e arquitetural) como documento em `docs/ia-auditorias/`.

**O deploy é ação exclusivamente humana.** O agente documenta e verifica — não executa.

## Escopo proibido

- Executar deploy, push para Vercel ou qualquer ação no ambiente de produção.
- Executar `prisma migrate deploy` ou `prisma migrate reset` sem autorização explícita e confirmação de ambiente.
- Versionar `.env`, `.env.local`, `.env.production` ou qualquer secret real.
- Criar features novas.
- Alterar schema, checkout, auth ou lógica de pedido sem motivo crítico documentado.
- Não fazer commit, merge, push ou deploy automaticamente.

## Arquivos prováveis de alteração

- `.env.example`
- `docs/deploy.md`
- `docs/auditoria-final-mvp.md`
- `vercel.json` (somente configuração, sem secrets)

## Arquivos proibidos de alteração

- `prisma/schema.prisma` (salvo correção crítica aprovada)
- `prisma/migrations/**`
- `domain/order/**`
- `services/order/**`
- `lib/auth/**`
- `auth.ts`
- `middleware.ts`
- `.env`
- `.env.local`
- `.env.production`
- Secrets de Vercel/GitHub

## Prompt de preparação — Codex

````text
Atue como Codex no VS Code para executar a etapa E12c — Deploy e auditoria final do Sistema de Hamburgueria.

ATENÇÃO: O deploy é ação exclusivamente humana. Você NÃO executa deploy, migrate em produção, push para Vercel ou qualquer ação destrutiva em ambiente compartilhado. Seu trabalho é documentar, verificar localmente e gerar a auditoria final.

Antes de alterar qualquer arquivo, leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12c-deploy-auditoria.md

Objetivo da etapa:
Preparar o ambiente de produção (documentação e .env.example), verificar build local, gerar auditoria final do MVP.

Pré-requisito da etapa:
E12b aprovada; todos os testes passando; CI funcionando.

Escopo do agente:
- Revisar e atualizar `.env.example` com todas as variáveis necessárias (sem valores reais).
- Criar ou atualizar `docs/deploy.md` com checklist detalhado para o responsável humano executar.
- Executar `npm run build` localmente para confirmar que o build de produção passa.
- Executar `npx prisma migrate status` para verificar estado local.
- Gerar auditoria final (funcional, técnica e arquitetural) em `docs/ia-auditorias/auditoria-final-mvp.md`.

Escopo proibido:
- Não execute deploy, push para Vercel, migrate em produção ou qualquer ação no ambiente compartilhado.
- Não versione .env, .env.local, .env.production ou secrets reais.
- Não crie features novas.
- Não altere schema, checkout, auth ou lógica de pedido sem motivo crítico documentado.
- Não faça commit, merge, push ou deploy automaticamente.

Procedimento obrigatório:
1. Execute `git status --short` e identifique alterações pendentes.
2. Se houver arquivos alterados fora do escopo desta etapa, pare e registre o bloqueador.
3. Revise `.env.example` — todas as variáveis necessárias devem estar listadas com placeholders.
4. Crie/atualize `docs/deploy.md` com checklist humano passo a passo.
5. Execute `npm run build` e registre o resultado.
6. Execute `npx prisma migrate status` e registre o resultado.
7. Gere a auditoria final do MVP cobrindo: funcionalidade completa, arquitetura, segurança, testes, pendências e riscos remanescentes.
8. Gere relatório final completo no formato exigido.

Arquivos prováveis de alteração:
- `.env.example`
- `docs/deploy.md`
- `docs/ia-auditorias/auditoria-final-mvp.md`
- `vercel.json` (somente configuração)

Arquivos proibidos ou sensíveis:
- `prisma/schema.prisma`
- `prisma/migrations/**`
- `domain/order/**`
- `services/order/**`
- `lib/auth/**`
- `auth.ts`
- `middleware.ts`
- `.env`
- `.env.local`
- `.env.production`
- Secrets de Vercel/GitHub

Critérios de aceite:
- `.env.example` atualizado com todas as variáveis e sem valores reais.
- `docs/deploy.md` contém checklist completo para execução humana.
- Build de produção passa localmente.
- `npx prisma migrate status` sem divergências locais.
- Auditoria final gerada cobrindo funcionalidade, segurança, arquitetura e riscos.
- Nenhum secret versionado.

Comandos obrigatórios de validação:
```bash
npm run lint
npm run typecheck
npm test
npm run build
npx prisma validate
npx prisma migrate status
git diff --check
git status --short
```
````

## Prompt de revisão — Claude Code

````text
Atue como Claude Code no VS Code para revisar criticamente a etapa E12c — Deploy e auditoria final.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12c-deploy-auditoria.md
- diff atual da branch

Objetivo da revisão:
Verificar se a documentação de deploy está completa, se nenhum secret foi versionado, se o build passa e se a auditoria final é honesta e completa.

Não implemente código. Não execute deploy.

A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E12c-deploy-revisao.md`; esse deve ser o único arquivo modificado pela revisão.

Verifique obrigatoriamente:
- `.env.example` sem valores reais e com todas as variáveis.
- `docs/deploy.md` com checklist detalhado e gate humano explícito.
- Build passa.
- Auditoria final cobre funcionalidade, segurança, arquitetura e riscos.
- Nenhum secret versionado no diff.
- Nenhuma ação de deploy foi executada automaticamente.

Formato da resposta:
- Veredito geral: aprovado, aprovado com ajustes ou reprovado.
- Problemas encontrados por arquivo.
- Correções obrigatórias.
- Correções recomendadas.
- Riscos remanescentes.
- Evidências dos critérios de aceite.
- Confirmação de que nenhum commit, merge, push ou deploy foi feito automaticamente.
````

## Prompt de auditoria final — Claude Code

````text
Atue como Claude Code no VS Code para realizar a auditoria final do MVP — etapa E12c.

Esta auditoria é somente leitura quanto à implementação e aos documentos do produto. Não implemente nem altere código, configurações, schema, migrations, testes, prompts ou documentação funcional. A única escrita autorizada é criar ou atualizar `docs/ia-auditorias/E12c-deploy-auditoria-final.md`, que deve ser o único arquivo modificado pela auditoria. Preserve `docs/ia-auditorias/auditoria-final-mvp.md` como artefato auditado, sem editá-lo.

Use `docs/ia-auditorias/TEMPLATE-agent-report.md`. Fundamente cada conclusão em arquivo, diff ou comando verificável; identifique os arquivos analisados; separe comandos reexecutados de resultados apenas registrados em relatórios anteriores; não declare validação executada ou aprovada sem evidência. Não faça commit, merge, push ou deploy.

Leia:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E12c-deploy-auditoria.md
- relatório de execução do Codex
- relatório de revisão do Claude Code
- relatório de correção do Codex, se existir
- diff final da branch
- docs/ia-auditorias/auditoria-final-mvp.md (gerado pelo Codex)

Objetivo:
Validar a auditoria final do MVP. Confirmar se o sistema pode ser entregue ou se há bloqueadores críticos.

Audite:
- `.env.example` sem valores reais.
- `docs/deploy.md` com gate humano explícito.
- Build passa.
- Nenhum secret versionado.
- Auditoria final do Codex cobre: funcionalidade, segurança, arquitetura, testes e riscos.
- Fluxos críticos cobertos por testes.
- Auth/RBAC preservados.
- Checkout com recálculo server-side e idempotência.
- Nenhuma feature pós-MVP introduzida.

Bloqueadores conhecidos desta etapa:
- Secret versionado.
- Build falhando.
- Auditoria final vaga ou omissiva.
- Fluxo crítico sem cobertura de teste.
- Deploy executado automaticamente.
- Feature pós-MVP introduzida.

Formato da resposta:
- Veredito final: MVP aprovado para entrega, aprovado com ressalvas ou bloqueado.
- Evidências objetivas.
- Arquivos alterados no diff final.
- Comandos validados e resultados informados.
- Validações reexecutadas separadas das evidências históricas.
- Riscos remanescentes.
- Pendências para pós-MVP.
- Confirmação de ausência de aumento de escopo.
- Status final: Aprovado, Aprovado com observações, Requer ajustes ou Bloqueado.
````

## Critérios de aceite

- `.env.example` atualizado com todas as variáveis e sem valores reais.
- `docs/deploy.md` contém checklist completo para execução humana com gate explícito antes do deploy.
- Build de produção passa localmente.
- `npx prisma migrate status` sem divergências locais.
- Auditoria final gerada cobrindo funcionalidade, segurança, arquitetura e riscos.
- Nenhum secret versionado.

## Comandos obrigatórios de validação

```bash
npm run lint
npm run typecheck
npm test
npm run build
npx prisma validate
npx prisma migrate status
git diff --check
git status --short
```

## Bloqueadores da etapa

- Secret versionado.
- Build falhando.
- Auditoria final vaga ou omissiva.
- Deploy executado automaticamente pelo agente.
- `.env.example` com valores reais.
- Ausência de relatório final.
- Alterações em arquivos proibidos sem justificativa e revisão reforçada.

## Critérios para encerrar o MVP

- Documentação de deploy completa.
- Revisão cruzada concluída.
- Correções obrigatórias aplicadas.
- Auditoria final aprovada.
- Comandos obrigatórios executados ou pendências justificadas.
- Relatórios salvos em `docs/ia-auditorias/`.
- Deploy executado manualmente pelo responsável humano após aprovação da auditoria.

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
- Confirmação de que nenhum deploy foi executado automaticamente.
