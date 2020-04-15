var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  nome: {type: String, index: {unique: true}}
}, {versionKey: false});

var Categoria = mongoose.model('Categoria', schema, 'categorias');

module.exports = Categoria;
