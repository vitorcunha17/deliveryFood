import React from 'react';
import {connect} from 'react-redux';
import ConfirmationModal from '../components/ConfirmationModal';
import {obterVendas, editarVenda} from '../actions/VendaActions';
import io from 'socket.io-client';

let socket = null;

class Encomendas extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      vendas: [],
      venda: null
    }
  }

  componentWillMount(){
    this.props.obterVendas().then(() => this.setState({vendas: this.props.vendas.filter(venda => venda.encomenda)}));
    if(process.env.NODE_ENV==="development"){
      socket = io("http://localhost:8000");
    }else{
      socket = io("https://foodify.com.br:8000");
    }
    socket.on('nova venda', (venda) => {
      if(venda.encomenda)
        this.setState({vendas: this.state.vendas.concat(venda)});
    });
  }


  finalizarPedido(){
    this.props.editarVenda({status: "finalizado"}, this.state.venda._id);
    let vendas = this.state.vendas.filter((v) => v!==this.state.venda);
    this.setState({vendas});
  }

  render(){
    return(
      <ul className="timeline">
        <ConfirmationModal ref="modal" onConfirm={this.finalizarPedido.bind(this)} title="Finalizar pedido" body="Tem certeza que deseja finalizar o pedido?" confirmButton="Finalizar" />
        {
          this.state.vendas.map((venda) => [
            <li key={venda._id} className="time-label">
              <span className="bg-green">
                {new Date(venda.data).toLocaleTimeString()}
              </span>
            </li>,
            <li key={venda.data}>
              <i className={venda.pagamento==="dinheiro" ? venda.troco===0 ? "fa fa-money bg-green" : "fa fa-money bg-blue" : "fa fa-credit-card-alt bg-green"} aria-hidden="true"></i>
              <div className="timeline-item">
                <span className="time">
                  <i className="fa fa-clock-o"></i>&nbsp;{new Date().timeSince(venda.data)}&nbsp;&nbsp;&nbsp;
                  <button onClick={() => {this.setState({venda}); this.refs.modal.open()}} className="btn btn-success flat btn-sm" style={{marginTop: "-6px"}}>Finalizar pedido&nbsp;<i className="fa fa-check"></i></button>
                </span>
                <h3 className="timeline-header">{venda.cliente}</h3>
                <div className="timeline-body">
                  <div className="callout callout-info">
                    <div style={{marginBottom: 10}}>
                      <p className="lead" style={{display: "inline-flex"}}>Endereço:&nbsp;</p>
                      <p className="lead" style={{display: "inline-flex"}}>{venda.endereco}</p>
                    </div>
                    <div style={{marginBottom: 10}}>
                      <p className="lead" style={{display: "inline-flex"}}>Celular:&nbsp;</p>
                      <p className="lead" style={{display: "inline-flex"}}>{venda.celular}</p>
                    </div>
                    {
                      venda.troco>0 ?
                      <div style={{marginBottom: 10}}>
                        <p className="lead" style={{display: "inline-flex"}}>Troco para:&nbsp;</p>
                        <p className="lead" style={{display: "inline-flex"}}>{venda.troco}</p>
                      </div>
                      : null
                    }
                    <div>
                      <p className="lead" style={{display: "inline-flex"}}>Valor:&nbsp;</p>
                      <p className="lead" style={{display: "inline-flex"}}>{venda.total}</p>
                    </div>
                  </div>
                  {
                    venda.itens.map((item) => (
                      <div key={item._id} className="box box-default box-solid">
                        <div className="box-header with-border" style={{backgroundColor:"#222d32",color:"white"}}>
                          <h3 className="box-title">{item.comida.nome}</h3>
                        </div>
                        <div className="box-body">
                          <h4>Adicionais</h4>
                          <ul className="list-group">
                            {
                              item.adicionais.map((adicional) => (
                                <li style={{borderRadius:0,border:"1px solid #bcbcb"}} className="list-group-item" key={adicional._id}>
                                  {adicional.ingrediente.nome}
                                </li>
                              ))
                            }
                          </ul>
                          {
                            item.observacoes ?
                            <div>
                              <h4>Observações</h4>
                              <p>
                                {item.observacoes}
                              </p>
                            </div>
                            : null
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </li>
          ])
        }
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vendas: state.venda.todas
  }
}

export default connect(mapStateToProps, {obterVendas, editarVenda})(Encomendas);
