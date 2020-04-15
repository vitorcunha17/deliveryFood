import React from 'react';
import qs from 'query-string';
import {editarVenda} from '../actions/VendaActions';
import {connect} from 'react-redux';

class Falha extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: "",
      titulo: "",
      icone: "",
      cor: "",
      descricao: ""
    };
  }

  componentWillMount(){
    let params = qs.parse(this.props.history.location.search);
    console.log(params.collection_status);
    if(params.collection_status==="null" || params.collection_status==="rejected"){
      this.setState({
        status: "cancelado",
        titulo: "Pedido cancelado",
        icone: "block",
        cor: "red",
        descricao: "O seu pedido foi cancelado ou por você ou pelo cartão de crédito."
      });
      this.props.editarVenda({status: "cancelado"}, params.external_reference);
    }
  }

  render(){
    return(
      <div className="container">
        <br/>
        <br/>
        <h1 className={`header center ${this.state.cor}-text`}>{this.state.titulo}</h1>
        <div className="row center">
          <i className="material-icons" style={{fontSize: 160, color: this.state.cor}}>{this.state.icone}</i>
        </div>
        <div className="row center">
          <h5 className="header light">{this.state.descricao}</h5>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    venda: state.venda.venda
  }
}

export default connect(mapStateToProps, {editarVenda})(Falha);
