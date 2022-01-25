## Descrição

Este projeto foi desenvolvido utilizando a biblioteca NestJS, como uma metodo de ser um microserviço,
com autentiação sendo fornecida pelo serviço de Auth do Keycloak. e assim a validando para as requisições
seguintes.

## Tecnologias

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Redis](https://redis.io/)
- [IoRedis](https://github.com/luin/ioredis)
- [JestJS](https://jestjs.io/pt-BR/)
- [Axios](https://axios-http.com/)

## Instalação

Fazer o clone do projeto seguindo o comando abaixo:
```sh
git clone https://github.com/GabrielGoncalvesMendes/backend-nestjs.git
```

dentro da pasta do projeto você deve instalar as dependencias do mesmo com o 
comand abaixo:
```sh
yarn ou npm install
```

Agora, você precisará criar a conexão com o Redis (sugiro utilizar docker para tal) e deverá criar um arquivo .env e preencher o mesmo com as variavéis e valores corretos demonstradas do arquivo .env.sample

Para criar um redis via docker, com o mesmo instalado rodar os comandos abaixo:
```sh
# Instalação docker
docker pull redis
docker run -d -p 6379:6379 redis
```
docker pull serve para baixar a imagem do redis no docker, e o docker run é onde o mesmo
ira iniciar a intalação do container na porta padrão, podendo ser trocada a porta caso preciso.
Lembrar de alterar a porta no aqruivo .env

Após configurar o redis, você podera buildar o server para produção com:
```sh
# Gerar o build da aplicação
yarn build ou npm run build
```
Após o build pode inicia-lo em produção com:
```sh
# Iniciar a aplicação em modo de produção
yarn start:prod ou npm run start:prod
```

Se você está iniciando em desenvolvimento, você poderá inicia-lo com:
```sh
# Iniciar a aplicação em modo de desenvolvimento
yarn start:dev ou npm run start:dev
```

## Teste
Nesta etapa foram realizados somente alguns testes básicos que podem ser acompanhados
executando o comando abaixo:
```bash
# Teste unitários
$ yarn test ou npm run test
```

## Liçensa

NestJS is [MIT licensed](LICENSE).
