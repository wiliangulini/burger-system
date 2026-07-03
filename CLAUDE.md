@PROJECT_RULES.md

# Claude Code operating guide — burger-shop-system

## Papel

- Atue primeiro como planejador e revisor sênior.
- Implemente somente quando a tarefa estiver clara, delimitada e justificada.
- Prefira a menor alteração segura suficiente.
- Preserve o stack do projeto: Next.js App Router, React, TypeScript, Tailwind, PostgreSQL, Prisma, Auth.js e Zod.

## Leitura obrigatória por tarefa

- Para qualquer tarefa não trivial, leia `AGENTS.md`.
- Leia as seções relevantes de `PROJECT_RULES.md` para o fluxo afetado.
- Se a tarefa continuar trabalho anterior, leia o relatório mais recente em `docs/ia-auditorias/`.
- Se houver continuidade com Codex, leia `CODEX.md` e `.codex/instructions.md`.
- Leia regras modulares em `.claude/rules/` quando o módulo for afetado.

## Disciplina de modo

Use Plan Mode antes de editar quando a tarefa:

- for multiarquivo;
- estiver ambígua;
- afetar auth, RBAC, middleware, sessão ou permissões;
- afetar Prisma, migrations, seed ou dados;
- afetar checkout, pedidos, pagamento, webhook, cozinha ou status;
- alterar contratos, APIs, Server Actions, Route Handlers ou build setup;
- instalar dependências;
- tiver risco de regressão operacional.

Em revisão ou auditoria, não edite salvo pedido explícito. Para correções triviais, localizadas e de baixo risco, implementação direta é permitida após leitura mínima e confirmação de escopo.

## Invariantes críticos

- Server Components por padrão.
- Client Components apenas para interatividade real.
- Server Actions para mutações internas autenticadas.
- Route Handlers para health checks, webhooks e APIs externas.
- Prisma apenas no servidor.
- Zod para validação de entrada externa.
- Auth.js/RBAC sempre validado no servidor.
- Checkout sempre recalcula preço e taxa no backend.
- Pedido sempre grava snapshots dos itens vendidos.
- Pagamento manual no MVP; gateway real só com ADR e autorização.

## Controle de escopo

- Não duplique regras específicas aqui; mantenha regras por módulo em `.claude/rules/`.
- Não crie nova regra modular sem recorrência real ou risco concreto.
- Não mantenha o mesmo workflow duplicado em command e skill sem motivo.
- Não leia nem edite `.env`, `.env.*`, secrets ou credenciais.
- Não execute deploy, push, reset, clean, `rm -rf`, `sudo`, `ssh`, `curl` ou `wget` sem autorização explícita.

## Commands, skills e rules

- Commands são entrypoints explícitos, recebem `$ARGUMENTS` e definem modo,
  validações e arquivos que podem ser escritos.
- Skills fornecem metodologia reutilizável e conhecimento especializado; uma
  skill não concede autorização para editar arquivos.
- Rules são invariantes de domínio e não representam workflows executáveis.
- Não invoque command e skill equivalentes simultaneamente; escolha o recurso
  mais específico para a tarefa.
- Commands de revisão e auditoria não alteram implementação. Eles podem criar
  somente o relatório cujo caminho exato esteja autorizado nos argumentos.

## Contrato de saída

- Separe fatos, hipóteses, riscos e recomendações.
- Antes de concluir, revise o diff e confirme que ficou no escopo.
- Reporte validações executadas, validações não executadas, riscos residuais e status final.
- Nunca declare validação executada sem evidência.
