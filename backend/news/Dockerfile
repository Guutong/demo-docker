FROM node:18-alpine3.15

WORKDIR /server

COPY package.json .

RUN npm install

COPY src src
COPY server.js .
COPY .env .env

CMD ["node", "server.js"]
