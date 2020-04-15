var Categoria = require('../models/Categoria');

module.exports = function(app, io){
  app.get("/categorias", (request, response) => {
    Categoria.find().exec((error, categorias) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Não foi possível obter as categorias.", error});
      }else{
        response.json({tipo: "sucesso", mensagem: "Categorias encontradas com sucesso.", categorias});
      }
    });
  });

  app.post("/categorias", (request, response) => {
    var categoria = new Categoria(request.body);

    categoria.save((error, categoria) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao adicionar este categoria ao banco.", categoria});
      }else{
        response.json({tipo: "sucesso", mensagem: "Categoria adicionada com sucesso.", categoria});
      }
    });
  });

  app.delete("/categorias/:id", (request, response) => {
    Categoria.remove({_id: request.params.id}, (error) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao deletar esta categoria."});
      }else{
        response.json({tipo: "sucesso", mensagem: "Categoria deletada com sucesso."});
      }
    });
  });
}
