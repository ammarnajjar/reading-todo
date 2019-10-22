FROM node:alpine as build-env

WORKDIR /client

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build-env /client/build /usr/share/nginx/html
