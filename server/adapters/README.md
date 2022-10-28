# Documentação de rotas
Nesse arquivo, realizaremos a especificaçao das rotas externas (de requisição HTTP) já feitas, com relação aos parâmetros esperados, bem como qual a rota e qual o formato de resposta a ser esperado.  
Abaixo, temos um índice com as rotas que serão abordadas. Sinta-se livre para clicar em qualquer uma delas e ir diretamente à de interesse.  
  
<ul id="indexes">
    <li><a href="#users">Users</a></li>
    <li><a href="#badges">Badges</a></li>
    <li><a href="#exercises">Exercises</a></li>
</ul>
  
<div id="users">
    <h2>Users</h2>
    <hr>
    <h3><b>Sign Up</b></h3>
    <b>Method:</b> POST
    <br>
    <b>Route:</b> /users/signUp
    <br>
    <b>Params:</b> Nenhum
    <br>
    <b>Request body:</b>

    {  
        nickname: \<Apelido do usuário\>,  
        password: <Senha do usuário>,  
        email: <Email do usuário>  
    }
   <b>Response format:</b>

    Status: 200 ou 500
    Content: "Usuário cadastrado com sucesso!" ou uma mensagem de erro.
<hr>
<h3><b>Encontrar todos os usuários</b></h3>
    <b>Method:</b> GET
    <br>
    <b>Route:</b> /users
    <br>
    <b>Params:</b> Nenhum
    <br>
    <b>Request body:</b> Vazio
    <br>
    <b>Response format:</b>

    Status: 200 ou 500
    Content: 
        [
            {
                nickname: <Apelido do usuário encontrado>,
                email: <Email do usuário encontrado>,
                score: <Pontuação do usuário encontrado>,
                icon: <Ícone padrão do usuário encontrado>
            },
            {
                ...
            },
            ...
        ]
<hr>
<h3><b>Usuário por ID</b></h3>
    <b>Method:</b> GET
    <br>
    <b>Route:</b> /users/id/:id
    <br>
    <b>Params:</b>
        <b>:id</b> -> ID dp usuário que se quer buscar.
    <br>
    <b>Request body:</b> Vazio
   <b>Response format:</b>

    Status: 200 ou 500
    Content: 
        {
            nickname: <Apelido do usuário encontrado>,
            email: <Email do usuário encontrado>,
            score: <Pontuação do usuário encontrado>,
            icon: <Ícone padrão do usuário encontrado>
        }
<hr>
<h3><b>Usuário por email</b></h3>
    <b>Method:</b> GET
    <br>
    <b>Route:</b> /users/email
    <br>
    <b>Params:</b> Nenhum.
    <br>
    <b>Request body:</b>

        {
            email: <email que se quer buscar>
        }

   <b>Response format:</b>

    Status: 200 ou 500
    Content: 
        {
            nickname: <Apelido do usuário encontrado>,
            email: <Email do usuário encontrado>,
            score: <Pontuação do usuário encontrado>,
            icon: <Ícone padrão do usuário encontrado>
        }
<hr>
<h3><b>Usuário por nickname</b></h3>
    <b>Method:</b> GET
    <br>
    <b>Route:</b> /users/nickname
    <br>
    <b>Params:</b> Nenhum
    <br>
    <b>Request body:</b>

    {
        nickname: <nickname do usuário que se quer buscar>
    }

   <b>Response format:</b>

    Status: 200 ou 500
    Content: 
        [
            {
                nickname: <Apelido do usuário encontrado>,
                email: <Email do usuário encontrado>,
                score: <Pontuação do usuário encontrado>,
                icon: <Ícone padrão do usuário encontrado>
            },
            {
                ...
            },
            ...
        ]
<hr>
<h3><b>Top usuários melhor rankeados</b></h3>
    <b>Method:</b> GET
    <br>
    <b>Route:</b> /users/top/:rank
    <br>
    <b>Params:</b> 
        <b>:rank</b> -> Número de usuários máximo que se quer buscar.
    <br>
    <b>Request body:</b> Vazio

   <b>Response format:</b>

    Status: 200 ou 500
    Content: 
        [
            {
                nickname: <Apelido do usuário encontrado>,
                email: <Email do usuário encontrado>,
                score: <Pontuação do usuário encontrado>,
                icon: <Ícone padrão do usuário encontrado>
            },
            {
                ...
            },
            ...
        ]
<hr>
<h3><b>Usuário por nickname</b></h3>
    <b>Method:</b> GET
    <br>
    <b>Route:</b> /users/nickname
    <br>
    <b>Params:</b> Nenhum
    <br>
    <b>Request body:</b>

    {
        nickname: <nickname do usuário que se quer buscar>
    }

   <b>Response format:</b>

    Status: 200 ou 500
    Content: 
        [
            {
                nickname: <Apelido do usuário encontrado>,
                email: <Email do usuário encontrado>,
                score: <Pontuação do usuário encontrado>,
                icon: <Ícone padrão do usuário encontrado>
            },
            {
                ...
            },
            ...
        ]
<hr>
</div>
<hr>
<div id="badges">
    <h2>Badges</h2>
</div>
<hr>
<div id="exercises">
    <h2>Exercises</h2>
</div>