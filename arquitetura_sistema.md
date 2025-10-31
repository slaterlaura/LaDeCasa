# Arquitetura do Sistema - Lá de Casa Cozinha Artesanal

## 1. Visão Geral

Sistema de gestão de insumos e pedidos para produção artesanal de alimentos, com foco em cálculo automático de necessidades de insumos baseado em receitas e pedidos ativos.

## 2. Arquitetura Técnica

### 2.1 Backend (Java)
- **Framework**: Spring Boot 3.x
- **Banco de Dados**: H2 (desenvolvimento) / PostgreSQL (produção)
- **Autenticação**: Spring Security + JWT
- **ORM**: Spring Data JPA
- **Build**: Maven

### 2.2 Frontend (React)
- **Framework**: React 18+ com Vite
- **Roteamento**: React Router
- **Estado**: Context API + Hooks
- **UI Components**: Material-UI (MUI)
- **Gráficos**: Recharts
- **HTTP Client**: Axios
- **Paleta de Cores**: Bordô (#7C324C), Azul Claro (#ACC1CC), Bege (#F4EFEA)

## 3. Modelo de Dados

### 3.1 Entidades Principais

#### Usuario
- id (Long)
- nome (String)
- email (String, único)
- senha (String, hash)
- role (ADMIN, USUARIO)
- dataCriacao (LocalDateTime)

#### Insumo
- id (Long)
- nome (String)
- unidadeMedida (String) - ex: kg, g, L, ml, unidade
- estoqueAtual (Double)
- estoqueMinimo (Double)
- precoUnitario (Double)
- ativo (Boolean)

#### Produto (Receita)
- id (Long)
- nome (String)
- descricao (String)
- tipo (BROWNIE, GELEIA, GRANOLA, COMPOTA, OUTRO)
- rendimento (Integer) - quantas unidades a receita produz
- ativo (Boolean)

#### ProdutoInsumo (Relacionamento)
- id (Long)
- produto (Produto)
- insumo (Insumo)
- quantidade (Double) - quantidade do insumo necessária para a receita

#### Pedido
- id (Long)
- numeroPedido (String)
- cliente (String)
- dataPedido (LocalDate)
- dataEntrega (LocalDate)
- status (ATIVO, CONCLUIDO, CANCELADO)
- valorTotal (Double)

#### PedidoItem
- id (Long)
- pedido (Pedido)
- produto (Produto)
- quantidade (Integer)
- precoUnitario (Double)
- subtotal (Double)

## 4. Funcionalidades por Módulo

### 4.1 Autenticação
- Login com email e senha
- Geração de token JWT
- Proteção de rotas

### 4.2 Gestão de Insumos
- CRUD de insumos
- Controle de estoque
- Alertas de estoque mínimo
- Listagem com filtros

### 4.3 Gestão de Produtos (Receitas)
- CRUD de produtos
- Associação de insumos às receitas
- Definição de quantidades por insumo
- Cálculo de custo por produto

### 4.4 Gestão de Pedidos
- CRUD de pedidos
- Adição de itens ao pedido
- Cálculo automático de valores
- Filtro por status e data

### 4.5 Cálculo de Insumos Necessários
- Análise de pedidos ativos
- Cálculo agregado de insumos necessários
- Comparação com estoque disponível
- Sugestão de compras

### 4.6 Dashboard Administrativo
- Total de vendas (mensal/anual)
- Evolução de vendas por mês
- Produtos mais vendidos
- Receita por tipo de produto
- Gráficos interativos

## 5. Endpoints da API

### Autenticação
- POST /api/auth/login
- POST /api/auth/register
- GET /api/auth/me

### Insumos
- GET /api/insumos
- GET /api/insumos/{id}
- POST /api/insumos
- PUT /api/insumos/{id}
- DELETE /api/insumos/{id}

### Produtos
- GET /api/produtos
- GET /api/produtos/{id}
- POST /api/produtos
- PUT /api/produtos/{id}
- DELETE /api/produtos/{id}
- GET /api/produtos/{id}/insumos
- POST /api/produtos/{id}/insumos
- DELETE /api/produtos/{id}/insumos/{insumoId}

### Pedidos
- GET /api/pedidos
- GET /api/pedidos/{id}
- POST /api/pedidos
- PUT /api/pedidos/{id}
- DELETE /api/pedidos/{id}
- GET /api/pedidos/ativos
- POST /api/pedidos/{id}/itens
- DELETE /api/pedidos/{id}/itens/{itemId}

### Cálculos
- GET /api/calculos/insumos-necessarios - calcula insumos para pedidos ativos
- GET /api/calculos/sugestao-compras

### Dashboard
- GET /api/dashboard/vendas-mes
- GET /api/dashboard/vendas-evolucao
- GET /api/dashboard/produtos-mais-vendidos
- GET /api/dashboard/receita-por-tipo
- GET /api/dashboard/resumo

## 6. Estrutura de Diretórios

### Backend (Java)
```
dash-backend/
├── src/main/java/com/ladecasa/
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   └── CorsConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── InsumoController.java
│   │   ├── ProdutoController.java
│   │   ├── PedidoController.java
│   │   ├── CalculoController.java
│   │   └── DashboardController.java
│   ├── model/
│   │   ├── Usuario.java
│   │   ├── Insumo.java
│   │   ├── Produto.java
│   │   ├── ProdutoInsumo.java
│   │   ├── Pedido.java
│   │   └── PedidoItem.java
│   ├── repository/
│   ├── service/
│   ├── dto/
│   ├── security/
│   └── LaDeCasaApplication.java
├── src/main/resources/
│   ├── application.properties
│   └── data.sql
└── pom.xml
```

### Frontend (React)
```
dash-frontend/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   └── Login.jsx
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── Insumos/
│   │   │   ├── InsumosList.jsx
│   │   │   └── InsumoForm.jsx
│   │   ├── Produtos/
│   │   │   ├── ProdutosList.jsx
│   │   │   ├── ProdutoForm.jsx
│   │   │   └── ProdutoInsumos.jsx
│   │   ├── Pedidos/
│   │   │   ├── PedidosList.jsx
│   │   │   └── PedidoForm.jsx
│   │   ├── Calculos/
│   │   │   └── InsumosNecessarios.jsx
│   │   └── Dashboard/
│   │       └── Dashboard.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── theme/
│   │   └── theme.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

## 7. Fluxo de Cálculo de Insumos

1. Usuário acessa "Cálculo de Insumos"
2. Sistema busca todos os pedidos com status ATIVO
3. Para cada item do pedido:
   - Busca a receita (produto)
   - Busca os insumos da receita
   - Multiplica quantidade do insumo × quantidade do pedido
4. Agrega todos os insumos necessários
5. Compara com estoque atual
6. Exibe:
   - Insumos necessários
   - Estoque disponível
   - Diferença (o que precisa comprar)

## 8. Segurança

- Senhas armazenadas com BCrypt
- Tokens JWT com expiração de 24h
- CORS configurado para aceitar apenas origem do frontend
- Validação de entrada em todos os endpoints
- Autorização baseada em roles

## 9. Próximos Passos

1. Configurar projeto Spring Boot
2. Criar entidades e repositories
3. Implementar services e controllers
4. Configurar segurança e JWT
5. Criar projeto React
6. Implementar componentes e páginas
7. Integrar frontend e backend
8. Testes e ajustes finais
