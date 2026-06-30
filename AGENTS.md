# AGENTS.md — Instruções para agentes de IA no burger-shop-system

Use este arquivo para Codex, Claude Code e qualquer outro agente que atue neste repositório.

---

## 1. Identidade do projeto

**Projeto:** burger-shop-system — sistema single-store para hamburgueria, com cardápio público, carrinho, checkout, pedidos, painel administrativo, tela de cozinha, RBAC, configurações operacionais e preparação futura para Pix/gateway/WhatsApp/delivery.

**Stack principal:**

```txt
Next.js App Router
React.js
TypeScript
Tailwind CSS
PostgreSQL
Prisma
Auth.js
Zod
Server Components por padrão
Client Components apenas onde houver interatividade
Server Actions para mutações internas
Route Handlers para APIs, health checks e webhooks
```

**Branch padrão assumida:** `main`.

Se o repositório usar `dev`, `develop` ou outra branch, o agente deve registrar a branch real no relatório e não trocar de branch sem autorização.

---

## 2. Prioridade das instruções

1. Solicitação explícita do usuário/desenvolvedor.
2. `PROJECT_RULES.md` — fonte central de regras técnicas, funcionais, segurança e produto.
3. Este arquivo `AGENTS.md`.
4. `CLAUDE.md`, `.claude/commands/`, `.claude/rules/` e `.claude/skills/` — quando estiver usando Claude Code.
5. `CODEX.md` e `.codex/instructions.md` — quando estiver usando Codex ou houver continuidade entre agentes.
6. Código existente da branch atual.
7. Boas práticas atuais de Next.js App Router, React, TypeScript, Tailwind, PostgreSQL, Prisma, Auth.js, Zod e segurança web.

Em conflito entre instruções, preserve segurança, integridade de dados, autenticação/autorização, checkout, pedidos e estabilidade da branch atual. Comunique antes de aplicar mudanças amplas.

---

## 3. Modos de atuação

### Implementação

Pode editar arquivos somente quando o escopo estiver claro. Antes de editar:

1. confirme branch e `git status`;
2. leia documentação obrigatória;
3. entenda objetivo, comportamento atual e comportamento esperado;
4. identifique arquivos prováveis e arquivos proibidos;
5. proponha plano quando a tarefa for sensível, multiarquivo ou ambígua;
6. implemente a menor alteração suficiente;
7. revise o diff;
8. execute validações disponíveis;
9. gere relatório final.

### Revisão/auditoria

Não edite arquivos salvo pedido explícito. Leia diff e arquivos alterados, compare com escopo, classifique achados por severidade e recomende status final.

### Planejamento

Não crie, mova, edite ou exclua arquivos. Analise, mapeie riscos e entregue plano no chat ou em arquivo apenas quando o usuário pedir explicitamente um artefato.

### Documentação

Pode criar ou atualizar documentação dentro do escopo. Não documente recurso inexistente como implementado. Diferencie decisão, plano, implementação real e hipótese.

---

## 4. Segurança operacional

Pare e peça autorização explícita quando a tarefa envolver:

- dados de produção;
- deploy;
- credenciais, tokens, secrets ou `.env`;
- `git push`, merge, rebase, reset, clean ou commit;
- `rm`, remoção em massa ou sobrescrita destrutiva;
- `sudo`, `ssh`, `curl`, `wget`, scripts remotos ou comandos desconhecidos;
- instalação de dependências;
- alteração de autenticação, sessão, RBAC, middleware ou permissões;
- alteração destrutiva de banco, migrations ou seed com risco de perda de dados;
- mudança de contrato de checkout, pedido, pagamento, webhook ou API pública;
- mudança ampla de arquitetura;
- escopo ambíguo com alto risco.

É proibido ler ou editar `.env`, `.env.*`, arquivos de credenciais, dumps privados, chaves, tokens, certificados e diretórios `secrets/`.

Se for necessário ampliar o escopo, informe arquivo adicional, justificativa técnica, risco e alternativa de menor impacto antes de editar.

---

## 5. Evidência obrigatória

Toda conclusão técnica deve se apoiar em evidência verificável:

- arquivo lido;
- trecho de código real;
- erro reproduzido;
- diff analisado;
- comando executado;
- script existente no `package.json`;
- documentação do projeto;
- validação manual descrita.

Quando não houver evidência suficiente, declare incerteza. Nunca invente estrutura, rotas, APIs, scripts, variáveis de ambiente, payloads, modelos Prisma, componentes, services ou dependências.

---

## 6. Git e branch

- Confirme branch atual e `git status` antes de qualquer edição.
- Não execute `git add`, `git commit`, `git push`, `git merge`, `git rebase`, `git reset --hard`, `git clean` ou ações destrutivas sem pedido explícito.
- Commits devem ser pequenos, objetivos e criados apenas quando solicitados.
- Se houver alterações pendentes de outro agente ou desenvolvedor, não sobrescreva. Registre e isole sua alteração.
- Para feature branches, use nomes claros quando autorizado, por exemplo `feature/r11-checkout-orders` ou `fix/admin-login-rbac`.

---

