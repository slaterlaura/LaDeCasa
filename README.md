# Lá de Casa - Sistema de Gestão de Insumos

Sistema completo de gestão de insumos para **Lá de Casa Cozinha Artesanal**, desenvolvido com **React** (frontend) e **Java Spring Boot** (backend).

## 📋 Sobre o Projeto

Este repositório reúne o desenvolvimento de um software para a empresa Lá de Casa: Cozinha Artesanal, realizado como parte de um projeto de extensão universitária do Ibmec São Paulo em parceria com a ONG Aventura de Construir.

O projeto tem como propósito apoiar o fortalecimento da gestão e do crescimento sustentável da empresa Lá de Casa, por meio da criação de uma solução tecnológica que atenda suas principais necessidades operacionais e estratégicas.

O sistema foi desenvolvido para otimizar a gestão de pedidos e produção da Lá de Casa Cozinha Artesanal, empresa fundada por Fernanda de Almeida, focada na produção artesanal de alimentos (geleias, brownies, granolas e compotas) com forte apelo à memória afetiva, sustentabilidade e ingredientes naturais.

### Funcionalidades Principais

**Gestão de Insumos**
- Cadastro completo de insumos com controle de estoque
- Alertas de estoque mínimo
- Controle de preços unitários
- Diferentes unidades de medida (kg, g, L, ml, unidade)

**Gestão de Produtos (Receitas)**
- Cadastro de produtos por tipo (Brownie, Geleia, Granola, Compota)
- Associação de insumos às receitas
- Definição de quantidades necessárias por insumo
- Controle de preço de venda

**Gestão de Pedidos**
- Criação e acompanhamento de pedidos
- Controle de status (Ativo, Concluído, Cancelado)
- Adição de itens aos pedidos
- Cálculo automático de valores

**Cálculo Automático de Insumos**
- Análise de todos os pedidos ativos
- Cálculo agregado de insumos necessários baseado nas receitas
- Comparação com estoque disponível
- Sugestão automática de compras

**Dashboard Administrativo**
- Resumo de vendas do mês e ano
- Evolução de vendas por mês
- Produtos mais vendidos
- Receita por tipo de produto
- Gráficos interativos

## 🎨 Identidade Visual

O sistema utiliza a paleta de cores da marca:
- **Bordô**: #7C324C (cor principal)
- **Azul Claro**: #ACC1CC (cor secundária)
- **Bege**: #F4EFEA (fundo)

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 11**
- **Spring Boot 2.7.18**
- **Spring Security** com autenticação JWT
- **Spring Data JPA** com Hibernate
- **H2 Database** (desenvolvimento)
- **Maven** para gerenciamento de dependências

### Frontend
- **React 18**
- **Vite** como build tool
- **Material-UI (MUI)** para componentes
- **React Router** para navegação
- **Axios** para requisições HTTP
- **Recharts** para gráficos
- **Context API** para gerenciamento de estado

## 📦 Estrutura do Projeto

```
/home/ubuntu/
├── la-de-casa-backend/          # Backend Java Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/ladecasa/
│   │   │   │   ├── config/      # Configurações (Security, CORS)
│   │   │   │   ├── controller/  # Controllers REST
│   │   │   │   ├── model/       # Entidades JPA
│   │   │   │   ├── repository/  # Repositories
│   │   │   │   ├── service/     # Lógica de negócio
│   │   │   │   ├── dto/         # Data Transfer Objects
│   │   │   │   └── security/    # JWT e autenticação
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── data.sql     # Dados iniciais
│   │   └── test/
│   └── pom.xml
│
└── la-de-casa-frontend/         # Frontend React
    ├── src/
    │   ├── components/
    │   │   ├── Auth/            # Login
    │   │   ├── Layout/          # Navbar, Sidebar
    │   │   ├── Insumos/         # Gestão de insumos
    │   │   ├── Produtos/        # Gestão de produtos
    │   │   ├── Pedidos/         # Gestão de pedidos
    │   │   ├── Calculos/        # Cálculo de insumos
    │   │   └── Dashboard/       # Dashboard
    │   ├── context/             # AuthContext
    │   ├── services/            # API client
    │   ├── theme/               # Tema MUI customizado
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## 🔧 Como Executar

### Pré-requisitos
- Java 11 ou superior
- Maven 3.6+
- Node.js 22+
- pnpm

### Backend

1. Navegue até o diretório do backend:
```bash
cd /home/ubuntu/la-de-casa-backend
```

2. Compile o projeto:
```bash
mvn clean package -DskipTests
```

3. Execute a aplicação:
```bash
java -jar target/gestao-insumos-1.0.0.jar
```

O backend estará disponível em: `http://localhost:8080/api`

### Frontend

1. Navegue até o diretório do frontend:
```bash
cd /home/ubuntu/la-de-casa-frontend
```

2. Instale as dependências:
```bash
pnpm install
```

3. Execute o servidor de desenvolvimento:
```bash
pnpm run dev
```

O frontend estará disponível em: `http://localhost:3000`

## 🔐 Credenciais de Acesso

