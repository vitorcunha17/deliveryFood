var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  nome: String,
  adicional: {type: mongoose.Schema.Types.ObjectId, ref: "Adicional"},
  categoria: {type: mongoose.Schema.Types.ObjectId, ref: "Categoria"}
}, {versionKey: false});

var Ingrediente = mongoose.model('Ingrediente', schema, 'ingredientes');

module.exports = Ingrediente;
