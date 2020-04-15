module.exports = function(app, logger, io){
  require('./routes/IngredienteRoutes')(app);
  require('./routes/ComidaRoutes')(app);
  require('./routes/AdicionalRoutes')(app);
  require('./routes/PagamentoRoutes')(app, logger, io);
  require('./routes/VendaRoutes')(app, io);
  require('./routes/UsuarioRoutes')(app);
  require('./routes/CategoriaRoutes')(app);
}
