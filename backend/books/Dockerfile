# Build stage
FROM golang:1.18.7-bullseye as build

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./

RUN go build -o /app/books-api

# Deploy stage
FROM gcr.io/distroless/base-debian10

WORKDIR /server

COPY --from=build /app/books-api /server/books-api

EXPOSE 8080

USER nonroot:nonroot

CMD ["/server/books-api"]