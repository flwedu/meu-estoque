# Sistema de Gerenciamento de Estoque

Sistema desenvolvido com Next.js, PostgreSQL e Prisma para gerenciamento de estoque de produtos.

## 🚀 Tecnologias

- Next.js 14
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM

## 📋 Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITORIO]
cd meu-estoque
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie o banco de dados PostgreSQL:

```bash
docker-compose up -d
```

5. Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

6. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O sistema estará disponível em `http://localhost:3000`

## 📦 Estrutura do Projeto

- `/src/app` - Rotas e páginas da aplicação
- `/src/components` - Componentes React reutilizáveis
- `/src/lib` - Utilitários e configurações
- `/prisma` - Schema e migrações do banco de dados

## 🧪 Testes

Para executar os testes:

```bash
npm test
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
