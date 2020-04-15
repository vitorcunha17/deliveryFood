var Usuario = require('../models/Usuario');

module.exports = function(app){
  app.get("/usuarios", (request, response) => {
    Usuario.find((error, usuarios) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao procurar os usuários no banco."});
      }else{
        response.json({tipo: "sucesso", mensagem: "Usuários encontrados com sucesso.", usuarios});
      }
    });
  });

  app.post("/usuarios", (request, response) => {
    var usuario = new Usuario(request.body);

    usuario.save((error, usuario) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao adicionar o usuário ao banco."});
      }else{
        response.json({tipo: "sucesso", mensagem: "Usuário adicionado ao banco.", usuario});
      }
    });
  });

  app.post("/usuarios/login", (request, response) => {
    Usuario.findOne({login: request.body.login, senha: request.body.senha}, (error, usuario) => {
      if(error){
        console.error(error);
        response.status(500).json({tipo: "erro", mensagem: "Houve um erro ao procurar usuário no banco."});
      }else{
        if(usuario){
          response.json({tipo: "sucesso", mensagem: "Usuário logado com sucesso.", usuario});
        }else{
          response.status(404).json({tipo: "erro", mensagem: "Login ou senha incorretos."});
        }
      }
    });
  });
}
