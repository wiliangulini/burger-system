# Auditoria de implementação das configurações de IA — burger-system

Atue como arquiteto sênior de software, especialista em Claude Code, Codex, governança de agentes, engenharia de prompts operacionais, economia de tokens, segurança operacional, Next.js App Router, Prisma, Auth.js, Zod, RBAC e desenvolvimento FullStack.

## Contexto

Este repositório é o `burger-system`.

Foi executado anteriormente o prompt `promptConfig-ia-burgerSystem.md`, cujo objetivo era otimizar as configurações de IA do projeto com base nos pontos fortes do MokBeats, principalmente:

1. reduzir redundância nos commands;
2. melhorar economia de tokens;
3. preservar segurança forte em `.claude/settings.json`;
4. adicionar ou adaptar `paths` nas `.claude/rules/*.md`;
5. separar melhor responsabilidades entre `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `PROJECT_RULES.md`, `.claude/commands/`, `.claude/skills/`, `.claude/rules/` e `.codex/instructions.md`;
6. manter as regras específicas de Next.js, Prisma, Auth.js, Zod, RBAC, checkout, pedidos, pagamentos, cozinha, delivery e UI/Tailwind;
7. evitar dualidade entre Claude Code e Codex;
8. preservar os commands úteis `/implementation-plan` e `/revisar-prisma-banco`;
9. não tocar em código funcional do app sem autorização.

A pasta temporária `_tmp` ainda existe no projeto e contém o ZIP das configurações de IA do MokBeats usado como referência comparativa. Essa pasta deve ser tratada como material temporário de apoio, não como parte permanente da configuração do projeto.

## Modo obrigatório

Trabalhe exclusivamente como auditor/revisor.

Você pode:

* ler arquivos;
* executar comandos somente leitura;
* medir tamanho de arquivos;
* comparar quantidade de linhas, palavras, caracteres e duplicações;
* analisar `git status`;
* analisar `git diff`;
* analisar arquivos em `.claude/`, `.codex/`, raiz e docs de IA;
* consultar `_tmp` apenas para confirmar existência, risco e uso como referência.

Você não pode:

* editar arquivos;
* criar arquivos;
* apagar arquivos;
* mover arquivos;
* extrair ZIP criando arquivos novos;
* executar `git add`, `git commit`, `git push`, `git merge`, `git rebase`, `git reset`, `git clean`;
* instalar dependências;
* rodar migration;
* executar deploy;
* executar `ssh`, `curl`, `wget`, `sudo`;
* ler `.env`, `.env.*`, secrets, tokens, certificados, credenciais ou qualquer conteúdo sensível;
* expor conteúdo de `.claude/settings.local.json`.

Se algum comando necessário for bloqueado por permissão, não tente contornar. Relate o bloqueio e proponha alternativa somente leitura.

## Objetivo principal da auditoria

Verificar se as alterações solicitadas por `promptConfig-ia-burgerSystem.md` foram realmente implementadas, com foco especial em **economia de tokens**.

Não basta dizer que “parece melhor”. É obrigatório apresentar evidência objetiva.

## Etapa 1 — Confirmar estado real do repositório

Execute ou solicite leitura equivalente de:

```bash
git branch --show-current
git status --short
git diff --stat
git diff -- .claude .codex AGENTS.md CLAUDE.md CODEX.md PROJECT_RULES.md README-IA.md .gitignore docs/ia-agentes docs/ia-prompts docs/ia-auditorias
```

Se não houver diff não commitado, verifique:

```bash
git log --oneline -8
```

Depois determine qual base de comparação faz sentido:

* diff não commitado atual;
* último commit;
* comparação com `dev`;
* comparação com a branch de origem da etapa;
* comparação com documentação/auditoria anterior, se existir.

Não assuma que a branch atual é `dev`. Leia a branch real.

## Etapa 2 — Arquivos que devem ser analisados

Leia, se existirem:

* `promptConfig-ia-burgerSystem.md`;
* `AGENTS.md`;
* `CLAUDE.md`;
* `CODEX.md`;
* `PROJECT_RULES.md`;
* `README-IA.md`;
* `.gitignore`;
* `.codex/config.toml`;
* `.codex/instructions.md`;
* `.claude/settings.json`;
* `.claude/commands/*.md`;
* `.claude/rules/*.md`;
* `.claude/skills/*/SKILL.md`;
* `docs/ia-agentes/**`;
* `docs/ia-prompts/**`;
* `docs/ia-auditorias/**`, apenas se forem relevantes para confirmar a implementação;
* `_tmp`, somente para confirmar existência, conteúdo geral e risco de versionamento.

Não leia `.claude/settings.local.json`; apenas verifique se existe e se está ignorado/protegido.

## Etapa 3 — Medição objetiva de economia de tokens

Meça a economia usando aproximações objetivas:

### 3.1 Commands

Para `.claude/commands/*.md`, calcule:

* quantidade de arquivos;
* total de linhas;
* total de palavras;
* total de caracteres;
* média de linhas por command;
* maior command;
* menor command;
* blocos repetidos ainda presentes;
* commands que ainda repetem protocolo global desnecessariamente.

Use comandos somente leitura, por exemplo:

```bash
find .claude/commands -type f -name "*.md" -print
wc -l .claude/commands/*.md
wc -w .claude/commands/*.md
wc -c .claude/commands/*.md
```

Se for seguro e permitido, use script local somente leitura para detectar duplicações aproximadas. Não crie arquivo. Exemplo permitido apenas se o harness autorizar:

```bash
python3 - <<'PY'
from pathlib import Path
import re
base = Path(".claude/commands")
files = sorted(base.glob("*.md"))
print("COMMANDS")
for p in files:
    text = p.read_text(encoding="utf-8")
    words = re.findall(r"\S+", text)
    print(f"{p}: linhas={text.count(chr(10))+1} palavras={len(words)} chars={len(text)}")
print("TOTAL")
all_text = "\n".join(p.read_text(encoding="utf-8") for p in files)
print(f"arquivos={len(files)} linhas={all_text.count(chr(10))+1} palavras={len(re.findall(r'\\S+', all_text))} chars={len(all_text)}")
PY
```

### 3.2 Rules

Para `.claude/rules/*.md`, calcule:

* quantidade de rules;
* quais rules têm frontmatter `paths`;
* quais paths parecem compatíveis com a estrutura real do projeto;
* quais paths estão genéricos demais;
* quais paths apontam para arquivos inexistentes;
* se ainda existe repetição excessiva de procedimento obrigatório, validações e sinais de bloqueio em todas as rules.

Use:

```bash
find .claude/rules -type f -name "*.md" -print
wc -l .claude/rules/*.md
grep -R "^paths:" -n .claude/rules || true
grep -R "^---" -n .claude/rules || true
```

### 3.3 Skills

Para `.claude/skills/*/SKILL.md`, verifique:

* se as skills continuam enxutas;
* se alguma skill passou a repetir conteúdo que deveria estar em command ou rule;
* se alguma skill concede escrita indevidamente;
* se existe duplicidade desnecessária com commands equivalentes.

### 3.4 Arquivos raiz e Codex

Verifique:

* se `AGENTS.md` centraliza roteamento operacional;
* se `CLAUDE.md` centraliza protocolo comum do Claude Code;
* se `CODEX.md` e `.codex/instructions.md` continuam alinhados;
* se `PROJECT_RULES.md` permanece como fonte de verdade;
* se docs em `docs/ia-agentes/` ou `docs/ia-prompts/` viraram regra concorrente indevida.

## Etapa 4 — Comparar com o baseline anterior conhecido

Use o seguinte baseline como referência, se os arquivos atuais permitirem confirmar:

* antes da otimização, o burger-system tinha 13 commands;
* 9 dos 13 commands usavam um mesmo template grande de aproximadamente 85 linhas;
* o conjunto de commands tinha redundância alta;
* as 10 rules não tinham frontmatter `paths`;
* as rules repetiam seções comuns como procedimento obrigatório, validações recomendadas e sinais de bloqueio;
* a segurança de `.claude/settings.json` já era forte e deveria ser preservada;
* `/implementation-plan` e `/revisar-prisma-banco` deveriam ser mantidos.

Se não for possível confirmar o baseline por diff, histórico ou documentação, declare isso claramente e faça uma auditoria do estado atual mesmo assim.

## Etapa 5 — Verificar itens de aceite do prompt original

Avalie um por um:

1. Houve redução real de redundância nos commands?
2. Houve economia mensurável de linhas/palavras/caracteres?
3. Os commands agora estão mais curtos e específicos?
4. O protocolo comum foi centralizado em `CLAUDE.md`, `AGENTS.md` ou outro arquivo adequado?
5. As rules receberam `paths`?
6. Os `paths` são coerentes com a estrutura real do projeto?
7. As rules ainda preservam invariantes de domínio?
8. A segurança de `.claude/settings.json` foi preservada ou melhorada?
9. `.claude/settings.local.json` está protegido e não virou fonte de verdade?
10. `.claude/scheduled_tasks.lock` está ignorado ou tratado corretamente?
11. `_tmp` está ignorado no `.gitignore`?
12. O ZIP do MokBeats em `_tmp` não foi incorporado indevidamente ao projeto?
13. `/implementation-plan` foi preservado?
14. `/revisar-prisma-banco` foi preservado?
15. Claude Code e Codex foram alinhados sem criar sistemas concorrentes?
16. Nenhum arquivo funcional do app foi alterado indevidamente?
17. Nenhum arquivo sensível foi lido, copiado ou exposto?
18. Não houve introdução de regras específicas do MokBeats/Angular/música/player no burger-system?

## Etapa 6 — Verificação específica da pasta `_tmp`

Verifique somente:

```bash
ls -la _tmp || true
find _tmp -maxdepth 2 -type f -print 2>/dev/null || true
git status --short _tmp
git check-ignore -v _tmp _tmp/* 2>/dev/null || true
```

Objetivo:

* confirmar se `_tmp` existe;
* confirmar se o ZIP do MokBeats está lá;
* confirmar se `_tmp` está ignorado;
* confirmar se nada de `_tmp` foi versionado por engano;
* recomendar remoção manual futura se não for mais necessário.

Não extraia ZIP. Não leia conteúdo sensível. Não apague `_tmp`.

## Etapa 7 — Resultado esperado

Entregue o relatório em português do Brasil com esta estrutura:

1. **Resumo executivo**

   * aprovado, aprovado com observações, requer ajustes ou bloqueado;
   * conclusão objetiva sobre a economia de tokens.

2. **Branch e estado do Git**

   * branch atual;
   * arquivos modificados;
   * arquivos não rastreados;
   * se `_tmp` aparece no Git.

3. **Arquivos analisados**

   * liste os arquivos efetivamente lidos;
   * liste arquivos não lidos e motivo.

4. **Medição de economia de tokens**

   * tabela para commands: arquivo, linhas, palavras, caracteres;
   * total atual;
   * comparação com baseline anterior quando possível;
   * conclusão se a economia foi real, parcial ou não comprovada.

5. **Redundância remanescente**

   * blocos repetidos ainda existentes;
   * severidade: baixa, média, alta;
   * impacto em tokens e raciocínio da IA.

6. **Rules e paths**

   * tabela com cada rule;
   * se tem frontmatter `paths`;
   * se os paths parecem corretos;
   * problemas encontrados.

7. **Skills**

   * se continuam enxutas;
   * se há duplicidade com commands;
   * se alguma skill está autorizando escrita indevidamente.

8. **Claude Code vs Codex**

   * se estão alinhados;
   * se há dualidade;
   * se `.codex/instructions.md` preserva as mesmas restrições essenciais.

9. **Segurança**

   * `.claude/settings.json`;
   * `.claude/settings.local.json`;
   * `.claude/scheduled_tasks.lock`;
   * `.gitignore`;
   * `_tmp`;
   * riscos de secrets, tokens, deploy, SSH, curl, wget, migrations destrutivas ou arquivos locais.

10. **Arquivos funcionais do app**

    * confirme se `src/`, `prisma/`, `package.json`, `package-lock.json`, `next.config.*` e `tsconfig.json` foram preservados;
    * se algum foi alterado, explique risco e justificativa encontrada.

11. **Checklist de aceite**

    * tabela com os 18 critérios da Etapa 5;
    * status: OK, Parcial, Falhou, Não verificável;
    * evidência.

12. **Ajustes recomendados**

    * liste apenas ajustes necessários;
    * se tudo estiver correto, diga que não há ajustes obrigatórios;
    * se houver ajustes, separe por prioridade: crítico, alto, médio, baixo.

13. **Próximo passo recomendado**

    * se aprovado: sugerir revisão manual do diff e eventual commit;
    * se aprovado com observações: sugerir correções pequenas;
    * se requer ajustes: sugerir executar novo prompt de correção;
    * se bloqueado: explicar motivo.

14. **Status final**

    * `Aprovado`;
    * `Aprovado com observações`;
    * `Requer ajustes`;
    * ou `Bloqueado`.

## Regras finais

* Não faça alterações.
* Não gere relatório em arquivo.
* Responda apenas no chat.
* Não exponha conteúdo sensível.
* Não invente medições: toda métrica precisa vir de comando ou leitura real.
* Se algo não puder ser verificado, marque como `Não verificável`.
* Priorize evidência objetiva, especialmente para economia de tokens.
