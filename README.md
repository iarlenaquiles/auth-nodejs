# :computer: API em NodeJS de uma aplicação de autenticação de usuário com recureparção de senha 


## Tecnologias

 - NodeJS
 - Express
 - Express-async-errors
 - Express-handlebars
 - Nodemon
 - Sucrase
 - MongoDB
 - Redis
 - ESlint + Prettier
 - @sentry/node
 - bcryptjs
 - bee-queue
 - cors
 - JWT
 - nodemailer
 - Youch
 - Yup
 - npm-run-all
 
 

 
 
 # Configuração
 - Copiar .env.example para .env
- Criar uma conta no mailtrap e configurar no env https://mailtrap.io/signin

- Setar env com as variáveis
```APP_URL=
NODE_ENV=
APP_PORT=

APP_SECRET=


MONGO_URL=

REDIS_HOST=
REDIS_PORT=

MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=

SENTRY_DSN=
```
 - Iniciar o Redis
 - Iniciar o MongoDB
 
 ## Run
 - git clone 
 - yarn
 - yarn start
 
 ## Rodar os endpoints no insomnia
 [![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=auth-nodejs&uri=https%3A%2F%2Fgithub.com%2Fiarlenaquiles%2Fauth-nodejs%2Fblob%2Fmaster%2FInsomnia_2020-07-03.json)
