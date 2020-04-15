import React from 'react';
import qs from 'query-string';
import {editarVenda} from '../actions/VendaActions';
import {connect} from 'react-redux';

class Finalizado extends React.Component {
  componentWillMount(){
    let params = qs.parse(this.props.history.location.search);
    if(params.collection_status==="approved"){
      this.props.editarVenda({status: "pago"}, params.external_reference);
    }
  }

  render(){
    return(
      <div className="container">
        <br/>
        <br/>
        <h1 className="header center green-text">Pedido finalizado</h1>
        <div className="row center">
          <i className="material-icons" style={{fontSize: 160, color: "green"}}>check</i>
        </div>
        <div className="row center">
          <h5 className="header light">Já estamos preparando seu pedido e logo entregaremos na sua casa</h5>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    venda: state.venda.venda,
    carregando: state.venda.carregando,
    erro: state.venda.erro
  }
}

export default connect(mapStateToProps, {editarVenda})(Finalizado);
