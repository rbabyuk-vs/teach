# Використовуємо офіційний образ Nginx
FROM nginx:alpine

# Копіюємо наші HTML, CSS файли та зображення в директорію сервера
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/

# Відкриваємо порт 80 для доступу до нашого додатку
EXPOSE 80

# Команда запуску Nginx
CMD ["nginx", "-g", "daemon off;"]

