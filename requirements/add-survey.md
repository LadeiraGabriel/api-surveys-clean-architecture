# Add Survey


##  Caso de sucesso


### 1. 🚫 Receber a requisição do tipo post na rota api/add-survey.
### 2. 🚫 validar se o usuario é um admin.
### 2. 🚫 validar os campos de question e answers.
### 3. 🚫 criar a enquete.
### 4. ✅ retonar 204 ao usuario.

<br/>

## Exceções


### 1. 🚫 retornar 404 caso a rota não encontrada.
### 2. ✅ retornar 400 caso os campos obrigatórios não sejam fornecidos. 
### 3. 🚫 retornar 403 caso o usuario não seja um admin.
### 4. ✅ retornar 500 caso a criação da enquete falhe.