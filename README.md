# GitHub Viewer

Aplicação web em React para buscar usuários do GitHub, visualizar perfil e listar repositórios públicos — com ordenação, filtros, cache local e dark mode.

## Stack

| Camada | Tecnologia |
|--------|------------|
| UI | React 19, Vite, Tailwind CSS, shadcn/ui (Base UI) |
| Formulários | React Hook Form + Zod |
| Estado | Redux Toolkit (`createAsyncThunk`) |
| HTTP | Axios |
| Rotas | React Router |
| Testes | Vitest + Testing Library |
| Lint | Biome + Husky |

## Pré-requisitos

- [Bun](https://bun.sh/) (recomendado) ou Node.js 20+

## Instalação e execução

```bash
# 1. Instalar dependências
bun install

# 2. Subir o ambiente local
bun run dev
```

Abra o endereço indicado no terminal (geralmente `http://localhost:5173`).

### Outros scripts

| Comando | Descrição |
|---------|-----------|
| `bun run build` | Typecheck + build de produção |
| `bun run preview` | Preview do build |
| `bun run lint` | Lint com Biome |
| `bun run lint:apply` | Lint + correções automáticas |
| `bun run test` | Testes em modo watch (Vitest) |
| `bun run test:run` | Executa os testes uma vez |

## Funcionalidades

- Busca de usuário do GitHub com validação de formulário
- Perfil: avatar, bio, e-mail (quando público), seguidores e seguindo
- Lista de repositórios ordenável (estrelas, nome, data) — padrão: mais estrelas primeiro
- Filtros por texto, linguagem e estrelas mínimas
- Página de detalhe do repositório com link externo
- Cache em memória (até 8 usuários, TTL de 5 minutos)
- Dark mode com preferência salva
- Barra sticky do perfil e botão flutuante para voltar ao topo

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Busca e histórico recente |
| `/users/:username` | Perfil + repositórios |
| `/users/:username/:repo` | Detalhe do repositório |

## Estrutura do projeto

```
src/
  components/   # UI por domínio (user, repo, layout, form, feedback)
  core/         # API Axios, queries, thunks e tipos
  hooks/        # Hooks reutilizáveis (tema, filtros, observer)
  pages/        # Rotas (Home, User, Repo)
  schemas/      # Zod + helpers de React Hook Form
  store/        # Redux Toolkit
  lib/          # Utilitários puros (filtros, cores)
```

## Decisões técnicas

### UI e formulários

Foi adotado o **shadcn/ui**, biblioteca consolidada no ecossistema React, alinhada a padrões atuais de mercado. Os formulários usam **React Hook Form** e **Zod**, combinação comum em produção: validação tipada, menos re-renders e menos código boilerplate. A pasta `components/form` une esses componentes do shadcn com a integração clássica de RHF (`FormField`, `FormControl`, etc.), o que facilita reuso e manutenção — padrão amplamente usado no mercado.

### HTTP e cache

O desafio pedia consumo via **Fetch ou Axios**, sem abstrair a requisição atrás de libs que “resolvem o problema sozinhas”. Por isso as chamadas são feitas com **Axios**, e o cache fica no **Redux Toolkit** com `createAsyncThunk` (TTL de 5 minutos e até 8 usuários recentes). Alternativas como TanStack Query seriam válidas em outro contexto, mas abstraem o fluxo de fetch/axios e se afastam do que o enunciado pedia para demonstrar.

Os logs de cache (`HIT` / `STALE` / `MISS`) aparecem apenas em desenvolvimento (`import.meta.env.DEV`), para não poluir o console em produção.

### UX

- **Barra sticky do perfil:** ao rolar a lista de repositórios, o bloco do usuário sai da tela; uma barra fixa abaixo do header principal mantém avatar e nome, para o usuário não precisar voltar ao topo só para lembrar de quem é o perfil.
- **Botão flutuante “voltar ao topo”:** facilita o retorno em listas longas, com visual em glassmorphism.
- **Estados de loading, erro e vazio:** skeletons, mensagens claras (usuário não encontrado, filtros sem resultado) e CTAs para recuperar o fluxo.
- **Filtros extras** (texto, linguagem, estrelas mínimas) e **dark mode** com persistência, além da ordenação pedida no enunciado.

### Arquitetura

O projeto é **componentizado** por domínio (`user`, `repo`, `layout`, `feedback`), com serviços/queries/thunks separados, schemas de formulário em `src/schemas` e utilitários puros em `lib` — visando reuso, testes e separação de responsabilidades.

### Qualidade de código (Husky + Biome)

O **Husky** configura um hook `pre-commit` que roda `bun run lint:apply` (Biome) antes de cada commit. Assim o lint e as correções automáticas entram no fluxo do Git, evitando que código fora do padrão seja commitado por acidente. Os hooks são instalados automaticamente no `bun install` via o script `prepare`.

## Observações da API

- A API pública do GitHub frequentemente retorna `email: null`, mesmo quando o perfil tem e-mail privado. A UI exibe “E-mail não disponível”.
- Sem autenticação, a API tem limite de requisições (rate limit). Em caso de `403`, a aplicação exibe a mensagem de erro e permite tentar novamente.
- A listagem de repositórios busca até 100 repos públicos (`per_page=100`).
- O cache vive na sessão (memória Redux); não é persistido em `localStorage`.
