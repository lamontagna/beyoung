# API Pedidos 1.0v
---


## - Tutorial Para o funcionamento da API REST Pedidos -

### REPOSITÓTIO GITHUB: 

### Pré-Requisitos:

* Para executar o projeto é necessário ter instalado:
    - o Node.js
    - VSCode(IDE de preferencia) e; 
    - Postman(Para testar)

### Estrutura do Projeto:

>\beyoung
app.jspackege-lock.json 
READEME.txt
\beyoung\models
\beyoung\models\Pedido.js
\beyoung\node_modules => Esta pasta será adicionada com a instalação das dependências indicadas abaixo.

- Extrair a pasta com o projeto para uma área em seu computador.

### A partir do VSCode:

- Abrir a pasta raiz do projeto Node.JS no VSCode;

- Abrir o terminal no VSCode e instalar as seguintes dependências:
   > npm install --save express
   - Faz a comunicação com o banco de dados Mongodb
    > npm install mongoose@5.11.15
   - Faz o envio de dados para o banco
    > npm install --save body-parser
   - Faz a validação dos campos
    > npm install --save express-validator

### Ainda no terminal executar o projeto:
>PS C:\Users\Alexandre\Desktop\beyoung> node app.js
API rodando!
Banco de dados conectado

Após exibidas as mensagens acima no terminal, podemos efetuar o teste a partir do Postman

O projeto está utilizando banco de dados Mongodb na Cloud, e está habilitado para acesso a partir de qualquer IP, porém caso não conseguir o acesso ao banco, informar o seu IP, para ser adicionado no banco para liberação de acesso.

Utilize o Postman para criar requisição usando os métodos abaixo com suas respectivas rotas, acessando a aba Body, e habilitando os itens Raw e em seguida Json.

### Exemplo para metodo POST:
>{
    "nome": "Carlos Soares",
    "email": "soares@ig.com.br" ,
    "cpf": "25378238005",
    "cep": "03807020",
    "frete": 5000,
    "valor": 50000,
    "itens":[
        {
            "sku":"CA001",
            "descricao":"Cabo extensor USB 1,5mt",
            "valor":200,
            "quantidade":2
        },
        {
            "sku":"CA002",
            "descricao":"Cabo extensor USB 3mt",
            "valor":100,
            "quantidade":1
        }
    ]    
}

- OBS.: Para a validação dos campos considerar a seguinte regra:
'nome' => String com minimo de 5 caracteres
'email'=> Faz a validação do e-mail verificando @ e ponto
'cpf'  => Numérico com mínimo de 11 caracteres
'cep'  => Numérico com mínimo de 8 caracteres
'frete'=> Numérico com mínimo de 1 caracteres
'valor'=> Numérico com mínimo de 1 caracteres
itens => Array
   sku => String com mínimo de 1 caractere
   descricao => String com mínimo de 1 caracteres
   valor => Numérico com mínimo de 1 caractere não podendo ser menor que zero
   quantidade => Numérico com mínimo de 1 caractere não podendo ser menor que um


### Rotas:

>Para GRAVAR o pedido:
POST: http://localhost:8080/pedido

>Para LISTAR todos os pedidos:
GET: http://localhost:8080/pedidos

>Para PESQUISAR o pedido pelo ID:
GET: http://localhost:8080/pedido/<informe o ID>

>Para DELETAR o pedido pelo ID:
DELETE: http://localhost:8080/pedido/<informe o ID>

