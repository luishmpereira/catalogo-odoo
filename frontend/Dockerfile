## Development
FROM node:20.17.0-bookworm-slim AS dev

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5713

CMD ["npm", "run", "dev"]

## Building
FROM node:20.17.0-bookworm-slim AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

## Production
FROM nginx:1.29.0-bookworm-slim AS prod

RUN  rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]