**Usuário Padrão:**
- Email: `admin@ladecasa.com`
- Senha: `admin123`

## 📊 Dados de Exemplo

O sistema vem pré-configurado com dados de exemplo:

**Insumos:**
- Chocolate 70%, Farinha de Trigo, Açúcar, Ovos, Manteiga
- Morangos, Pectina, Aveia, Mel, Castanhas

**Produtos:**
- Brownie Tradicional
- Geleia de Morango
- Granola Caseira
- Compota de Frutas Vermelhas

Cada produto já possui suas receitas (insumos) configuradas.

## 🔌 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `GET /api/auth/me` - Dados do usuário autenticado

### Insumos
- `GET /api/insumos` - Listar todos
- `GET /api/insumos/ativos` - Listar ativos
- `GET /api/insumos/{id}` - Buscar por ID
- `POST /api/insumos` - Criar
- `PUT /api/insumos/{id}` - Atualizar
- `DELETE /api/insumos/{id}` - Desativar

### Produtos
- `GET /api/produtos` - Listar todos
- `GET /api/produtos/{id}` - Buscar por ID
- `POST /api/produtos` - Criar
- `PUT /api/produtos/{id}` - Atualizar
- `DELETE /api/produtos/{id}` - Desativar
- `GET /api/produtos/{id}/insumos` - Listar insumos do produto
- `POST /api/produtos/{id}/insumos` - Adicionar insumo
- `DELETE /api/produtos/{id}/insumos/{insumoId}` - Remover insumo

### Pedidos
- `GET /api/pedidos` - Listar todos
- `GET /api/pedidos/ativos` - Listar ativos
- `GET /api/pedidos/{id}` - Buscar por ID
- `POST /api/pedidos` - Criar
- `PUT /api/pedidos/{id}` - Atualizar
- `DELETE /api/pedidos/{id}` - Deletar
- `POST /api/pedidos/{id}/itens` - Adicionar item
- `DELETE /api/pedidos/{id}/itens/{itemId}` - Remover item

### Cálculos
- `GET /api/calculos/insumos-necessarios` - Calcular insumos necessários
- `GET /api/calculos/sugestao-compras` - Sugestão de compras

### Dashboard
- `GET /api/dashboard/resumo` - Resumo geral
- `GET /api/dashboard/vendas-evolucao` - Evolução de vendas
- `GET /api/dashboard/produtos-mais-vendidos` - Produtos mais vendidos
- `GET /api/dashboard/receita-por-tipo` - Receita por tipo

## 🔒 Segurança

- Autenticação via JWT (JSON Web Tokens)
- Senhas criptografadas com BCrypt
- CORS configurado
- Proteção de rotas
- Session stateless

## 🗄️ Banco de Dados

O sistema utiliza **H2 Database** em memória para desenvolvimento. O console H2 está disponível em:
`http://localhost:8080/api/h2-console`

**Configurações de conexão:**
- JDBC URL: `jdbc:h2:mem:ladecasa`
- Username: `sa`
- Password: (vazio)

## 📝 Fluxo de Uso

1. **Login** no sistema com as credenciais fornecidas
2. **Cadastrar Insumos** com estoque inicial
3. **Cadastrar Produtos** e associar insumos (receitas)
4. **Criar Pedidos** e adicionar produtos
5. **Acessar Cálculo de Insumos** para ver o que precisa comprar
6. **Visualizar Dashboard** para acompanhar vendas

## 🎯 Casos de Uso

### Exemplo: Criar um Pedido

1. Acesse **Pedidos** no menu lateral
2. Clique em **Novo Pedido**
3. Preencha os dados do cliente e datas
4. Clique em **Salvar**
5. Na lista, clique no ícone de carrinho para adicionar itens
6. Selecione produtos e quantidades
7. O sistema calculará automaticamente os valores

### Exemplo: Calcular Insumos Necessários

1. Crie alguns pedidos com status **ATIVO**
2. Acesse **Cálculo de Insumos** no menu
3. O sistema mostrará:
   - Todos os insumos necessários
   - Comparação com estoque atual
   - Sugestão do que precisa comprar

## 🚀 Próximos Passos

- Migrar para PostgreSQL em produção
- Implementar relatórios em PDF
- Adicionar notificações por email
- Criar módulo de fornecedores
- Implementar controle de custos de produção

## 👥 Autores

Desenvolvido para **Lá de Casa Cozinha Artesanal**

## 🤝 Parcerias

- **ONG Aventura de Construir** – Apoio ao empreendedorismo comunitário
- **Lá de Casa: Cozinha Artesanal** – Empreendimento parceiro beneficiado pelo projeto
- **Ibmec São Paulo** – Projeto de extensão universitária

## 📚 O que está sendo desenvolvido

- Levantamento de requisitos em conjunto com a empresa e a ONG
- Planejamento da arquitetura do sistema
- Implementação de funcionalidades para gestão do negócio
- Testes, documentação e treinamentos para uso da solução

---

**Nota**: Este é um sistema de gestão completo e funcional, pronto para uso em ambiente de desenvolvimento. Para produção, recomenda-se ajustar as configurações de segurança e banco de dados.
