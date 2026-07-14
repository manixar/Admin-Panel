FROM node:22-alpine as build


#RUN yarn config set registry https://repo.hmzhit.top/repository/npm/

WORKDIR /app


COPY . /app

#RUN yarn cache clean

RUN yarn install

RUN yarn run build

FROM ubuntu:22.04  

RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

RUN rm /etc/nginx/sites-enabled/default

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /var/www/html/


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]

