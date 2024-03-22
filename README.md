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

# Fast Food API
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
#### Descrição: Retorna todos os productsOrders

##### Respostas

| Código | Descrição |
| ---- | ----------- |
| 200 | Operação bem sucedida |

##### Responses

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

### /products/{id}

`GET`
#### Descrição: Recuperar o produto por id

##### Parâmetros

| Nome | Localizado em | Descrição | Requerido | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID do produto para retornar | Yes | number |

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
### /categories

`GET`

#### Descrição: Retorna todas as categorias e seu respectivos produtos

##### Responses

| Código | Descrição |
| ---- | ----------- |
| 200 | Operação bem sucedida |

`STATUS 200`
```json
[
  {
	"id": 1,
	"name": "Combos",
	"imgCover": "https://www.imagensempng.com.br/wp-content/uploads/2021/02/18-2.png",
	"createdAt": "2024-03-21T13:22:19.090Z",
	"product": [
		{
			"id": 1,
			"name": "Smash da casa",
			"price": "30.5",
			"description": "2x hambúrguer 200g, queijo, cheddar, tomate, alface, picles, cebola, molho da casa",
			"imgCover": "https://catracalivre.com.br/wp-content/uploads/2015/03/lanche2.png",
			"createdAt": "2024-03-21T13:22:19.138Z",
			"categoryId": 1
		}
        ]
  }
]

```



### /productsOrders

`POST`

#### Descrição: Criar um novo productOrder no banco de dados

##### Responses

| Código | Descrição |
| ---- | ----------- |
| 200 | Operação bem sucedida |

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

`STATUS 200`
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

### /orders

`GET`
#### Descrição: Retrieve all orders in database

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operação bem sucedida |

`STATUS 200`
```json
[
  {
    "id": 10,
    "status": "finished",
    "code": 200,
    "nameCostumer": "Julieta",
    "createdAt": "2022-01-01T00:00:00.000Z",
    "productOrder": [
      {
        "id": 1,
        "amount": 1,
        "note": "Sem cebola",
        "product": {
          "id": 1,
          "name": "Smash da casa",
          "imgCover": "https://fastfood.com/image.png"
        }
      }
    ]
  }
]
```

`POST`
#### Descrição: Criar um novo pedido no banco de dados

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Operação bem sucedida |

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

`STATUS 200`
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

`PATCH`

#### Description: Atualizar o estado de um pedido

##### Parameters

| Name | Localizado em | Descrição | Requirido | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID do pedido para atualizar | Yes | long |

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

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Server**  ([Express](https://www.npmjs.com/package/express))

-   **[dotENV](https://github.com/motdotla/dotenv)**
-   **[Prisma](https://www.npmjs.com/package/prisma)**
-   **[PostgreSQL](https://www.postgresql.org/)**

> Veja o arquivo  [package.json](https://github.com/Julia-Teixeira/challenge-fullstack-Fast-Food-Backend/blob/main/package.json)
