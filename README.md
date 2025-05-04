# Sistema de Gerenciamento de Estoque

Sistema desenvolvido com Next.js, PostgreSQL e Prisma para gerenciamento de estoque de produtos.

## 🚀 Tecnologias

- Next.js 15
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- Shadcn UI
- Lucide
- React Hook Form
- Zod
- Vitest
- Pnpm

## 📋 Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- npm, pnpm ou yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITORIO]
cd meu-estoque
```

2. Instale as dependências:

```bash
# Pnpm
pnpm install

# NPM
npm install

# Yarn
yarn install
```

3. Configure as variáveis de ambiente:

Primeiro, crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Dentro do arquivo `.env`, configure as variáveis de ambiente necessárias.

4. Inicie o banco de dados PostgreSQL:

```bash
docker-compose up -d
```

5. Execute as migrações do Prisma:

```bash
pnpm prisma migrate dev
```

6. Inicie o servidor de desenvolvimento:

```bash
# Pnpm
pnpm dev

# NPM
npm run dev

# Yarn
yarn dev
```

O sistema estará disponível em `http://localhost:3000`

## 📦 Estrutura do Projeto

- `/app` - Rotas e páginas da aplicação
- `/src/components` - Componentes React reutilizáveis
- `/src/lib` - Utilitários e configurações
- `/prisma` - Schema e migrações do banco de dados

## 🧪 Testes

Para executar os testes:

```bash
# Pnpm
pnpm test

# NPM
npm test

# Yarn
yarn test
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
