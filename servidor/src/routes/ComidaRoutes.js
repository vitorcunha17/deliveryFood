var Comida = require('../models/Comida');

module.exports = function(app){
  app.get("/comidas", (request, response) => {
    Comida.find().populate({path: "ingredientes"}).populate({path: "categoria"}).exec((error, comidas) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Não foi possível obter as comidas.", error});
      }else{
        response.json({tipo: "sucesso", mensagem: "Comidas encontradas com sucesso no banco.", comidas});
      }
    });
  });

  app.post("/comidas", (request, response) => {
    var comida = new Comida(request.body);

    comida.save((error, comida) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao adicionar esta comida ao banco.", comida});
      }else{
        Comida.populate(comida, [{path: "categoria"}, {path: "ingredientes"}], (error, comida) => {
          if(error){
            console.error(error);
            response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao popular esta comida."});
          }else{
            response.json({tipo: "sucesso", mensagem: "Comida adicionada com sucesso.", comida});
          }
        });
      }
    });
  });

  app.delete("/comidas/:id", (request, response) => {
    Comida.remove({_id: request.params.id}, (error) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao deletar esta comida do banco."});
      }else{
        response.json({tipo: "sucesso", mensagem: "Comida deletada com sucesso."});
      }
    });
  });

  app.patch("/comidas/:id", (request, response) => {
    Comida.findOneAndUpdate({_id: requset.params.id}, {$set: request.body}, {new: true}, (error, comida) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao editar esta comida do banco."});
      }else{
        response.json({tipo: "sucesso", mensagem: "Comida editada com sucesso.", comida});
      }
    });
  });
}
