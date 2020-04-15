var mercadopago = require('mercadopago');
var fs = require('fs');
var url = require('url');

var arquivo = fs.readFileSync('./src/config/pagamento.txt', 'utf8');

if(process.env.NODE_ENV==="development"){
  mercadopago.configure({
    access_token: arquivo.split('\r')[3].replace('\n', ""),
    //sandbox: true
  });
}else{
  mercadopago.configure({
    access_token: arquivo.split('\r')[3].replace('\n', "")
  });
}

module.exports = function(app, logger, io){
  app.post("/transacoes", (request, response) => {
    let itens = [];
    request.body.itens.forEach((item) => {
      let i = {
        title: item.comida.nome,
        category_id: "others",
        currency_id: "BRL",
        quantity: 1,
        unit_price: item.total,
        description: item.adicionais ? "Adicionais: " + item.adicionais.map(adicional => adicional.nome).join(", ") : ""
      };
      itens.push(i);
    });
    var preference = {
      items: itens,
      external_reference: request.body.vendaId,
      payer: {
        name: request.body.nome,
        surname: request.body.sobrenome,
        //email: request.body.email,
        phone: {
          area_code: request.body.area,
          number: request.body.telefone
        },
        /*
        identification: {
          type: "CPF",
          number: request.body.cpf
        },
        */
        address: {
          street_name: request.body.rua,
          street_number: request.body.numero,
          zip_code: "86360-000"
        }
      },
      back_urls: {
        success: "https://foodify.com.br/finalizado",
        pending: "https://foodify.com.br/processando",
        failure: "https://foodify.com.br/falha"
      },
      notification_url: "https://foodify.com.br:8000/notificacoes",
      auto_return: "approved",
      payment_methods: {
        excluded_payment_types: [
          {
            id: "ticket"
          }
        ],
        excluded_payment_methods: [
          {
            id: "bolbradesco"
          }
        ],
        installments: 1,
        default_installments: 1
      }
    }

    mercadopago.preferences.create(preference).then((data) => {
      response.send(data);
    }).catch(error => {
      console.error(error);
      response.send(error);
    });
  });

  app.get('/notificacoes', (request, response) => {
    var params = url.parse(reques.url, true).query;
    console.log(params);
    fs.appendFileSync('notificacoes.txt', params);
    response.status(200);
    respose.end();
    /*
    mercadopago.payment.get(param)(params, (error, data) => {
      if(error){
        console.error(error);
      }else{
        console.dir(data);
        io.emmit("status", data);
      }
    });
    */
  });

  app.post('/notificacoes', (request, response) => {
    console.log(request.body);
    fs.appendFileSync('notificacoes.txt', request.body);
    response.status(200);
    response.end();
  });
  /*
  app.post('/transacoes', (request, response) => {
    let itens = [];
    request.body.itens.forEach((item) => {
      let i = {
        title: item.comida.nome,
        category_id: "others",
        quantity: 1,
        unit_price: item.total
      };
      itens.push(i);
    });
    var pagamento = {
      description: 'Comprando comida no Foodify',
      transaction_amount: request.body.total,
      payment_method_id: request.body.idCartao,
      installments: 1,
      token: request.body.token,
      payer: {
        email: request.body.email,
        identification: {
          type: "CPF",
          number: request.body.cpf
        },
        first_name: request.body.nome,
        last_name: request.body.sobrenome
      },
      additional_info: {
        items: itens,
        payer: {
          first_name: request.body.nome,
          last_name: request.body.sobrenome,
          phone: {
            area_code: request.body.telefone.split(" ")[0].replace("(", "").replace(")", ""),
            number: request.body.telefone.split(" ")[1]
          },
          address: {
            zip_code: "86360000",
            street_name: request.body.rua,
            street_number: Number(request.body.numero)
          }
        }
      }
    };
    mercadopago.payment.create(pagamento).then((data) => {
      logger.info(data);
      response.json(data);
    }).catch((error) => {
      console.error(error);
      response.send(error);
    });
  });
  */
}
