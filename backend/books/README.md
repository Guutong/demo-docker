
### Build
```sh
docker build -t books-service .
```

### Run
```sh
docker run -d -p 8080:8080 -v $(pwd)/db/:/server/db books-service
```