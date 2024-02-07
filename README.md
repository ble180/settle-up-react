# Settle Up React

This project is a "clone" of the known application [Settle Up](https://settleup.io) made in React for learning purposes. It's an application to share expenses between friends and family and split them in the minimal possible transactions.

## Getting started

```
pnpm install
pnpm serve
```

## Build a docker image

You can build a docker image to start the application running in a docker container.

```
docker build -t settle-up .
```

Now you can run the container with the following command:

```
docker run --name settle --rm -p 80:80 settle-up
```
