# Poll Application

## Запуск с помощью Docker

### Требования

- Установленный [Docker](https://www.docker.com/get-started)
- Установленный [Docker Compose](https://docs.docker.com/compose/install/)

### Инструкция

1. В корневой папке проекта выполните команду для сборки и запуска контейнеров:

   ```bash
   docker-compose up --build
## После успешного запуска:

Фронтенд доступен по адресу: http://localhost:80
Бэкенд доступен по адресу: http://localhost:3000

## Запуск без Docker:

1. В терминале перейдите в папку backend, установите зависимости и запустите сервер:

   ```bash
   cd frontend
   npm install
   npm run dev
## 2. После успешного запуска, в отдельном терминале:
      ```bash
      cd frontend
      npm install
      npm run dev
## После запуска:

Фронтенд доступен по адресу: http://localhost:5173
Бэкенд доступен по адресу: http://localhost:3000

Вся информация по API будет доступна по адресу:
http://localhost:3000/api-docs


