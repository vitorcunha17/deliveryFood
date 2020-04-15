import React from 'react';
import io from 'socket.io-client';

let socket = null;

export default class Status extends React.Component {
  componentWillMount(){
    if(process.env.NODE_ENV==="development"){
      socket = io("http://localhost:8000");
    }else{
      socket = io("https://foodify.com.br:8000");
    }
    socket.on("status", (data) => {
      console.log(data);
    });
  }

  render(){
    console.log(this.props);
    return(
      <div className="container">
        <br/>
        <br/>
        <h4 className="header center green-text">Status do pagamento: </h4>
        <div className="row center">
          <h5 className="header light">O status do pagamento será atualizado sozinho e caso for aprovado você será redirecionado para a página onde seu pedido será finalizado. Aguarde.</h5>
        </div>
      </div>
    );
  }
}