## 7. Validação

Antes de executar comandos, abra `package.json` e confirme scripts reais. Comandos possíveis, se existirem:

```bash
npm run lint
npm run typecheck
npm run build
npm test
npm run test
npm run test:unit
npm run test:e2e
npx prisma validate
npx prisma generate
npx prisma migrate status
npx prisma migrate dev
npx prisma db seed
```

Regras:

- não afirme validação executada sem executar;
- se não executar, informe o motivo;
- se falhar, registre comando, erro e hipótese se a falha parece pré-existente;
- `npx prisma migrate dev` e `npx prisma db seed` exigem cuidado: confirme ambiente local e nunca rode contra produção;
- nunca rode `prisma migrate reset` sem autorização explícita.

---

## 8. Áreas principais do projeto — caminhos prováveis

A estrutura real deve prevalecer. Se os caminhos abaixo ainda não existirem, trate-os como referência de arquitetura.

```txt
src/app/(public)/
src/app/(public)/cardapio/
src/app/(public)/produto/[slug]/
src/app/(public)/carrinho/
src/app/(public)/checkout/
src/app/(public)/pedido/confirmado/[code]/
src/app/(public)/acompanhar-pedido/[code]/
src/app/admin/
src/app/admin/login/
src/app/admin/dashboard/
src/app/admin/pedidos/
src/app/admin/produtos/
src/app/admin/categorias/
src/app/admin/configuracoes/
src/app/admin/cozinha/
src/app/api/health/live/
src/app/api/health/ready/
src/app/api/webhooks/pagamento/
src/components/ui/
src/components/public/
src/components/admin/
src/components/kitchen/
src/lib/auth/
src/lib/prisma/
src/lib/env/
src/lib/observability/
src/services/catalog/
src/services/cart/
src/services/checkout/
src/services/order/
src/services/payment/
src/services/delivery/
src/actions/
src/schemas/
src/types/
prisma/schema.prisma
prisma/migrations/
prisma/seed.ts
```

---

## 9. Áreas sensíveis por domínio

### 9.1 Autenticação admin/staff e RBAC

Alterações em Auth.js, middleware, sessão, cookies, roles, guards server-side, proteção de Server Actions, Route Handlers e área admin exigem plano e validação específica.

Roles iniciais recomendadas:

```txt
OWNER
MANAGER
ATTENDANT
KITCHEN
```

### 9.2 Prisma, banco e migrations

Migrations devem ser pequenas, revisáveis e compatíveis com dados existentes. Não altere ou apague migrations já aplicadas sem autorização. Prefira novas migrations corretivas.

### 9.3 Catálogo, produtos e adicionais

Slug, preço, disponibilidade, imagens e opcionais afetam vendas. Não confie em preço vindo do cliente no checkout.

### 9.4 Carrinho, checkout e pedidos

O carrinho pode existir no client-side, mas o checkout deve recalcular preço, taxa de entrega, disponibilidade e total no servidor. Pedido deve gravar snapshots de nome/preço dos itens vendidos.

### 9.5 Status de pedidos e cozinha

Transições de status devem ser explícitas e validadas. Não permita saltos inválidos sem regra de negócio registrada.

### 9.6 Pagamentos e webhooks

No MVP, pagamento manual é permitido. Preparação futura para Pix/gateway deve ser desacoplada por adapter e idempotente em webhook. Nunca aceite webhook sem validação de assinatura quando houver gateway real.

### 9.7 Configurações da loja e delivery

Horários, abertura manual, taxa de entrega, pedido mínimo e áreas de entrega afetam diretamente o checkout. Toda alteração deve ser auditável.

---

## 10. Proibições técnicas sem autorização explícita

Não fazer sem autorização:

- mudar stack principal;
- criar backend separado antes do MVP exigir;
- transformar o sistema em multi-store no MVP;
- adicionar gateway real de pagamento sem plano de segurança;
- usar preço do client-side como fonte de verdade;
- expor dados administrativos em componentes públicos;
- criar Client Component onde Server Component é suficiente;
- usar Route Handler para mutação interna quando Server Action resolver melhor;
- alterar Auth.js/RBAC sem revisão;
- alterar migrations aplicadas destrutivamente;
- instalar dependências novas sem justificativa;
- executar deploy;
- ler ou editar `.env` e secrets;
- rodar comandos destrutivos.

---

## 11. Relatório final

Todo agente deve finalizar com:

```txt
Status final: Aprovado | Aprovado com observações | Requer ajustes | Bloqueado
```

Use `Aprovado com observações` quando houver suposições importantes, validações não executadas, scripts ausentes, branch diferente da esperada ou pendências não bloqueantes.

---

## 12. Continuidade entre agentes

Quando uma tarefa alternar entre Codex, Claude Code ou outro agente:

1. leia o relatório anterior em `docs/ia-auditorias/`, se existir;
2. confirme o estado real do Git;
3. não confie em relatório sem verificar diff e arquivos;
4. não desfaça alterações de outro agente sem evidência técnica;
5. registre decisões, riscos, validações e próximo passo sugerido;
6. indique qual agente/skill deve continuar.
