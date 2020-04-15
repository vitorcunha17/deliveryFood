var Ingrediente = require('../models/Ingrediente');
var Adicional = require('../models/Adicional');

module.exports = function(app, io){
  app.get("/ingredientes", (request, response) => {
    Ingrediente.find().populate("adicional").populate("categoria").exec((error, ingredientes) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Não foi possível obter os ingredientes.", error});
      }else{
        response.json({tipo: "sucesso", mensagem: "Ingredientes encontrados com sucesso.", ingredientes});
      }
    });
  });

  app.post("/ingredientes", (request, response) => {
    if(request.body.adicional===false){
      delete request.body.adicional;
      var ingrediente = new Ingrediente(request.body);
      ingrediente.save((error, ingrediente) => {
        if(error){
          console.error(error);
          response.status(500).json({tipo: "erro", mensagem: "Não foi possível adicionar o ingrediente ao banco."});
        }else{
          Ingrediente.populate(ingrediente, {path: "categoria"}, (error, ingrediente) => {
            if(error){
              console.error(error);
              response.status(500).json({tipo: "erro", mensagem: "Não foi possível popular o ingrediente com sua categoria."});
            }else{
              response.json({tipo: "sucesso", mensagem: "Ingrediente adicionado com sucesso.", ingrediente});
            }
          });
        }
      });
    }else{
      var ingrediente = new Ingrediente(request.body);
      var adicional = new Adicional({preco: request.body.preco, ingrediente: ingrediente._id});
      ingrediente.adicional = adicional._id;

      adicional.save((error) => {
        if(error){
          console.error(error);
        }
      });

      ingrediente.save((error, ingrediente) => {
        if(error){
          console.error(error);
          response.status(500).json({tipo: "erro", mensagem: "Não foi possível adicionar o ingrediente ao banco."});
        }else{
          Ingrediente.populate(ingrediente, {path: "categoria"}, (error, ingrediente) => {
            if(error){
              console.error(error);
              response.status(500).json({tipo: "erro", mensagem: "Não foi possível popular o ingrediente com sua categoria."});
            }else{
              ingrediente.adicional = adicional;
              response.json({tipo: "sucesso", mensagem: "Ingrediente adicionado com sucesso.", ingrediente});
            }
          });
        }
      });
    }
  });

  app.patch("/ingredientes/:id", (request, response) => {
    Ingrediente.findOneAndUpdate({_id: request.params.id}, {$set: request.body}, {new: true}, (error, ingrediente) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao editar o ingrediente no banco."});
      }else{
        Adicional.findOneAndUpdate({ingrediente: request.params.id}, {$set: request.body}, (error, adicional) => {
          if(error){
            console.error(error);
            response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao editar o adicional no banco."});
          }else{
            Ingrediente.populate(ingrediente, {path: "categoria"}, (error, ingrediente) => {
              if(error){
                console.error(error);
                response.status(500).json({tipo: "erro", mensagem: "Não foi possível popular o ingrediente com sua categoria."});
              }else{
                ingrediente.adicional = adicional;
                response.json({tipo: "sucesso", mensagem: "Ingrediente editado com sucesso.", ingrediente});
              }
            });
          }
        });
      }
    });
  });

  app.delete("/ingredientes/:id", (request, response) => {
    Ingrediente.remove({_id: request.params.id}, (error) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao deletar o ingrediente do banco."});
      }else{
        response.json({tipo: "sucesso", mensagem: "Ingrediente deletado com sucesso."});
      }
    });

    Adicional.remove({ingrediente: request.params.id}, (error) => {
      if(error){
        console.error(error);
      }
    });
  });
}
