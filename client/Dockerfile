FROM node:alpine as build-env

WORKDIR /client

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=build-env /client/build /usr/share/nginx/html
