var mongoose = require('mongoose');
var Item = require('./Item');

var schema = new mongoose.Schema({
  cliente: String,
  endereco: String,
  celular: String,
  pagamento: String,
  troco: Number,
  itens: [{type: mongoose.Schema.Types.ObjectId, ref: "Item"}],
  total: Number,
  data: Date,
  status: {type: String, default: "Não finalizado"},
  encomenda: Boolean,
  dataEncomenda: Date
}, {versionKey: false});

var Venda = mongoose.model('Venda', schema, 'vendas');

module.exports = Venda;
