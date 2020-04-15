const app = require('express')();
var https;
var http;
var io;
const fs = require('fs');
if(process.env.NODE_ENV==="development"){
  http = require('http').Server(app);
  io = require('socket.io')(http);
}else{
  https = require('https').Server({
    key: fs.readFileSync("/etc/letsencrypt/live/foodify.com.br/privkey.pem", "utf8"),
    cert: fs.readFileSync("/etc/letsencrypt/live/foodify.com.br/cert.pem", "utf8")
  }, app);
  io = require('socket.io')(https);
}
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./src/utils/logger');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/foodify');

require('./src/routes')(app, logger, io);

if(process.env.NODE_ENV==="development"){
  http.listen(8000, () => {
    console.log("Servidor iniciado.");
  });
}else{
  https.listen(8000, () => {
    console.log("Servidor iniciado.");
  });
}
