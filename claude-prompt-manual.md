# Manual prático do Claude Code no VS Code

Este manual adota o terminal integrado do VS Code como fluxo principal. A extensão do Claude Code é opcional e serve principalmente para revisar diffs, referenciar trechos selecionados e consultar o histórico de conversas.

As regras completas continuam em `PROJECT_RULES.md`, `AGENTS.md`, `CLAUDE.md` e `README-IA.md`. Este manual não as substitui.

## 1. Preparar o VS Code e o terminal

Pré-requisitos:

- repositório aberto no VS Code 1.98.0 ou superior;
- Claude Code CLI instalado separadamente;
- conta Anthropic autenticada;
- Git disponível no terminal.

A extensão do VS Code inclui uma cópia privada do CLI para o painel gráfico, mas não instala o comando `claude` no `PATH`. Para trabalhar pelo terminal, o CLI independente precisa estar instalado.

Abra o terminal integrado:

- Windows/Linux: `Ctrl+\``;
- macOS: `Cmd+\``;
- ou use **Terminal > New Terminal**.

Entre na raiz do projeto e confira o estado real antes de iniciar:

```bash
cd /home/mr-robot/Documents/2_projetos/burger-system
git status
```

Não presuma que a branch seja `main`. Leia a branch mostrada por `git status` e preserve alterações rastreadas ou não rastreadas que já existiam.

Na elaboração deste manual, em 3 de julho de 2026, a branch observada era `feature/e03-auth-admin`. Esse registro é apenas contextual; a branch real deve ser conferida em cada sessão.

## 2. Iniciar, continuar e encerrar sessões

### Nova sessão

Na raiz do projeto:

```bash
claude
```

O Claude Code carrega o `CLAUDE.md` do projeto. No primeiro pedido, ainda informe objetivo, escopo, restrições e critério de aceite.

Para começar diretamente em Plan Mode:

```bash
claude --permission-mode plan
```

Dentro de uma sessão, use `Shift+Tab` para alternar os modos de permissão. Também é possível aplicar Plan Mode somente ao próximo pedido iniciando-o com `/plan`.

### Continuar uma sessão

Retome a sessão mais recente deste projeto:

```bash
claude --continue
```

Escolha uma sessão anterior em uma lista:

```bash
claude --resume
```

As sessões são associadas ao diretório do projeto. Execute esses comandos na raiz correta para evitar retomar um contexto de outro repositório.

### Encerrar

Dentro do Claude Code:

```text
/exit
```

O atalho `Ctrl+D` também encerra a sessão. Antes disso, peça o relatório final e confira `git status` e `git diff`.

## 3. Fluxo diário recomendado

### 1. Entrar no projeto e verificar o Git

```bash
cd /home/mr-robot/Documents/2_projetos/burger-system
git status
claude
```

Informe ao Claude quais alterações já existiam e não podem ser sobrescritas.

### 2. Solicitar planejamento

Para uma tarefa sensível, ambígua ou com vários arquivos, ative Plan Mode e use o command local:

```text
/implementation-plan Descreva a tarefa, o comportamento esperado, os limites do escopo e os critérios de aceite. Não edite arquivos.
```

Exija que o plano identifique arquivos prováveis, riscos, validações e qualquer autorização necessária.

### 3. Aprovar a implementação

Revise o plano. Se estiver correto, aprove a opção que mantém revisão manual das edições ou volte ao modo padrão com `Shift+Tab`. Em seguida, seja explícito:

```text
Plano aprovado. Implemente somente o escopo aprovado, preserve as alterações preexistentes e não execute commit, push, deploy ou migration.
```

Também é possível usar o command de implementação:

```text
/create-code Implemente somente o plano aprovado nesta sessão.
```

Não aprove automaticamente uma ampliação de escopo. Peça justificativa, risco e alternativa de menor impacto.

### 4. Revisar as alterações

Peça ao Claude para revisar o próprio diff e confira também no terminal:

```bash
git status
git diff
```

