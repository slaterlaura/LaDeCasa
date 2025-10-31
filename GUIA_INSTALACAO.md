# Guia de Instalação e Execução

Este guia fornece instruções detalhadas para instalar e executar o sistema de gestão de insumos da Lá de Casa Cozinha Artesanal.

## 📋 Requisitos do Sistema

### Software Necessário

**Backend:**
- Java Development Kit (JDK) 11 ou superior
- Maven 3.6 ou superior

**Frontend:**
- Node.js 18 ou superior
- pnpm (gerenciador de pacotes)

### Verificar Instalações

```bash
# Verificar Java
java -version

# Verificar Maven
mvn -version

# Verificar Node.js
node -version

# Instalar pnpm (se necessário)
npm install -g pnpm
```

## 🔧 Instalação

### 1. Obter o Código

Os arquivos do projeto estão localizados em:
- Backend: `/home/ubuntu/la-de-casa-backend`
- Frontend: `/home/ubuntu/la-de-casa-frontend`

### 2. Configurar o Backend

```bash
# Navegar para o diretório do backend
cd /home/ubuntu/la-de-casa-backend

# Compilar o projeto
mvn clean package -DskipTests

# O arquivo JAR será gerado em:
# target/gestao-insumos-1.0.0.jar
```

### 3. Configurar o Frontend

```bash
# Navegar para o diretório do frontend
cd /home/ubuntu/la-de-casa-frontend

# Instalar dependências
pnpm install
```

## ▶️ Execução

### Executar o Backend

**Opção 1: Execução direta**
```bash
cd /home/ubuntu/la-de-casa-backend
java -jar target/gestao-insumos-1.0.0.jar
```

**Opção 2: Execução em background**
```bash
cd /home/ubuntu/la-de-casa-backend
nohup java -jar target/gestao-insumos-1.0.0.jar > backend.log 2>&1 &
```

O backend estará disponível em: `http://localhost:8080/api`

### Executar o Frontend

```bash
cd /home/ubuntu/la-de-casa-frontend
pnpm run dev
```

O frontend estará disponível em: `http://localhost:3000`

## 🔐 Primeiro Acesso

1. Abra o navegador e acesse: `http://localhost:3000`
2. Faça login com as credenciais padrão:
   - **Email**: admin@ladecasa.com
   - **Senha**: admin123

## 🧪 Testar a API

### Testar Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ladecasa.com","senha":"admin123"}'
```

### Testar Listagem de Insumos

```bash
# Primeiro faça login e copie o token
TOKEN="seu_token_aqui"

curl -X GET http://localhost:8080/api/insumos \
  -H "Authorization: Bearer $TOKEN"
```

## 🗄️ Acessar o Console H2

O banco de dados H2 possui um console web para visualização e consultas SQL.

1. Acesse: `http://localhost:8080/api/h2-console`
2. Configure a conexão:
   - **JDBC URL**: `jdbc:h2:mem:ladecasa`
   - **User Name**: `sa`
   - **Password**: (deixe vazio)
3. Clique em "Connect"

## 📊 Dados Iniciais

O sistema vem com dados de exemplo pré-carregados:

### Usuário
- Fernanda de Almeida (admin@ladecasa.com)

### Insumos (10 itens)
- Chocolate 70%, Farinha de Trigo, Açúcar, Ovos, Manteiga
- Morangos, Pectina, Aveia, Mel, Castanhas

### Produtos (4 itens)
- Brownie Tradicional
- Geleia de Morango
- Granola Caseira
- Compota de Frutas Vermelhas

Cada produto já possui sua receita (insumos) configurada.

## 🔧 Configurações Avançadas

### Alterar Porta do Backend

Edite o arquivo `src/main/resources/application.properties`:
```properties
server.port=8080
```

### Alterar Porta do Frontend

Edite o arquivo `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### Configurar Banco de Dados PostgreSQL

Para usar PostgreSQL em produção, edite `application.properties`:

```properties
# PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/ladecasa
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

E adicione a dependência no `pom.xml`:
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

## 🐛 Solução de Problemas

### Erro: "Port already in use"

**Backend (porta 8080):**
```bash
# Encontrar processo usando a porta
lsof -i :8080

# Matar o processo
kill -9 PID
```

**Frontend (porta 3000):**
```bash
# Encontrar processo usando a porta
lsof -i :3000

# Matar o processo
kill -9 PID
```

### Erro: "Cannot connect to backend"

1. Verifique se o backend está rodando:
```bash
curl http://localhost:8080/api/auth/login
```

2. Verifique os logs do backend:
```bash
tail -f backend.log
```

### Erro: "CORS policy"

Verifique se o CORS está configurado corretamente no backend (`CorsConfig.java`).

### Erro de Compilação do Backend

```bash
# Limpar cache do Maven
mvn clean

# Recompilar
mvn package -DskipTests
```

### Erro de Dependências do Frontend

```bash
# Limpar node_modules e cache
rm -rf node_modules pnpm-lock.yaml

# Reinstalar
pnpm install
```

## 📦 Build para Produção

### Backend

```bash
cd /home/ubuntu/la-de-casa-backend
mvn clean package -DskipTests

# O JAR estará em target/gestao-insumos-1.0.0.jar
```

### Frontend

```bash
cd /home/ubuntu/la-de-casa-frontend
pnpm run build

# Os arquivos otimizados estarão em dist/
```

## 🚀 Deploy

### Deploy do Backend

1. Copie o JAR para o servidor
2. Configure variáveis de ambiente para produção
3. Execute com:
```bash
java -jar -Dspring.profiles.active=prod gestao-insumos-1.0.0.jar
```

### Deploy do Frontend

1. Faça build do projeto
2. Copie os arquivos da pasta `dist/` para um servidor web (Nginx, Apache)
3. Configure o proxy reverso para o backend

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique os logs do backend e frontend
2. Consulte a documentação da API
3. Verifique o console do navegador para erros do frontend

## ✅ Checklist de Instalação

- [ ] Java 11+ instalado
- [ ] Maven instalado
- [ ] Node.js 18+ instalado
- [ ] pnpm instalado
- [ ] Backend compilado com sucesso
- [ ] Frontend com dependências instaladas
- [ ] Backend rodando na porta 8080
- [ ] Frontend rodando na porta 3000
- [ ] Login funcionando
- [ ] Dados de exemplo carregados

---

**Importante**: Este guia assume um ambiente de desenvolvimento. Para produção, configure adequadamente segurança, banco de dados e variáveis de ambiente.
