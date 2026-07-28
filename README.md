# GitHub Viewer

Aplicação web em React para buscar usuários do GitHub, visualizar perfil e listar repositórios públicos — com ordenação, filtros, cache local e dark mode.

## Pré-requisitos

- [Bun](https://bun.sh/) (recomendado) ou Node.js 20+

## Instalação

```bash
bun install
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `bun run dev` | Sobe o servidor de desenvolvimento |
| `bun run build` | Typecheck + build de produção |
| `bun run preview` | Preview do build |
| `bun run lint` | Lint com Biome |
| `bun run test` | Testes em modo watch (Vitest) |
| `bun run test:run` | Executa os testes uma vez |

## Uso

1. Abra a home e busque um username do GitHub.
2. Na página do usuário, veja avatar, bio, e-mail (quando público), seguidores/seguindo e a lista de repositórios.
3. Ordene e filtre os repositórios; clique em um item para ver o detalhe.
4. Use o toggle no header para alternar o tema claro/escuro.

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Busca e histórico recente |
| `/users/:username` | Perfil + repositórios |
| `/users/:username/:repo` | Detalhe do repositório |

## Observações

- A API pública do GitHub frequentemente retorna `email: null`, mesmo quando o perfil tem e-mail configurado como privado. Nesse caso a UI exibe “E-mail não disponível”.
- A listagem de repositórios usa até 100 repos públicos (`per_page=100`).
- Há cache em memória (Redux) dos últimos 8 usuários, com expiração de 5 minutos.