Verifique arquivos inesperados, remoções, mudanças de contrato e formatação sem relação com a tarefa.

### 5. Executar validações

Os scripts atualmente existentes em `package.json` são:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Execute somente os comandos relevantes para a mudança. O Claude deve informar o resultado real de cada comando e separar validações executadas das não executadas.

### 6. Receber o relatório final

Use um pedido curto:

```text
Revise o diff final e entregue o relatório no formato de PROJECT_RULES.md: arquivos alterados, decisões, validações executadas e não executadas, riscos, próximo passo e Status final.
```

O relatório não substitui a sua revisão do diff.

## 4. Quando usar Plan Mode

Use Plan Mode antes de editar quando a tarefa:

- afetar vários arquivos ou estiver ambígua;
- envolver Auth.js, sessão, RBAC, middleware ou permissões;
- alterar Prisma, schema, migrations, seed ou dados;
- tocar checkout, pedidos, pagamentos, webhooks ou status da cozinha;
- mudar API, Server Action, Route Handler, dependência ou configuração de build;
- puder quebrar contratos ou exigir operação irreversível.

Implementação direta é aceitável para uma correção pequena, localizada e de baixo risco, como texto, documentação ou ajuste visual isolado, desde que o escopo esteja claro e o estado do Git tenha sido verificado.

Plan Mode permite leitura e investigação, mas impede a edição do código-fonte. Aprovar um plano troca a sessão para o modo de implementação escolhido. Neste repositório, prefira revisão manual das ações; não use modos que ignorem permissões.

## 5. Terminal ou extensão

Use o terminal para:

- iniciar e retomar sessões;
- executar commands e skills;
- acompanhar comandos longos e suas saídas;
- rodar Git e validações de forma explícita;
- manter claro qual diretório e branch estão ativos.

Use a extensão como apoio para:

- visualizar diffs lado a lado;
- enviar ao Claude um arquivo ou trecho selecionado;
- consultar e reabrir conversas pelo histórico;
- revisar visualmente um plano;
- acompanhar diagnósticos do editor.

Com a extensão ativa, o CLI pode integrar-se ao visualizador de diff do VS Code. A extensão e o CLI compartilham o histórico local, e `claude --resume` permite escolher conversas anteriores. Para tarefas e processos em segundo plano, o terminal oferece visibilidade melhor.

## 6. Exemplos copiáveis

Os exemplos abaixo são digitados dentro de uma sessão do Claude Code, salvo quando o bloco começa com `claude`.

### Implementar uma tarefa

```text
/implementation-plan Adicione o estado vazio na tela informada. Leia as regras aplicáveis, identifique os arquivos reais e proponha a menor alteração. Não edite.
```

Após revisar e aprovar o plano:

```text
/create-code Implemente o plano aprovado. Revise o diff, execute as validações relevantes e entregue o relatório final. Não faça commit.
```

### Investigar um bug

```text
/debug-app Investigue por que o formulário informado falha no cenário descrito. Reproduza quando possível, separe fatos de hipóteses e encontre a causa raiz. Não edite até eu aprovar a correção.
```

Inclua mensagem de erro, passos para reprodução, comportamento atual e comportamento esperado.

### Revisar alterações

```text
/review-code Revise o git diff atual sem editar arquivos. Classifique achados por severidade e cite arquivo, linha, impacto, evidência e correção mínima.
```

### Continuar trabalho anterior

Para continuar a sessão mais recente:

```bash
claude --continue
```

Para escolher outra:

```bash
claude --resume
```

Para um handoff iniciado pelo Codex:

```text
/continue-from-codex Leia o relatório anterior e confirme tudo no estado real do Git. Preserve alterações existentes e continue somente o escopo autorizado.
```

### Usar commands ou skills de `.claude/`

Digite `/` no início da entrada para listar e filtrar os recursos realmente disponíveis na sessão. Commands recebem o texto após o nome como argumento:

```text
/implementation-plan Planeje a alteração descrita sem editar arquivos.
```

