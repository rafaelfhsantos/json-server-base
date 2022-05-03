Descrição

índice

1. [Cadastro](#cadastro)

# json-server-base

Através da api você pode gravar e ler usuários e relacionar eles com duas tabelas, ferramentas e profissões.

## Endpoints

Assim como a documentação do JSON-Server-Auth traz (https://www.npmjs.com/package/json-server-auth), existem 3 endpoints que podem ser utilizados para cadastro e 2 endpoints que podem ser usados para login.

### Cadastro

POST /register <br/>
POST /signup <br/>
POST /users

Qualquer um desses 3 endpoints irá cadastrar o usuário na lista de "Users", sendo que os campos obrigatórios são os de email e password.
Você pode ficar a vontade para adicionar qualquer outra propriedade no corpo do cadastro dos usuários.

### POST/users/register

email e password são obrigatórios!

```json
{
  "email": "fulano@fulano.com",
  "password": "123456"
}
```

Resposta 201 Created:

```json
{
  "accessToken": "xxx.xxx.xxx",
  "user": {
    "email": "fulano@fulano.com",
    "id": 3
  }
}
```

Respostas 400 Bad Request

```json
"Email already exists"
```

Quando não preenche email ou senha:

```json
"Email and password are required"
```

### POST/tools/

userId e name são requeridos!

Corpo

```json
{
  "name": "Pá",
  "userId": 4
}
```

Authorization: Bearer: xxx.xxx.xxx

Resposta 201 Created:

```json
{
  "name": "Pá",
  "userId": 4,
  "id": 3
}
```

Caso já exista com o mesmo nome a resposta é 400 Bad Request

```json
"Já existe uma ferramenta com esse nome!"
```

Resposta 401 Unauthorized:

```json
"Missing token"
```

### POST/professionals/

Cadastrar profissão

Precisa de um usuário cadastrado por causa do bearer token.
userId e name são requeridos!

```json
{
  "name": "Coveiro",
  "userId": 4,
  "toolId": 3
}
```

Authorization: Bearer: xxx.xxx.xxx

Resposta 201 CREATED

```json
{
  "name": "Coveiro",
  "userId": 4,
  "toolId": 3,
  "id": 3
}
```

Caso já exista com o mesmo nome a resposta é 400 Bad Request

```json
"Já existe uma profissão com esse nome!"
```

### Login

POST /login <br/>
POST /signin

Qualquer um desses 2 endpoints pode ser usado para realizar login com um dos usuários cadastrados na lista de "Users"

### Consultas

GET /users/:userId

Authorization: Bearer: xxx.xxx.xxx

Retorna os dados de um usuário específico.

<br>
GET /users/:userId?\_embed=professionals&\_embed=tools

Retorna os dados de um usuário assim como a profissão e ferramenta relacionada.

Exemplo:

```
/users/4?_embed=professionals&_embed=tools
```

Resposta 200 OK:

```json
{
  "email": "siclano@siclano.com",
  "password": "$2a$10$EszwermRlNMfJy/emlhcbenfa8Md828tiqvGrIkGN1DPO6QyIpilm",
  "name": "Siclano",
  "id": 4,
  "professionals": [
    {
      "name": "Coveiro",
      "userId": 4,
      "toolId": 3,
      "id": 3
    }
  ],
  "tools": [
    {
      "name": "Pá",
      "userId": 4,
      "id": 3
    }
  ]
}
```

se não incluir o bearer token:

401 Unauthorized

```json
"Missing authorization header"
```

<br>
GET /tools/

Retorna a lista de ferramentas.

Não requerer autenticação.

Exemplo de resposta 200 OK:

```json
[
  {
    "name": "Machado",
    "userId": 2,
    "id": 1
  },
  {
    "name": "Bigorna",
    "id": 2
  },
  {
    "name": "Pá",
    "userId": 4,
    "id": 3
  }
]
```

<br>
GET /tools?\_embed=professionals

Retorna a lista de ferramentas com as profissões

resposta 200 OK:

```json
[
  {
    "name": "Machado",
    "userId": 2,
    "id": 1,
    "professionals": [
      {
        "name": "Carpinteiro",
        "userId": 2,
        "toolId": 1,
        "id": 1
      }
    ]
  },
  {
    "name": "Bigorna",
    "id": 2,
    "professionals": [
      {
        "name": "Ferreiro",
        "userId": 3,
        "toolId": 2,
        "id": 2
      }
    ]
  },
  {
    "name": "Pá",
    "userId": 4,
    "id": 3,
    "professionals": [
      {
        "name": "Coveiro",
        "userId": 4,
        "toolId": 3,
        "id": 3
      }
    ]
  }
]
```

GET /professionals/

Retorna a lista de profissões. (também não requer autenticação)

Exemplo de resposta 200 OK:

```json
[
  {
    "name": "Carpinteiro",
    "userId": 2,
    "toolId": 1,
    "id": 1
  },
  {
    "name": "Ferreiro",
    "userId": 3,
    "toolId": 2,
    "id": 2
  },
  {
    "name": "Coveiro",
    "userId": 4,
    "toolId": 3,
    "id": 3
  }
]
```

### Requisições DELETE

<br>
DELETE /users/:id   (requer autenticação do próprio usuário)

DELETE /tools/:id

DELETE /professionals/:id
<br><br>
Requer Bearer Token

<br>

Resposta exemplo 200 OK:

```json
{}
```

Resposta exemplo sem token 401 Unauthorized:

```json
"Missing authorization header"
```
