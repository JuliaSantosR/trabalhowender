# 🎓 Juliastore - Projeto Fullstack Simples

Aplicação fullstack desenvolvida para fins acadêmicos, composta por:

- **Frontend** em React (`/E-commerce`) – vitrine e fluxo de compras
- **Backend** em Java Spring Boot (`/backend-java`) – autenticação de usuários

O objetivo é demonstrar um e-commerce simples com integração real entre frontend e backend.

---

## Estrutura do Repositório

```
juliastore/
├── backend-java/     # API REST (Spring Boot + H2)
└── E-commerce/       # Frontend React
```

---

## Tecnologias Principais

| Camada | Tecnologias |
|--------|-------------|
| Frontend | React 18, Yup, Styled Components, Axios |
| Backend  | Java 11, Spring Boot 2.7, H2 Database, BCrypt |

---

## Como Executar

### 1. Backend (porta `8080`)
```bash
cd backend-java
mvn spring-boot:run
```
Acessível em `http://localhost:8080`

### 2. Frontend (porta `3000`)
```bash
cd E-commerce
npm install
npm start
```
Acessível em `http://localhost:3000`

---

## Fluxo de Autenticação

1. Usuário se registra no frontend
2. Frontend envia requisição para `POST /auth/register`
3. Backend salva usuário no banco H2 (senha criptografada com BCrypt)
4. Backend retorna token (UUID simples) e dados do usuário
5. Frontend guarda o token e os dados no `localStorage` para manter a sessão

---

## API do Backend (Resumo)

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth/register` | Cria usuario (nome, email e senha) |
| `POST` | `/auth/login` | Login com email e senha |
| `POST` | `/auth/reset` | Reset de senha (gera a nova senha simples: 123456) |
| `GET`  | `/auth/user/{email}` | Busca usuraio por e-mail |

Banco: H2 Memory – console em `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:juliastore`
- Usuário: `sa`
- Senha: *(vazio)*

---

## Funcionalidades do Frontend

- Catálogo com categorias (Masculino, Feminino, Joalheria, Eletrônicos)
- Busca por produtos
- Detalhe do produto
- Carrinho com atualização em tempo real
- Checkout (Entrega + Pagamento fictício)
- Autenticação (Registro, Login, Reset)

---

## 📄 Outros READMEs

- `backend-java/README.md` – detalhes específicos da API
- `E-commerce/README.md` – detalhes do frontend


Feito com ☕ e 📚 para a faculdade. 
Obrigada!

