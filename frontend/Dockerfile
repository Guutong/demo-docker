FROM node:18 as build

ARG BOOK_API
ARG NEWS_API

ENV NODE_ENV=dev
ENV BOOK_BASE_API=${BOOK_API}
ENV NEWS_BASE_API=${NEWS_API}

WORKDIR /web

COPY package.json .

RUN npm install

COPY . .

RUN REACT_APP_BOOK_SERVICE_BASE_API=${BOOK_BASE_API} \
    REACT_APP_NEWS_SERVICE_BASE_API=${NEWS_BASE_API} \
    npm run build

# deploy
FROM nginx:1.23-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /web/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]