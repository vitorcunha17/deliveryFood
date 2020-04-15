var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  nome: String,
  login: String,
  senha: String,
  email: String
}, {versionKey: false});

var Usuario = mongoose.model('Usuario', schema, 'usuarios');

module.exports = Usuario;
