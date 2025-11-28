# Juliastore Backend

Backend em Java com Spring Boot para autenticação de usuários.

## Tecnologias

- Java 11
- Spring Boot 2.7.14
- Spring Data JPA
- H2 Database (in-memory)
- BCrypt para criptografia de senhas

## Como Executar

```bash
mvn spring-boot:run
```

A API estará disponível em: `http://localhost:8080`

## Endpoints

### POST /auth/register
Registrar novo usuário

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Usuário cadastrado com sucesso",
  "token": "uuid-gerado",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com"
  }
}
```

### POST /auth/login
Fazer login

**Request:**
```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "token": "uuid-gerado",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com"
  }
}
```

### POST /auth/reset
Resetar senha

**Request:**
```json
{
  "email": "joao@email.com",
  "newPassword": "novaSenha123"
}
```

### GET /auth/user/{email}
Buscar usuário por email

## H2 Console

Acesse: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:juliastore`
- Username: `sa`
- Password: (deixe vazio)
