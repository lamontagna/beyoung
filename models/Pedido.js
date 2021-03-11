const mongoose = require("mongoose");
//const { createPrivateKey } = require("node:crypto");
//const { copyFile } = require("node:fs");

// Pedido
/*
Campo             Descricao
nome              Obrigatório. Nome do cliente
email             Obrigatório. Validar formato do e-mail
cpf               Obrigatório. Validar formato do CPF
cep               Obrigatório. Validar formato do CEP
frete             Obrigatório. Valor do frete
valor             Obrigatório. Valor total do pedido
itens             Obrigatório. Array
itens.sku         Obrigatório. SKU do produto
itens.descricao   Obrigatório. Descrição do produto
itens.valor       Obrigatório. Valor do produto
itens.quantidade  Obrigatório. Quantidade do produto
*/

mongoose.model("Pedido", {
   nome:{type:String},
   email:{type:String},
   cpf:{type:String},
   cep:{type:String},
   frete:{type:Number},
   valor:{type:Number},
   itens:[
      {
         sku:{type:String},
         descricao:{type:String},
         valor:{type:Number},
         quantidade:{type:Number}
      }
   ]

});