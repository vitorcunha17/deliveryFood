var Adicional = require('../models/Adicional');

module.exports = function(app, io){
  app.get("/adicionais", (request, response) => {
    Adicional.find().populate({path: "ingrediente"}).exec((error, adicionais) => {
      if(error){
        console.error(error);
        response.json({tipo: "erro", mensagem: "Não foi possível obter os adicionais.", error});
      }else{
        response.json(adicionais);
      }
    });
  });

  app.post("/adicionais", (request, response) => {
    var adicional = new Adicional(request.body);

    adicional.save((error, comida) => {
      if(error){
        console.error(error);
        response.json({tipo: "erro", mensagem: "Houve um erro ao adicionar este adicional ao banco.", adicional});
      }else{
        response.json({tipo: "sucesso", mensagem: "Adicional adicionado com sucesso.", adicional});
      }
    });
  });
}
