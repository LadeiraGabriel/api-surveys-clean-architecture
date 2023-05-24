# Login


##  Caso de sucesso


### 1. 🚫 Receber a requisição do tipo post na rota api/login.
### 2. 🚫 validar os campos de  e-mail, password.
### 3. 🚫 verificar se o e-mail é valido.
### 4. 🚫 verica se existe uma conta com o email apresentado.
### 7. 🚫 compara a password com a password-hash salva.""
### 8. 🚫 atualiza o token de acesso do usuário.   
### 9. 🚫 retonar 200, token de acesso e nome do usuário.

<br/>

## Exceções


### 1. 🚫 retornar 404 caso a rota não encontrada.
### 2. 🚫 retornar 400 caso os campos obrigatórios não sejam fornecidos. 
### 3. 🚫 retornar 401 caso o e-mail não seja encontrado.
### 4. 🚫 retornar 401 caso password seja diferente de password-hash.
### 5. 🚫 retornar 500 caso a geração do token de acesso do usuario falhar.
### 6. 🚫 retornar 500 caso a atualização do token falhar.
### 7. 🚫 retornar 500 caso a buscar pelo usuario atrás do e-mail falhar.
