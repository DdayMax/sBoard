# Dockerfile для React
FROM node:18 as build

# Установить рабочую директорию
WORKDIR /app

# Копировать package.json и package-lock.json
COPY package*.json ./

# Установить зависимости
RUN npm install

# Копировать все остальные файлы
COPY . .

# Собрать приложение
RUN npm run build

# Запустить сервер
FROM nginx:alpine

# Копировать собранные файлы в nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Открыть порт
EXPOSE 80

# Запустить nginx
CMD ["nginx", "-g", "daemon off;"]
