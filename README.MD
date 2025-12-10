# Furniture Accounting API

REST API для учета мебельных изделий, материалов и цехов.

## 🚀 установка зависимостей + SQLite + Prisma

# 1. Установка зависимостей

npm install

# 2. Генерация Prisma клиента

npx prisma generate

# 3. Создание и миграция БД (создаст таблицы автоматически)

npx prisma migrate dev --name init\
npm run seed

# 4. Старт сервера

npm run dev

API: http://localhost:3000/api
Swagger: http://localhost:3000/api-docs
