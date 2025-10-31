# Documentação da API - Lá de Casa

API RESTful para o sistema de gestão de insumos da Lá de Casa Cozinha Artesanal.

**Base URL**: `http://localhost:8080/api`

## 🔐 Autenticação

A API utiliza autenticação JWT (JSON Web Token). Após o login, inclua o token no header de todas as requisições:

```
Authorization: Bearer {seu_token_jwt}
```

---

## 📍 Endpoints

### Autenticação

#### POST /auth/login
Realiza login no sistema.

**Request Body:**
```json
{
  "email": "admin@ladecasa.com",
  "senha": "admin123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "tipo": "Bearer",
  "id": 1,
  "nome": "Fernanda de Almeida",
  "email": "admin@ladecasa.com",
  "role": "ADMIN"
}
```

**Erros:**
- `400 Bad Request`: Credenciais inválidas

---

#### POST /auth/register
Registra um novo usuário.

**Request Body:**
```json
{
  "nome": "Nome do Usuário",
  "email": "usuario@email.com",
  "senha": "senha123",
  "role": "USUARIO"
}
```

**Response (200 OK):**
```json
{
  "id": 2,
  "nome": "Nome do Usuário",
  "email": "usuario@email.com",
  "role": "USUARIO",
  "dataCriacao": "2025-10-29T15:30:00"
}
```

---

#### GET /auth/me
Retorna dados do usuário autenticado.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "nome": "Fernanda de Almeida",
  "email": "admin@ladecasa.com",
  "role": "ADMIN",
  "dataCriacao": "2025-10-29T15:00:00"
}
```

---

### Insumos

#### GET /insumos
Lista todos os insumos.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "Chocolate 70%",
    "unidadeMedida": "kg",
    "estoqueAtual": 5.0,
    "estoqueMinimo": 2.0,
    "precoUnitario": 45.00,
    "ativo": true
  }
]
```

---

#### GET /insumos/ativos
Lista apenas insumos ativos.

---

#### GET /insumos/{id}
Busca um insumo por ID.

**Response (200 OK):**
```json
{
  "id": 1,
  "nome": "Chocolate 70%",
  "unidadeMedida": "kg",
  "estoqueAtual": 5.0,
  "estoqueMinimo": 2.0,
  "precoUnitario": 45.00,
  "ativo": true
}
```

**Erros:**
- `404 Not Found`: Insumo não encontrado

---

#### POST /insumos
Cria um novo insumo.

**Request Body:**
```json
{
  "nome": "Baunilha",
  "unidadeMedida": "ml",
  "estoqueAtual": 100,
  "estoqueMinimo": 50,
  "precoUnitario": 0.50,
  "ativo": true
}
```

**Response (200 OK):**
```json
{
  "id": 11,
  "nome": "Baunilha",
  "unidadeMedida": "ml",
  "estoqueAtual": 100,
  "estoqueMinimo": 50,
  "precoUnitario": 0.50,
  "ativo": true
}
```

---

#### PUT /insumos/{id}
Atualiza um insumo existente.

**Request Body:**
```json
{
  "nome": "Chocolate 70%",
  "unidadeMedida": "kg",
  "estoqueAtual": 10.0,
  "estoqueMinimo": 2.0,
  "precoUnitario": 45.00,
  "ativo": true
}
```

---

#### DELETE /insumos/{id}
Desativa um insumo (soft delete).

**Response (200 OK):**
```json
{}
```

---

### Produtos

#### GET /produtos
Lista todos os produtos.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "Brownie Tradicional",
    "descricao": "Brownie de chocolate 70% com nozes",
    "tipo": "BROWNIE",
    "rendimento": 12,
    "precoVenda": 8.50,
    "ativo": true,
    "insumos": []
  }
]
```

---

#### GET /produtos/ativos
Lista apenas produtos ativos.

---

#### GET /produtos/{id}
Busca um produto por ID.

---

#### POST /produtos
Cria um novo produto.

**Request Body:**
```json
{
  "nome": "Brownie de Nozes",
  "descricao": "Brownie com nozes caramelizadas",
  "tipo": "BROWNIE",
  "rendimento": 10,
  "precoVenda": 10.00,
  "ativo": true
}
```

**Tipos disponíveis:** `BROWNIE`, `GELEIA`, `GRANOLA`, `COMPOTA`, `OUTRO`

---

#### PUT /produtos/{id}
Atualiza um produto existente.

---

#### DELETE /produtos/{id}
Desativa um produto (soft delete).

---

#### GET /produtos/{id}/insumos
Lista os insumos de um produto (receita).

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "produto": {
      "id": 1,
      "nome": "Brownie Tradicional"
    },
    "insumo": {
      "id": 1,
      "nome": "Chocolate 70%",
      "unidadeMedida": "kg"
    },
    "quantidade": 0.5
  }
]
```

---

#### POST /produtos/{id}/insumos
Adiciona um insumo ao produto.

**Request Body:**
```json
{
  "insumoId": 1,
  "quantidade": 0.5
}
```

---

#### DELETE /produtos/{id}/insumos/{insumoId}
Remove um insumo do produto.

---

### Pedidos

