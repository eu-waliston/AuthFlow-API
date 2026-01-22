# AuthFlow API - Sistema de Autenticação Empresarial com Controle de Acessos

## 📋 Visão Geral
AuthFlow API é uma solução empresarial completa de autenticação e autorização construída com Node.js, oferecendo gerenciamento de usuários, controle de acesso baseado em roles (admin/user) e integração com Docker. Projeto ideal para servir como base para sistemas que requerem autenticação segura.

## 🏗️ Arquitetura do Projeto

```
authflow-api/
├── src/
│   ├── config/          # Configurações do sistema
│   ├── controllers/     # Controladores da API
│   ├── middlewares/    # Middlewares (auth, validation, etc.)
│   ├── models/         # Modelos de dados
│   ├── routes/         # Rotas da API
│   ├── services/       # Lógica de negócio
│   ├── utils/          # Utilitários e helpers
│   └── app.js          # Aplicação principal
├── tests/              # Testes automatizados
├── docker/             # Configurações Docker
├── .github/workflows/  # CI/CD
├── docker-compose.yml  # Orquestração de containers
├── Dockerfile          # Definição da imagem Docker
├── package.json
└── README.md

```
## 🚀 Funcionalidades

  - Autenticação JWT com refresh tokens

  - Roles (admin/user) com permissões granulares

  - CRUD completo de usuários

  - Validação de dados com Joi

  - Logging estruturado com Winston

  - Rate limiting para segurança

  - Criptografia de senhas com bcrypt

## 🔒 Segurança
  -  Hash de senhas com salt

  -  Tokens JWT com expiração configurável

  -  Proteção contra ataques com Helmet

  -  CORS configurável

  -  Sanitização de inputs

## 📊 Banco de Dados
  -  PostgreSQL como banco principal

  -  Redis para cache e rate limiting

  -  Migrations com Sequelize/Knex

  -  Modelos com validações

## 🛠️ Tecnologias

### Backend
  -  Node.js v18+

  -  Express.js - Framework web

  -  PostgreSQL - Banco de dados relacional

  -  Redis - Cache e sessões

  -  JWT - Autenticação stateless

  -  Sequelize/TypeORM - ORM

  -  Joi - Validação de dados

  -  Winston - Logging

  -  Jest/Supertest - Testes

## DevOps
  -  Docker & Docker Compose

  -  GitHub Actions - CI/CD

  -  Nginx (opcional) - Reverse proxy

  -  PM2 - Process manager

## 📦 Instalação
### Pré-requisitos
  -  Node.js 18+

  -  Docker e Docker Compose

  -  PostgreSQL 14+

  -  Redis 6+

## Método 1: Docker (Recomendado)

```
# Clone o repositório
git clone https://github.com/seu-usuario/authflow-api.git
cd authflow-api

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# Inicie os containers
docker-compose up -d

# A API estará disponível em http://localhost:3000
```

## Método 2: Desenvolvimento Local

```
# Instale dependências
npm install

# Configure o banco de dados
npm run db:migrate
npm run db:seed

# Inicie em desenvolvimento
npm run dev

# Execute testes
npm test
```

## 🔧 Configuração
### Variáveis de Ambiente (.env)
```
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=authflow_db
DB_USER=postgres
DB_PASSWORD=secure_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Security
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

## 📚 API Documentation
### Endpoints Principais

#### Autenticação
```
POST   /api/auth/register     # Registrar novo usuário
POST   /api/auth/login        # Login
POST   /api/auth/refresh      # Refresh token
POST   /api/auth/logout       # Logout
POST   /api/auth/forgot-password # Esqueci senha
POST   /api/auth/reset-password  # Resetar senha
```

#### Usuários
```
GET    /api/users             # Listar usuários (admin only)
GET    /api/users/:id         # Buscar usuário
PUT    /api/users/:id         # Atualizar usuário
DELETE /api/users/:id         # Deletar usuário (admin only)
PUT    /api/users/:id/role    # Atualizar role (admin only)
```

#### Perfil
```
GET    /api/profile           # Meu perfil
PUT    /api/profile           # Atualizar perfil
PUT    /api/profile/password  # Alterar senha
```

## Exemplo de Requisições
#### Registro
```
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "role": "user"
  }'
```
#### Login
```
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'

```

## 🐳 Docker
### Build da Imagem
```
docker build -t authflow-api:latest .
```
### Docker Compose
```
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - postgres
      - redis
    volumes:
      - ./logs:/app/logs

  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: authflow_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:

```

## 🧪 Testes
#### Estrutura de Testes

```
npm test                  # Executa todos os testes
npm run test:unit        # Testes unitários
npm run test:integration # Testes de integração
npm run test:coverage    # Testes com cobertura
npm run test:e2e         # Testes end-to-end

```
#### Exemplo de Teste
```

describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });
});

```
## 📈 Monitoramento e Logs

#### Logs Estruturados

```

{
  "level": "info",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "message": "User authenticated",
  "userId": "123",
  "ip": "192.168.1.1",
  "method": "POST",
  "url": "/api/auth/login"
}

```

## Health Check

```
GET /health

>> Retorna status da aplicação e dependências.
```
## 🔐 Roles e Permissões

### Admin
  - Gerenciar todos os usuários

  - Atribuir/remover roles

  - Acessar logs do sistema

  - Configurações do sistema

### User
  - Gerenciar próprio perfil

  - Alterar própria senha

  - Acesso a recursos básicos

## 🚢 Deploy
### Opção 1: Docker Swarm/Kubernetes

```

# deployment.yaml para Kubernetes
apiVersion: apps/v1
kind: Deployment
metadata:
  name: authflow-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: authflow-api
  template:
    metadata:
      labels:
        app: authflow-api
    spec:
      containers:
      - name: api
        image: authflow-api:latest
        ports:
        - containerPort: 3000
        envFrom:
        - secretRef:
            name: authflow-secrets

```
### Opção 2: Servidor Tradicional
```
# Build da aplicação
npm run build

# Iniciar com PM2
pm2 start dist/app.js --name authflow-api

# Setup com Nginx
sudo nano /etc/nginx/sites-available/authflow-api
```

## 🤝 Contribuição

  1 Fork o projeto

  2 Crie uma branch (git checkout -b feature/AmazingFeature)

  3 Commit suas mudanças (git commit -m 'Add some AmazingFeature')

  4 Push para a branch (git push origin feature/AmazingFeature)

  5 Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## 🆘 Suporte

   - 📖 Documentação Completa

  - 🐛 Reportar Bug

  - 💡 Solicitar Feature

  - 💬 Discord/Slack Community

## ✨ Contribuidores

<a href="https://github.com/eu-waliston/authflow-api/graphs/contributors"> <img src="https://contrib.rocks/image?repo=eu-waliston/authflow-api" /> </a>

## ⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!
