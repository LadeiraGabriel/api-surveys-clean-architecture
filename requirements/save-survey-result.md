# Save Survey Result


##  Caso de sucesso


### 1. 🚫 Receber a requisição do tipo **PUT** na rota **api/survey/{survey-id}/result**.
### 2. 🚫 valida se a requisição foi feita por um usuário.
### 3. 🚫 valida se a entiquete existe atráves do id.
### 4. 🚫 valida se o campo **anwer** é uma resposta válida.
### 5. 🚫 **Cria** um resultado da enquete com os dados fornecidos caso não tenha um registro.
### 6. 🚫 **Atualiza** um resultado da enquete com os dados fornecidos caso ja exista um registro.
### 7. 🚫 Retorna **200** com os dados do resultado da enquete.

<br/>

## Exceções


### 1. 🚫 retornar 404 caso a rota não encontrada.
### 2. 🚫 retornar 400 caso os campos obrigatórios não sejam fornecidos. 
### 3. 🚫 retornar 403 caso o usuario não seja válido.
### 4. 🚫 retornar 403 caso o **survey-id** não seja válido.
### 5. 🚫 retornar 403 caso o **anwer** não seja válido.
### 6. 🚫 retornar 500 caso a criação do resultado da enquete falhar.
### 7. 🚫 retornar 500 caso a atualização do resultado da enquete falhar.