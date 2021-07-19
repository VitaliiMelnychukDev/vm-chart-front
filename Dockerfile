FROM node:latest AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx

COPY --from=builder /app/build /usr/share/nginx/html/
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]