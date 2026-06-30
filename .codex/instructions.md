# Instruções operacionais do Codex — burger-shop-system

Complementa `PROJECT_RULES.md`, `AGENTS.md` e `CODEX.md`. Leia explicitamente no início de cada sessão.

---

## 1. Matriz de impacto

Para cada alteração relevante, avalie somente as áreas aplicáveis:

- App Router, route groups, layouts, pages, loading/error/not-found;
- Server Components, Client Components e fronteira `use client`;
- Server Actions, Route Handlers, services server-side e contratos;
- Auth.js, sessão, cookies, middleware, RBAC e proteção admin/staff;
- Prisma, schema, migrations, seed, índices, relações e transações;
- catálogo, categorias, produtos, imagens, adicionais e disponibilidade;
- carrinho, checkout, preço, taxa, snapshots e criação de pedido;
- status de pedidos, painel admin e tela de cozinha;
- pagamento manual, adapter futuro, Pix/gateway e webhooks;
- delivery areas, horários, store settings e pedido mínimo;
- Tailwind, responsividade, acessibilidade e UX;
- observabilidade, logs, audit log, health checks e deploy futuro;
- testes, lint, typecheck, build, segurança e manutenção.

Não trate uma área como impactada sem evidência no repositório.

---

## 2. Critérios para alterar arquivos

Antes de alterar um arquivo, confirme:

1. o arquivo está diretamente ligado ao escopo;
2. existe evidência de que precisa mudar;
3. não há alternativa de menor impacto;
4. contratos e comportamento existente serão preservados;
5. a alteração pode ser justificada e validada no relatório final.

Se for necessário ampliar o escopo: pare, informe arquivo adicional, motivo, risco e alternativa mais segura antes de editar.

---

## 3. Modo Planejamento

Em Modo Planejamento, apenas leia, busque, analise, mapeie riscos e proponha plano.

Proibido criar, alterar, mover, excluir ou sobrescrever arquivos. Exceção: arquivo de plano pedido explicitamente pelo usuário. Sem esse pedido, o plano deve ser entregue somente no chat.

---

## 4. Operações proibidas sem autorização

Não execute sem autorização explícita:

```bash
git add
git commit
git push
git merge
git rebase
git reset --hard
git clean
rm -rf
sudo
ssh
curl
wget
npm install
npm i
npm ci
npx prisma migrate reset
npx prisma migrate deploy
```

Não leia nem edite:

```txt
.env
.env.*
**/.env
**/.env.*
secrets/**
**/secrets/**
**/*secret*
**/*credential*
.claude/settings.local.json
```

---

## 5. Validação

Antes de executar comandos, leia `package.json` e confirme scripts reais.

Comandos possíveis, se existirem:

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

Nunca afirme que um comando foi executado se não foi. Para cada comando não executado, informe motivo.

---

## 6. Relatório final

Use exclusivamente o formato e os status definidos em `PROJECT_RULES.md`.
Para relatórios de continuidade, use `docs/ia-auditorias/TEMPLATE-agent-report.md`.
Não crie formato concorrente. Não declare sucesso sem evidência.
