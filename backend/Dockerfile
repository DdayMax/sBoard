# Dockerfile для NestJS
FROM node:18

# Установить рабочую директорию
WORKDIR /app

# Копировать package.json и package-lock.json
COPY package*.json ./

# Установить зависимости
RUN npm install

# Копировать все остальные файлы
COPY . .

# Скомпилировать TypeScript в JavaScript
RUN npm run build

# Установить переменную окружения
ENV NODE_ENV production

# Открыть порт
EXPOSE 3000

# Запустить приложение
CMD ["npm", "run", "start:prod"]