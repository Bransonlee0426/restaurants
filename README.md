# restaurants-manager

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Docker建置

## Build docker image
```bash
$> docker build . -t app
```
產生一個標籤為app:latest的docker image

## Run your docker image
```bash
$> docker run -d -p 8080:80 app
```

## 測試運行中的docker container
```bash
$> curl localhost:8080
```