#### GET /pedidos
Lista todos os pedidos.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "numeroPedido": "PED-001",
    "cliente": "Café da Esquina",
    "dataPedido": "2025-10-25",
    "dataEntrega": "2025-10-30",
    "status": "ATIVO",
    "valorTotal": 150.00,
    "itens": []
  }
]
```

---

#### GET /pedidos/ativos
Lista apenas pedidos com status ATIVO.

---

#### GET /pedidos/{id}
Busca um pedido por ID.

---

#### POST /pedidos
Cria um novo pedido.

**Request Body:**
```json
{
  "numeroPedido": "PED-002",
  "cliente": "Restaurante Bom Sabor",
  "dataPedido": "2025-10-29",
  "dataEntrega": "2025-11-05",
  "status": "ATIVO"
}
```

**Status disponíveis:** `ATIVO`, `CONCLUIDO`, `CANCELADO`

---

#### PUT /pedidos/{id}
Atualiza um pedido existente.

---

#### DELETE /pedidos/{id}
Deleta um pedido.

---

#### POST /pedidos/{id}/itens
Adiciona um item ao pedido.

**Request Body:**
```json
{
  "produtoId": 1,
  "quantidade": 10
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "produto": {
    "id": 1,
    "nome": "Brownie Tradicional",
    "precoVenda": 8.50
  },
  "quantidade": 10,
  "precoUnitario": 8.50,
  "subtotal": 85.00
}
```

---

#### DELETE /pedidos/{id}/itens/{itemId}
Remove um item do pedido.

---

### Cálculos

#### GET /calculos/insumos-necessarios
Calcula os insumos necessários para todos os pedidos ativos.

**Response (200 OK):**
```json
[
  {
    "insumoId": 1,
    "nomeInsumo": "Chocolate 70%",
    "unidadeMedida": "kg",
    "quantidadeNecessaria": 5.0,
    "estoqueAtual": 5.0,
    "diferenca": 0.0,
    "precisaComprar": false
  },
  {
    "insumoId": 6,
    "nomeInsumo": "Morangos",
    "unidadeMedida": "kg",
    "quantidadeNecessaria": 3.0,
    "estoqueAtual": 2.0,
    "diferenca": -1.0,
    "precisaComprar": true
  }
]
```

---

#### GET /calculos/sugestao-compras
Retorna apenas os insumos que precisam ser comprados.

**Response (200 OK):**
```json
[
  {
    "insumoId": 6,
    "nomeInsumo": "Morangos",
    "unidadeMedida": "kg",
    "quantidadeNecessaria": 3.0,
    "estoqueAtual": 2.0,
    "diferenca": -1.0,
    "precisaComprar": true
  }
]
```

---

### Dashboard

#### GET /dashboard/resumo
Retorna resumo geral de vendas.

**Response (200 OK):**
```json
{
  "totalVendasMes": 1500.00,
  "totalVendasAno": 18000.00,
  "totalPedidosMes": 25,
  "totalPedidosAno": 300,
  "pedidosAtivos": 5
}
```

---

#### GET /dashboard/vendas-evolucao
Retorna evolução de vendas por mês.

**Response (200 OK):**
```json
[
  {
    "mes": "jan",
    "valor": 1200.00,
    "quantidade": 20
  },
  {
    "mes": "fev",
    "valor": 1500.00,
    "quantidade": 25
  }
]
```

---

#### GET /dashboard/produtos-mais-vendidos
Retorna os produtos mais vendidos.

**Response (200 OK):**
```json
[
  {
    "nomeProduto": "Brownie Tradicional",
    "tipo": "BROWNIE",
    "quantidade": 150,
    "valor": 1275.00
  },
  {
    "nomeProduto": "Geleia de Morango",
    "tipo": "GELEIA",
    "quantidade": 80,
    "valor": 1440.00
  }
]
```

---

#### GET /dashboard/receita-por-tipo
Retorna receita agrupada por tipo de produto.

**Response (200 OK):**
```json
{
  "BROWNIE": 5000.00,
  "GELEIA": 3500.00,
  "GRANOLA": 2200.00,
  "COMPOTA": 1800.00
}
```

---

## 🔒 Códigos de Status HTTP

- `200 OK`: Requisição bem-sucedida
- `400 Bad Request`: Dados inválidos
- `401 Unauthorized`: Não autenticado
- `403 Forbidden`: Sem permissão
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro no servidor

## 📝 Notas

1. Todos os endpoints (exceto `/auth/login` e `/auth/register`) requerem autenticação
2. O token JWT expira em 24 horas
3. Datas devem estar no formato ISO 8601: `YYYY-MM-DD`
4. Valores monetários são em formato decimal (ex: 10.50)
5. O sistema usa soft delete para insumos e produtos (marca como inativo)

## 🧪 Exemplos de Uso com cURL

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ladecasa.com","senha":"admin123"}'
```

### Listar Insumos
```bash
curl -X GET http://localhost:8080/api/insumos \
  -H "Authorization: Bearer {seu_token}"
```

### Criar Pedido
```bash
curl -X POST http://localhost:8080/api/pedidos \
  -H "Authorization: Bearer {seu_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "numeroPedido": "PED-123",
    "cliente": "Cliente Teste",
    "dataPedido": "2025-10-29",
    "dataEntrega": "2025-11-05",
    "status": "ATIVO"
  }'
```

### Calcular Insumos Necessários
```bash
curl -X GET http://localhost:8080/api/calculos/insumos-necessarios \
  -H "Authorization: Bearer {seu_token}"
```

---

**Versão da API**: 1.0.0  
**Última atualização**: Outubro 2025
