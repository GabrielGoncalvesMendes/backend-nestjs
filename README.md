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
Agora podera executar as rotas atraves de http://localhost:3333 ou o numero da PORT na 
qual adicionou no arquivo .env

## Teste
Nesta etapa foram realizados somente alguns testes básicos que podem ser acompanhados
executando o comando abaixo:
```bash
# Teste unitários
$ yarn test ou npm run test
```

## Rotas
Ambas as rotas tem de enviar um token JWT conseguido quando logado no serviço de
login presente no KeyCloak (SSO) e passados como um "Bearer Token".
Para conseguir a validação é preciso setar a URL do SSO (Keycloak)
no arquivo .env, baseando no arquivo .env.sample
A rota liberada neste projeto é a de customer e os métodos com os exemplos de
corpos de requisição a seguir:
GET: /customer/idCustomer
  Retorna um customer baseado no id PATH params;
POST: /customer
  cria um customer baseado no corpo da requisição.
  Corpo da chamada post = {
    document: number,
    name: string;
  }
PATCH: /customer/idCustomer
  Atualiza um customer baseado no id PATH params, passando o corpo da requisição.
  Corpo da chamada post = {
    id: string;
    document: number;
    name: string;
  }

## Liçensa

NestJS is [MIT licensed](LICENSE).
