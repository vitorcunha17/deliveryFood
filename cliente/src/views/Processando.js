import React from 'react';
import qs from 'query-string';
import {editarVenda} from '../actions/VendaActions';
import {connect} from 'react-redux';

class Processando extends React.Component {
  componentWillMount(){
    let params = qs.parse(this.props.history.location.search);
    this.props.editarVenda({status: "processando"}, params.external_reference);
  }

  render(){
    return(
      <div className="container">
        <br/>
        <br/>
        <h1 className="header center green-text">Processando pagamento</h1>
        <div className="row center">
          <i className="material-icons" style={{fontSize: 160, color: "yellow"}}>schedule</i>
        </div>
        <div className="row center">
          <h5 className="header light">Seu pagamento está sendo processado. Quando acabar de processar você receberá um email confirmando a compra e nós já saberemos que precisamos fazer seu pedido :)</h5>
          <h6 className="header">Isso leva em torno de 5 minutos, porém caso queira cancelar o pedido, entre em contato por telefone.</h6>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    venda: state.venda.venda
  }
}

export default connect(mapStateToProps, {editarVenda})(Processando);
