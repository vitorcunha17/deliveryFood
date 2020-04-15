var Venda = require('../models/Venda');
var Item = require('../models/Item');

module.exports = function(app, io){
  app.get("/vendas", (request, response) => {
    Venda.find({status: {$ne: "finalizado"}}).populate({path: "itens", populate: [{path: "comida"}, {path: "adicionais", populate: {path: "ingrediente"}}]}).exec((error, vendas) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao procurar as vendas do banco."});
      }else{
        response.json({tipo: "success", mensagem: "Vendas encontradas com sucesso.", vendas});
      }
    });
  });

  app.post("/vendas", (request, response) => {
    var venda = new Venda(request.body);
    venda.data = new Date();
    venda.itens = request.body.itens.map((i) => {
      var item = new Item(i);
      item.venda = venda;
      item.save((error, item) => {
        if(error){
          console.error(error);
        }
      });
      return item._id;
    });

    venda.save((error, venda) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao inserir esta venda ao banco."});
      }else{
        venda.populate({path: "itens", populate: [{path: "comida"}, {path: "adicionais", populate: {path: "ingrediente"}}]}, (error, venda) => {
          io.emit("nova venda", venda);
          response.json({tipo: "success", mensagem: "Venda cadastrada com sucesso.", venda});
        });
      }
    });
  });

  app.patch("/vendas/:id", (request, response) => {
    Venda.findOneAndUpdate({_id: request.params.id}, {$set: request.body}, {new: true}, (error, venda) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao editar a venda do banco."});
      }else{
        response.json({tipo: "sucesso", mensagem: "Venda editada com sucesso.", venda});
      }
    });
  });
}