As skills fornecem metodologia reutilizável. Podem ser carregadas quando relevantes ou invocadas diretamente pelo nome:

```text
/implementation-planning Planeje esta tarefa por fases, com riscos e critérios de aceite.
```

```text
/senior-code-review Revise o diff atual sem editar.
```

Neste repositório, prefira um command como entrypoint do fluxo. Use uma skill isoladamente quando precisar apenas da metodologia especializada. Não invoque command e skill equivalentes na mesma tarefa.

Recursos locais úteis:

- commands: `implementation-plan`, `create-code`, `debug-app`, `review-code`, `continue-from-codex` e `final-audit`;
- skills: `implementation-planning`, `senior-code-agent`, `senior-code-review`, `safe-refactor`, `architecture-review`, `legacy-code-audit` e `final-audit`.

## 7. Permissões e operações sensíveis

O arquivo `.claude/settings.json` deste projeto aplica uma política conservadora:

- consultas como `git status`, `git diff` e validações conhecidas podem ser permitidas;
- commit, merge, rebase, instalação, acesso direto ao banco e migrations pedem aprovação;
- leitura de secrets, push, deploy, remoções destrutivas e migrations destrutivas são negados.

Regras práticas:

- nunca autorize leitura ou edição de `.env`, `.env.*`, credenciais, tokens, certificados ou `secrets/`;
- não permita `git add`, commit, push, merge, rebase, reset ou clean sem pedido explícito e revisão humana;
- trate instalação de dependências como mudança de escopo;
- confirme que o banco é local antes de qualquer migration ou seed;
- nunca use `prisma migrate reset` como correção automática;
- não altere migrations já aplicadas; prefira uma migration corretiva revisável;
- não autorize deploy, `sudo`, `ssh`, download remoto ou comando desconhecido sem entender o impacto;
- rejeite qualquer opção para ignorar ou contornar permissões;
- preserve arquivos modificados ou não rastreados que já existiam.

Se o Claude pedir uma permissão inesperada, negue temporariamente e solicite:

```text
Explique por que essa ação é necessária, quais arquivos ou dados afeta, o risco e a alternativa de menor impacto. Não execute ainda.
```

## 8. Checklist rápido

### Início da sessão

- [ ] Abrir a raiz correta no VS Code.
- [ ] Abrir o terminal integrado.
- [ ] Executar `git status` e ler a branch real.
- [ ] Identificar alterações preexistentes, inclusive não rastreadas.
- [ ] Iniciar com `claude` ou `claude --permission-mode plan`.
- [ ] Informar objetivo, escopo, restrições e critérios de aceite.
- [ ] Usar Plan Mode quando houver risco ou vários arquivos.

### Encerramento da sessão

- [ ] Conferir `git status`.
- [ ] Revisar `git diff`.
- [ ] Confirmar que nenhum arquivo fora do escopo foi alterado.
- [ ] Executar apenas as validações relevantes existentes.
- [ ] Registrar comandos executados, resultados e validações ausentes.
- [ ] Receber o relatório final com riscos e próximo passo.
- [ ] Encerrar com `/exit` ou `Ctrl+D`.

## 9. Referências verificadas

Documentação oficial da Anthropic consultada em 3 de julho de 2026:

- [Claude Code overview](https://code.claude.com/docs/en/overview)
- [Use Claude Code in VS Code](https://code.claude.com/docs/en/vs-code)
- [Manage sessions](https://code.claude.com/docs/en/sessions)
- [Choose a permission mode](https://code.claude.com/docs/en/permission-modes)
- [Commands](https://code.claude.com/docs/en/commands)
- [Interactive mode](https://code.claude.com/docs/en/interactive-mode)

Configuração local consultada: `AGENTS.md`, `PROJECT_RULES.md`, `CLAUDE.md`, `CODEX.md`, `.codex/instructions.md`, `README-IA.md`, `docs/ia-agentes/claude-code.md`, `.claude/settings.json`, `.claude/commands/`, `.claude/skills/` e `package.json`.
