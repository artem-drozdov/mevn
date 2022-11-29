# MEVN Application | Your Post

## ℹ Genral Info

This is a simple application for creating posts

## 🏭 Applications

-   [Backend](./server) — application backend.
    _To work properly, fill in the `.env` file. Use the `.env.example` file as an example._

-   [Frontend](./client) — application frontend.
    _To work properly, fill in the `.env` file. Use the `.env.example` file as an example._

## 🖍 Requirements

-   [NodeJS](https://nodejs.org/en/) (16.x.x);
-   [NPM](https://www.npmjs.com/) (8.x.x);
-   [Docker](https://www.docker.com)

## 🏃‍♂️ Simple Start

### Setup database

##### You must create your MongoDB, here are some simple ways to do it:

1. Create MongoDB in the Docker container:
    ```
        docker run --name mongodb -d -p 27017:27017 mongo:latest
    ```
2. Create using the [MongoDB Atlas UI](https://www.mongodb.com/basics/create-database);

### Setup apps

##### _For Linux system, in the main package.json for command scripts - "postinstall" you need replace the "&&" between the parentesis with ";"_

1. Fill ENVs in each project
2. `npm install` at the root

### Run project

##### _Before starting, make sure that the mongo docker container is running_

_You can run developer build with one command in the root directory or each project run in the separate terminal in appropriate folder_

##### Developer mode in the root folder:

1. `npm run dev`;

##### Developer mode in each project folder:

```
cd client
npm run serve
cd ../server
npm run dev
```

### 🗜 Tools

### 🌑 Backend

-   [Express](https://expressjs.com/) – a backend framework.
-   [Mongoose](https://mongoosejs.com/) – is a MongoDB object modeling tool .

### 🌕 Frontend

-   [Vue](https://vuejs.org/) – a frontend library.
-   [Vue Router](https://router.vuejs.org/) – router for Vue.js.
-   [Vuex](https://vuex.vuejs.org/) – a state manager.
-   [Axios](https://axios-http.com/) - HTTP client.
-

## Build app in Docker locally

Fill ENV file in the root directory
Run commands from root:

```
docker-compose up -d
```
