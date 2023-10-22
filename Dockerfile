FROM node as build

COPY . /app
WORKDIR /app

RUN npm install &&\
  npm run build


FROM nginx:alpine as deploy

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html