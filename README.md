<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Julia-Teixeira/challenge-fullstack-Fast-Food-Backend?color=%2304D361" />

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Julia-Teixeira/challenge-fullstack-Fast-Food-Backend" />

  <a href="https://github.com/diegoguilhermeDS/connect-sphere/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Julia-Teixeira/challenge-fullstack-Fast-Food-Backend" />
  </a>
  
  <a href="https://github.com/Julia-Teixeira/challenge-fullstack-Fast-Food-Backend">
    <img alt="Feito por Julia PEreira" src="https://img.shields.io/badge/feito%20por-JuliaPereira-%237519C1" />
  </a>
</p>

# Desafio da empresa Devio - Fast Food API
A API de Fast Food foi desenvolvida para atender às necessidades de um restaurante que oferece comidas rápidas, permitindo que registrem suas vendas de forma fácil e rápida, substituindo o método tradicional de comandas por um processo mais eficiente. Este serviço oferece uma interface intuitiva para listar os produtos mais vendidos e facilitar a inserção desses produtos no checkout. Além disso, a API proporciona um visual simples e moderno, garantindo uma experiência de usuário agradável.

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com:Julia-Teixeira/challenge-fullstack-Fast-Food-Backend.git

# Acesse a pasta do projeto no terminal/cmd
$ cd challenge-fullstack-Fast-Food-Backend

# Instale as dependências
$ npm install ou yarn

# Preencha as variáveis de ambiente corretamente

# Execute a aplicação em modo de desenvolvimento
$ npm run dev ou yarn dev

```
# Documentação

### /products

`GET`
#### Descrição: Retorna todos os produtos

##### Respostas

| Código | Descrição |
| ---- | ----------- |
| 200 | Operação bem sucedida |

##### Parâmetros
| Nome | Localizado em | Descrição | Requerido | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| name | query | Nome do produto | Não | string |
| category | query | Nome da categoria | Não | string |
| page | query | Número da página | Não | number |
| perPage | query | Número de produtos por página | Não | number |


##### Responses

`STATUS 200`
```json
{
  "total": 10,
  "lastPage": 10,
  "currentPage": 1,
  "perPage": 10,
  "prev": 1,
  "next": 1,
  "data": [
    {
      "id": 10,
      "name": "Smash da casa",
      "price": "30.5",
      "description": "2x hambúrguer 200g, queijo, cheddar, tomate, alface, picles, cebola, molho da casa",
      "image": "https://fastfood.com/image.png",
      "categoryId": 1,
      "createdAt": "2022-01-01T00:00:00.000Z"
    }
  ]
}
```

`POST`
#### Descrição: Cria um novo produto

##### Respostas

| Code | Description |
| ---- | ----------- |
| 201 | Criado com sucesso |

#### Request

```json
{
  "name": "Smash da casa",
  "price": 30.5,
  "description": "2x hambúrguer 200g, queijo, cheddar, tomate, alface, picles, cebola, molho da casa",
  "imgCover": "https://fastfood.com/image.png",
  "categoryId": 1
}
```

#### Response
`STATUS 201`

```json
{
  "id": 10,
  "name": "Smash da casa",
  "price": "30.5",
  "description": "2x hambúrguer 200g, queijo, cheddar, tomate, alface, picles, cebola, molho da casa",
  "image": "https://fastfood.com/image.png",
  "categoryId": 1,
  "createdAt": "2022-01-01T00:00:00.000Z"
}
```

### /products/{id}
##### Parâmetros

| Nome | Localizado em | Descrição | Requerido | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID do produto para retornar | Yes | number |

`GET`
#### Descrição: Recuperar o produto por id

##### Responses

| Código | Descrição |
| ---- | ----------- |
| 200 | Operação bem sucedida |
| 404 | Product not found |

`STATUS 200`
```json
  {
    "id": 10,
    "name": "Smash da casa",
    "price": "30.5",
    "description": "2x hambúrguer 200g, queijo, cheddar, tomate, alface, picles, cebola, molho da casa",
    "image": "https://fastfood.com/image.png",
    "categoryId": 1,
    "createdAt": "2022-01-01T00:00:00.000Z"
  }

