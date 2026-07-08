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
|   readme.md
|
+---frontend
|   |   .env
|   |   .env.example
|   |   .gitignore
|   |   eslint.config.js
|   |   index.html
|   |   package-lock.json
|   |   package.json
|   |   README.md
|   |   vite.config.js
|   |
|   +---public
|   |       vite.svg
|   |
|   \---src
|       |   App.jsx
|       |   index.css
|       |   main.jsx
|       |
|       +---api
|       |       api.js
|       |
|       +---assets
|       |       1.jpg
|       |       2.jpg
|       |       3.png
|       |       4.jpg
|       |       5.png
|       |       6.jpg
|       |       edit.png
|       |       find.png
|       |       forest.jpg
|       |       public.png
|       |       react.svg
|       |       routes.png
|       |
|       +---components
|       |       body.jsx
|       |       FeatureCard.jsx
|       |       Features.jsx
|       |       Gallery.jsx
|       |       header.jsx
|       |       Hero.jsx
|       |       inputCustom.jsx
|       |       map.jsx
|       |       pointCard.jsx
|       |       pointer.jsx
|       |       roleSelect.jsx
|       |       routeCard.jsx
|       |       routeImg.jsx
|       |       userCard.jsx
|       |
|       +---Contexts
|       |       AuthContext.jsx
|       |       ThemContext.jsx
|       |
|       +---pages
|       |       changeRoles.jsx
|       |       editorRoute.jsx
|       |       index.jsx
|       |       login.jsx
|       |       profile.jsx
|       |       register.jsx
|       |       routesPage.jsx
|       |
|       +---Routes
|       |       AppRouter.jsx
|       |       ProtectedRouter.jsx
|       |
|       \---schemas
|               validate.schema.js
|
\---server
    |   .env.example
    |   .gitignore
    |   dataValidate.js
    |   package-lock.json
    |   package.json
    |   prisma.config.ts
    |   server.js
    |   swagger-output.json
    |   swagger.js
    |
    +---controller
    |       admin.controller.js
    |       auth.controller.js
    |       avatar.controller.js
    |       routes.controller.js
    |
    +---middlewear
    |       auth.js
    |       uploadFiles.js
    |       validate.js
    |
    +---prisma
    |   |   prisma.js
    |   |   schema.prisma
    |   |   seed.js
    |   |
    |   +---generated
    |   |   |   browser.ts
    |   |   |   client.ts
    |   |   |   commonInputTypes.ts
    |   |   |   enums.ts
    |   |   |   models.ts
    |   |   |
    |   |   +---internal
    |   |   |       class.ts
    |   |   |       prismaNamespace.ts
    |   |   |       prismaNamespaceBrowser.ts
    |   |   |
    |   |   \---models
    |   |           Point.ts
    |   |           Role.ts
    |   |           Routes.ts
    |   |           RoutesImg.ts
    |   |           RoutStatus.ts
    |   |           User.ts
    |   |
    |   \---migrations
    |       |   migration_lock.toml
    |       |
    |       +---20260618103451_init_db
    |       |       migration.sql
    |       |
    |       +---20260618103625_add_tables
    |       |       migration.sql
    |       |
    |       +---20260618111626_add_new_columns_to_test
    |       |       migration.sql
    |       |
    |       +---20260618122216_remove_str_updated_at
    |       |       migration.sql
    |       |
    |       +---20260623080807_add_user_and_roles
    |       |       migration.sql
    |       |
    |       +---20260623093704_fix_bug_for_references_to_role
    |       |       migration.sql
    |       |
    |       +---20260627195921_y
    |       |       migration.sql
    |       |
    |       +---20260701182110_add_routes
    |       |       migration.sql
    |       |
    |       +---20260701182420_add_route_to_user
    |       |       migration.sql
    |       |
    |       +---20260701182919_fix_bug
    |       |       migration.sql
    |       |
    |       +---20260701184118_add_desc
    |       |       migration.sql
    |       |
    |       +---20260701185631_add_float_to_points_coords
    |       |       migration.sql
    |       |
    |       +---20260702065336_add_routes_img_and_public
    |       |       migration.sql
    |       |
    |       \---20260706163239_add_cascade
    |               migration.sql
    |
    +---uploadFiles
    |       i.webp
    |
    \---utils
            deleteFile.js
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

Загрузить базовые данные

```bash
npx prisma db seed
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