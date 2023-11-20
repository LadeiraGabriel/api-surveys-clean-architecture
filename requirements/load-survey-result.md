# Load Survey Result


##  Caso de sucesso


### 1. 🚫 Receber a requisição do tipo **GET** na rota **api/survey/{survey-id}/result**.
### 2. 🚫 valida se a requisição foi feita por um usuário.
### 3. 🚫 valida se a entiquete existe atráves do id.
### 4. 🚫 Retorna **200** com os dados do resultado da enquete.

<br/>

## Exceções


### 1. 🚫 retornar 404 caso a rota não encontrada.
### 2. 🚫 retornar 400 caso os campos obrigatórios não sejam fornecidos. 
### 3. 🚫 retornar 403 caso o usuario não seja válido.
### 4. 🚫 retornar 403 caso o **survey-id** não seja válido.
### 7. 🚫 retornar 500 caso o carregamento do resultado das enquetes falhar.