```

`STATUS 404`
```json
{
    message: "Product not found"
}

```


### /additionals

`GET`
#### Descrição: Retorna todas os adicionais

##### Responses
| Código | Descrição |
| ---- | ----------- |
| 200 | Operação bem sucedida |

##### Parâmetros
| Nome | Localizado em | Descrição | Requerido | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| page | query | Número da página | Não | number |
| perPage | query | Número de produtos por página | Não | number |

`STATUS 200`
```json
{
  "total": 10,
  "lastPage": 10,
  "currentPage": 1,
  "perPage": 10,
  "prev": 1,
  "next": 1,
  "data": [
    {
      "id": 1,
      "name": "Bacon",
      "price": "1",
      "type": "ingredient",
      "description": "10g",
      "imgCover": "https://fastfood.com/image.png",
      "createdAt": "2022-01-01T00:00:00.000Z"
    }
  ]
}
```


`POST`
#### Descrição: Cria um novo adicional no banco de dados

##### Responses
| Código | Descrição |
| ---- | ----------- |
| 200 | Operação bem sucedida |

#### Request
```json
{
  "name": "Bacon",
  "price": "1",
  "type": "ingredient",
  "description": "10g",
  "imgCover": "https://fastfood.com/image.png"
}
```

#### Response
`STATUS 201`
```json
{
  "id": 1,
  "name": "Bacon",
  "price": "1",
  "type": "ingredient",
  "description": "10g",
  "imgCover": "https://fastfood.com/image.png",
  "createdAt": "2022-01-01T00:00:00.000Z"
}
```

### /categories

`GET`
#### Descrição: Retorna todas as categorias e seu respectivos produtos

##### Responses
| Código | Descrição |
| ---- | ----------- |
| 200 | Operação bem sucedida |

##### Parâmetros
| Nome | Localizado em | Descrição | Requerido | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| page | query | Número da página | Não | number |
| perPage | query | Número de produtos por página | Não | number |

`STATUS 200`
```json
{
  "total": 10,
  "lastPage": 10,
  "currentPage": 1,
  "perPage": 10,
  "prev": 1,
  "next": 1,
  "data": [
    {
      "id": 1,
      "name": "Combos",
      "imgCover": "https://fastfood.com/image.png",
      "createdAt": "2022-01-01T00:00:00.000Z",
      "product": [
        {
          "id": 10,
          "name": "Smash da casa",
          "price": "30.5",
          "description": "2x hambúrguer 200g, queijo, cheddar, tomate, alface, picles, cebola, molho da casa",
          "image": "https://fastfood.com/image.png",
          "categoryId": 1,
          "createdAt": "2022-01-01T00:00:00.000Z"
        }
      ]
    }
  ]
}
```

`POST`
#### Descrição: Criar uma nova categoria no banco de dados

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Criado com sucesso |

#### Request
```json
{
  "name": "Combos",
  "imgCover": "https://fastfood.com/image.png"
}
```

#### Response
`STATUS 201`
```json
{
  "id": 1,
  "name": "Combos",
  "imgCover": "https://fastfood.com/image.png",
  "createdAt": "2022-01-01T00:00:00.000Z"
}
```

### /productsOrders

`POST`

#### Descrição: Criar um novo productOrder no banco de dados

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Criado com sucesso |

#### Request
```json
{
  "productId": 1,
  "amount": 1,
  "note": "Sem cebola",
  "total": 30.5
}
```

#### Response

`STATUS 201`
```json
{
  "id": 10,
  "productId": 1,
  "amount": 1,
  "note": "Sem cebola",
  "total": "30.5",
  "createdAt": "2022-01-01T00:00:00.000Z"
}
```

### /productsOrders/{id}
##### Parâmetros

| Nome | Localizado em | Descrição | Requerido | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID do productOrder a ser excluído | Yes | number |

`DELETE`
#### Descrição: Apaga um productOrder do banco de dados

##### Responses

| Código | Descrição |
| ---- | ----------- |
| 204 | Sem corpo |

### /orders

`GET`
#### Descrição: Retrieve all orders in database

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operação bem sucedida |

##### Parâmetros
| Nome | Localizado em | Descrição | Requerido | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| page | query | Número da página | Não | number |
| perPage | query | Número de produtos por página | Não | number |
| status | query | Status do pedido | Não | "onGoing", "delivered" ou "finished" |

`STATUS 200`
```json
{
  "total": 10,
  "lastPage": 10,
  "currentPage": 1,
  "perPage": 10,
  "prev": 1,
  "next": 1,
  "data": [
    {
      "id": 10,
      "status": "finished",
      "code": 200,
      "nameCostumer": "Julieta",
      "total": "30.5",
      "createdAt": "2022-01-01T00:00:00.000Z",
      "productOrder": [
        {
          "id": 1,
          "amount": 1,
          "note": "Sem cebola",
          "total": "30.5",
          "additionalIds": [
            {
              "id": 1,
              "name": "Bacon",
              "price": "10.5",
              "description": "10g"
            }
          ],
          "product": {
            "id": 1,
            "name": "Smash da casa",
            "imgCover": "https://fastfood.com/image.png",
            "price": "30.5"
          }
        }
      ],
      "payment": [
        {
          "type": "credit",
          "change": "0",
          "total": "30.5"
        }
      ]
    }
  ]
}
```

`POST`
#### Descrição: Criar um novo pedido no banco de dados

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Criado com sucesso |

#### Request
```json
{
  "code": 200,
  "nameCostumer": "Julieta",
  "total": 30.5,
  "productOrder": [
    1
  ],
  "payment": {
    "type": "credit",
    "change": 0,
    "total": 30.5
  }
}
```

#### Response

`STATUS 201`
```json
{
  "id": 10,
  "code": 200,
  "nameCostumer": "Julieta",
  "total": "30.5",
  "status": "onGoing",
  "createdAt": "2022-01-01T00:00:00.000Z"
}
```

### /orders/{id}

##### Parameters

| Name | Localizado em | Descrição | Requirido | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID do pedido | Yes | long |

`GET`
#### Description: Retorna uma pedido

##### Responses

| Código | Descrição |
| ---- | ----------- |
| 200 | Successful operation |
| 404 | Order not found |

#### Response
```json
{
  "id": 10,
  "status": "finished",
  "code": 200,
  "nameCostumer": "Julieta",
  "total": "30.5",
  "createdAt": "2022-01-01T00:00:00.000Z",
  "payment": [
    {
      "id": 1,
      "type": "credit",
      "change": "0",
      "total": "30.5"
    }
  ],
  "productOrder": [
    {
      "id": 1,
      "amount": 1,
      "note": "Sem cebola",
      "additionalIds": [
        {
          "id": 1,
          "name": "Bacon",
          "price": "10.5",
          "description": "10g"
        }
      ],
      "product": {
        "id": 1,
        "name": "Smash da casa",
        "imgCover": "https://fastfood.com/image.png",
        "price": "30.5"
      }
    }
  ]
}
```

`PATCH`
#### Description: Atualizar o estado de um pedido

##### Responses

| Código | Descrição |
| ---- | ----------- |
| 200 | Successful operation |
| 404 | Order not found |


#### Request
```json
{
  "status": "finished"
}
```

#### Response
`STATUS 200`
```json
{
  "id": 10,
  "code": 200,
  "nameCostumer": "Julieta",
  "total": "30.5",
  "status": "finished",
  "createdAt": "2022-01-01T00:00:00.000Z"
}
```

`STATUS 404`
```json
{
    message: "Order not found"
}
```

`DELETE`
#### Description: Apaga um pedido do banco de dados

##### Responses

| Código | Descrição |
| ---- | ----------- |
| 204 | Sem corpo |



## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Server**  ([Express](https://www.npmjs.com/package/express))

-   **[dotENV](https://github.com/motdotla/dotenv)**
-   **[Prisma](https://www.npmjs.com/package/prisma)**
-   **[PostgreSQL](https://www.postgresql.org/)**

> Veja o arquivo  [package.json](https://github.com/Julia-Teixeira/challenge-fullstack-Fast-Food-Backend/blob/main/package.json)

## Link do desafio
- **[Desafio Fullstack Devio](https://github.com/deviobr/challenges/blob/main/challenge-fullstack.md)
