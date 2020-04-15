var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  nome: String,
  tipo: String,
  ingredientes: [{type: mongoose.Schema.Types.ObjectId, ref: "Ingrediente"}],
  preco: Number,
  tipo: String,
  categoria: {type: mongoose.Schema.Types.ObjectId, ref: "Categoria"}
}, {versionKey: false});

var Comida = mongoose.model('Comida', schema, 'comidas');

module.exports = Comida;
