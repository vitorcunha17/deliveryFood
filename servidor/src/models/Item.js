var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  comida: {type: mongoose.Schema.Types.ObjectId, ref: "Comida"},
  adicionais: [{type: mongoose.Schema.Types.ObjectId, ref: "Adicional"}],
  venda: {type: mongoose.Schema.Types.ObjectId, ref: "Venda"},
  observacoes: String,
  total: Number
}, {versionKey: false});

var Item = mongoose.model('Item', schema, 'itens');

module.exports = Item;
