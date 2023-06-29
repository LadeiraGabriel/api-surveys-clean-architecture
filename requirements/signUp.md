# Cadastro

##  Caso de sucesso

### 1. ✅ Receber a requisição do tipo post na rota api/signup.
### 2. ✅ validar os campos de name, e-mail, password e password-confimation.
### 3. ✅ verificar se o e-mail é  valido.
### 4. ✅ vericar se ja existe uma conta com o email apresentado.
### 5. ✅ comparar password com password-confirmation.
### 6. ✅ transformar a senha em uma hash.
### 7. ✅ salvar os dados corretos no banco de dados com a senha encriptada.
### 8. ✅ cria o token de acesso para o novo usuário.   
### 9. ✅ retonar 200 token de acesso e nome do usuário.
<br/>

## Exceções
### 1. ✅ retornar 404 caso a rota não encontrada.
### 2. ✅ retornar 400 caso os campos obrigatórios não sejam fornecidos. 
### 3. ✅ retornar 400 caso password seja diferente de password-confirmation.
### 4. ✅ retornar 400 caso o e-mail não seja um e-mail valido.
### 5. ✅ retornar 403 caso o e-mail já esteja sendo utilizado.
### 6. ✅ retornar 500 caso a encriptação da password falhar.
### 7. ✅ retornar 500 caso a geração do token de acesso do usuario falhar.
### 8. ✅ retornar 500 caso a criação do usuario no banco falhar.
### 9. ✅ retornar 500 caso a atualização do token falhar.
 