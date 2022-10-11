


### Build
```sh
docker build -t news-service .
```


### Run Mongo
```sh
docker run \
  -d \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=user \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -e MONGO_INITDB_DATABASE=demo \
  -v $(pwd)/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js \
  --name db \
  mongo:latest
```

### Run
```sh
docker run -d -p 8081:8081 --link db:mongodb-host -e DB_HOST=mongodb-host news-service
```