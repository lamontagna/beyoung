const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { body, validationResult } = require('express-validator');

// configurar o body-parser
app.use(bodyParser.json());

// Configuração  do MongoDB
mongoose.connect("mongodb+srv://lamontagna:alm0501@cluster0.746gk.mongodb.net/Pedido", {
   useNewUrlParser: true,
   useUnifiedTopology: true
} ,() => {
   console.log("Banco de dados conectado");
})
// Carregando model de Pedido
require("./models/Pedido")
const Pedido = mongoose.model("Pedido");

// Endpoints

// Cadastro
app.post("/pedido", [
   // Valida os campos
   body('nome').isLength({ min: 5 }),
   body('email').isEmail(),
   body('cpf').isNumeric().isLength({ min: 11 }),
   body('cep').isNumeric().isLength({ min: 8 }),
   body('frete').isNumeric().isLength({ min: 1 }),
   body('valor').isNumeric().isLength({ min: 1 }),
   body(`itens`).isArray()
],(req, res) => {

   function validarItens(itens){
      let i = 0;
      let hasErrors = false;

      listaDeErros = new Array();

      itens.forEach( item => {
         i++
         if (item.sku == null || item.sku == undefined || item.sku.length < 1) {
            hasErrors = true;
            jsonErro = {
               msg: `Sku do Item ${i} está inválido`,
               value: `${item.sku}`
            }
            listaDeErros.push(jsonErro);
         } 
         if(item.descricao == null || item.descricao == undefined || item.descricao.length < 1){
            hasErrors = true;
            jsonErro = {
               msg: `Descrição do Item ${i} está inválida`,
               value: `${item.descricao}`
            }
            listaDeErros.push(jsonErro);
         }
         if(item.valor == null || item.valor == undefined || item.valor < 0){
            hasErrors = true;
            jsonErro = {
               msg: `Valor do Item ${i} está inválido`,
               value: `${item.valor}`
            }
            listaDeErros.push(jsonErro);
         }
         if(item.quantidade == null || item.quantidade == undefined || item.quantidade < 1){
            hasErrors = true;
            jsonErro = {
               msg: `Quantidade do Item ${i} está inválida`,
               value: `${item.quantidade}`
            }
            listaDeErros.push(jsonErro);
         }


         if (hasErrors) {
            return res.status(422).json({errors: listaDeErros})
         }

      })
   }

   const errors = validationResult(req)
   if (!errors.isEmpty()) {
     return res.status(422).json({ errors: errors.array() })
   }else {
      validarItens(req.body.itens)
   }


   if((req.body.nome != undefined) && req.body.email != undefined && req.body.cpf != undefined && req.body.cep != undefined && req.body.frete != undefined && req.body.valor != undefined && req.body.itens != undefined) {
      
      let listaPedidos = (itensPedido) => {
         let listaDePedidos = new Array();

         itensPedido.forEach(pedido => {
            jsonPedido = {
               sku: pedido.sku,
               descricao: pedido.descricao,
               valor: pedido.valor,
               quantidade: pedido.quantidade
            }

            listaDePedidos.push(jsonPedido);
         });

         return listaDePedidos;
      }

      let itensMontados = listaPedidos(req.body.itens);

      let pedido = new Pedido({
         nome:req.body.nome,
         email:req.body.email,
         cpf:req.body.cpf,
         cep:req.body.cep,
         frete:req.body.frete,
         valor:req.body.valor,
         itens: itensMontados
      });

      pedido.save().then(() => {
         // Dado salvo com sucesso
         res.statusCode = 201
         res.send("Pedido cadastrado com sucesso!");
      }).catch((erro) => {
         if(erro){
            throw erro;
         }
         // Aconteceu alguma falha
         res.statusCode = 417;
         res.send("O pedido não foi cadastrado, verifique possíveis inconsistências nas informações!");
      })
   }else {
      res.statusCode = 406;
      res.send("Verificar a estrutura do json, existe informação inconsistente!");
   }
})

// Listagem geral
app.get("/pedidos",(req, res) => {
   Pedido.find({},(erro, dados) => {
      if(erro){
         res.statusCode = 417;
         res.send("Não foi possível listar os pedidos, verifique possíveis inconsistências nas informações!");
      }
      res.statusCode = 200;
      res.json(dados);
   })
})

// Listagem por ID
app.get("/pedido/:id",(req, res) => {
   Pedido.findById(req.params.id).then((pedido) => {
      if(pedido != null){
         res.statusCode = 200;
         res.json(pedido);
      }else{
         res.send("Pedido não encontrado!");
      }
      //res.statusCode = 200;
      //res.json(pedido);

   }).catch((erro) => {
      if(erro){
         res.statusCode = 417;
         res.send("Não foi possível listar o pedido, verifique possíveis inconsistências nas informações!");
         throw erro;
      }
   })
})

// Deletar

app.delete("/pedido/:id",(req, res) => {
   Pedido.findByIdAndDelete(req.params.id).then((pedido) => {
      if(pedido){
         res.statusCode = 200;
         res.send("Pedido excluido com sucesso!");
      }else{
         res.statusCode = 404;
         res.send("Não foi possível excluir o pedido. Não foi encontrado!");
      }
   }).catch((erro) => {
      if(erro){
         res.statusCode = 417;
         res.send("Não foi possível excluir o pedido, verifique possíveis inconsistências nas informações!");
         throw erro;
      }
   });
})

app.listen(8080,() => {
   console.log("API rodando!");
})