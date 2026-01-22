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
