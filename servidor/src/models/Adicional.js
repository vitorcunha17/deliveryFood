var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  ingrediente: {type: mongoose.Schema.Types.ObjectId, ref: "Ingrediente"},
  preco: Number
}, {versionKey: false});

var Adicional = mongoose.model('Adicional', schema, 'adicionais');

module.exports = Adicional;
