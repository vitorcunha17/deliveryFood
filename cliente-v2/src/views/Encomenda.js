import React from 'react';
import Cardapio from '../components/Cardapio';
import Pedido from '../components/Pedido';

export default class Encomenda extends React.Component {
  render(){
    return(
      <div>
        <div className="section center" style={{backgroundColor: "#A00F3A"}}>
          <div className="container">
            <img src="/img/logo.png" width="375" alt="Banner Foodify" className="responsive-img" />
          </div>
        </div>
        <div className="section no-pad-bot" style={{backgroundColor: "#a00f3a"}}>
          <div className="container">
            <div className="row center">
              <h5 className="white-text header light">Encomende para uma data e hora que deseja comer</h5>
              <h6 className="white-text"><i style={{cursor: "pointer"}} onClick={() => {
                document.querySelector('#cardapio').scrollIntoView({
                  behavior: "smooth"
                });
              }} className="material-icons medium">keyboard_arrow_down</i></h6>
            </div>
          </div>
        </div>
        <div id="conteudo" className="container">
          <div className="row">
            <Cardapio />
            <Pedido history={this.props.history} encomenda={true} />
          </div>
        </div>
      </div>
    );
  }
}
