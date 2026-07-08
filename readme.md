# Tourism Site

Веб-приложение для создания, редактирования и публикации туристических маршрутов с использованием интерактивной карты Яндекс.

Пользователи могут создавать собственные маршруты, добавлять точки и фотографии, публиковать их после модерации и просматривать маршруты других пользователей.

---

## Возможности

### Авторизация

- Регистрация
- Вход в систему
- JWT авторизация
- Refresh Token
- Выход из аккаунта

### Профиль

- Просмотр информации 
- Редактирование профиля
- Загрузка аватара
- Удаление аватара

### Маршруты

- Создание маршрута
- Редактирование
- Удаление
- Просмотр собственных маршрутов
- Просмотр публичных маршрутов
- Загрузка нескольких изображений
- Добавление точек на карту
- Поиск адресов

### Модерация

- Просмотр маршрутов, ожидающих проверки
- Публикация маршрута
- Изменение статуса маршрута

### Администрирование

- Изменение ролей пользователей

---

# Используемые технологии

## Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Yandex Maps API v3
- Zod

## Backend

- Node.js
- Express
- Prisma ORM
- JWT
- Multer
- bcrypt
- Swagger

## База данных

- PostgreSQL

---

# Структура проекта

```
tourism_site
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controller
│   ├── middleware
│   ├── prisma
│   ├── routes
│   ├── uploadFiles
│   └── package.json
│
└── README.md
```

---

# Установка

## 1. Клонировать репозиторий

```bash
git clone https://github.com/USERNAME/tourism_site.git

cd tourism_site
```

---

## 2. Установить зависимости

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd ../server
npm install
```

---

## 3. Создать файл .env

Пример:

```env
PORT=3000
DATABASE_URL="your_database_url"
JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_secret

PRISMA_ENGINES_MIRROR=https://github.com/prisma/prisma-engines/releases
PRISMA_BINARIES_MIRROR=https://npmmirror.com/mirrors/prisma
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
```

---

## 4. Настроить базу данных

Создать таблицы Prisma

```bash
npx prisma migrate dev
```

Сгенерировать Prisma Client

```bash
npx prisma generate
```

Посде просмотреть базу можно командой

```bash
npx prisma studio
```

---

## 5. Запустить сервер

```bash
npm run dev
```

---

## 6. Запустить клиент

```bash
cd client

npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:300
```

Swagger:

```
http://localhost:3000/api-docs
```

---

# Роли пользователей

### User

- регистрация
- создание маршрутов
- редактирование своих маршрутов
- удаление своих маршрутов
- просмотр опубликованных маршрутов

### Moderator

Дополнительно может

- просматривать маршруты на модерации
- публиковать маршруты

### Admin

Дополнительно может

- изменять роли пользователей

---

# Работа с картой

Используется **Yandex Maps API v3**.

Поддерживается:

- добавление точек кликом
- поиск адресов
- отображение маркеров
- изменение темы карты
- геолокация
- масштабирование

---

# Загрузка изображений

Используется Multer.

Поддерживается

- загрузка нескольких изображений
- Drag & Drop
- предпросмотр
- автоматическое удаление файлов при ошибке создания маршрута

---

# Авторизация

Используется

- JWT Access Token
- Refresh Token
- HttpOnly Cookies

При истечении Access Token происходит автоматическое обновление.

---


# Особенности проекта

- JWT авторизация
- Refresh Token
- Prisma ORM
- Валидация данных через Zod
- Работа с изображениями
- Защищённые маршруты
- Разделение ролей пользователей
- Интерактивная карта Яндекс

---

# Лицензия

Проект создан в учебных целях.