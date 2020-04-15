import React from 'react';
import {obterComidas} from '../actions/ComidaActions';
import {obterAdicionais} from '../actions/AdicionalActions';
import {adicionarComida, encomenda} from '../actions/VendaActions';
import {connect} from 'react-redux';

class Cardapio extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comida: {
        nome: "",
        ingredientes: [],
        preco: 0,
        categoria: {
          _id: null,
          nome: ""
        }
      },
      quantidade: 1,
      adicionais: [],
      observacoes: "",
    }
  }

  componentWillMount(){
    this.props.encomenda(false);
    this.props.obterComidas();
    this.props.obterAdicionais();
  }

  componentDidMount(){
    window.iniciarModal();
  }

  adicionalSelecionado(adicional){
    let selecionado = false;
    this.state.adicionais.forEach((a) => {
      if(a===adicional){
        selecionado = true;
      }
    });
    return selecionado;
  }

  toggleAdicional(adicional, selecionado){
    if(selecionado){
      this.setState({adicionais: this.state.adicionais.filter((a) => adicional!==a)});
    }else{
      this.setState({adicionais: this.state.adicionais.concat(adicional)});
    }
  }

  calcularTotalComida(){
    let total = this.state.comida.preco;
    this.state.adicionais.forEach((adicional) => {
      total += adicional.preco;
    });
    total *= this.state.quantidade;
    return total;
  }

  adicionarComidas(){
    for(let i=0;i<this.state.quantidade;i++){
      let total = this.state.comida.preco;
      this.state.adicionais.forEach((adicional) => total += adicional.preco);
      let item = {
        comida: this.state.comida,
        observacoes: this.state.observacoes,
        adicionais: this.state.adicionais,
        total
      };
      this.props.adicionarComida(item);
    }
    this.setState({adicionais: [], quantidade: 1, observacoes: ""});
  }

  render(){
    let comidas = {};
    let tipos = [];
    if(this.props.comidas){
      this.props.comidas.forEach((comida) => {
        if(!comidas[comida.tipo]){
          comidas[comida.tipo] = [];
          tipos.push(comida.tipo);
        }
        comidas[comida.tipo].push(comida);
      });
    }

    return(
      <div id="cardapio" className="col xl7 l6 m12 s12">
        {
          tipos.map((tipo) => (
            <ul key={tipo} className="collection with-header">
              <li className="collection-header"><h4>{tipo}</h4></li>
              {
                comidas[tipo].sort((a, b) => a.preco - b.preco).map((comida) => (
                  <li key={comida._id} style={{cursor: "pointer"}} onClick={() => this.setState({comida})} href="#modal" className={`collection-item modal-trigger ${this.state.comida===comida ? "active" : null}`}>
                    <div>
                      <span className="medium">{comida.nome}</span>
                      {
                        comida.ingredientes.length!==0 ?
                        (
                          <div className="row" style={{marginBottom: 0}}>
                            <div className="col xl8 l8 m8 s8">
                              <span key={1} className="thin">Ingredientes: &nbsp;
                                {
                                  comida.ingredientes.map((ingrediente) => ingrediente.nome).join(", ")
                                }
                              </span>
                            </div>
                            <div className="col xl4 l4 m4 s4">
                              <span className="secondary-content">
                                R$ {comida.preco.format(2, 3, '.', ',')}
                              </span>
                            </div>
                          </div>
                        )
                        :
                        <span className="secondary-content">
                          R$ {comida.preco.format(2, 3, '.', ',')}
                        </span>
                      }
                    </div>
                  </li>
                ))
              }
            </ul>
          ))
        }
        <div id="modal" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Adicionar ao pedido</h4>
            <div className="divider"></div>
            <div className="section">
              <h5>
                {this.state.comida.nome}
              </h5>
              {
                this.state.comida.ingredientes.length!==0 ?
                (
                  <span className="thin">Ingredientes: &nbsp;
                    {
                      this.state.comida.ingredientes.map((ingrediente) => ingrediente.nome).join(", ")
                    }
                  </span>
                ) : null
              }
            </div>
            <div className="divider"></div>
            <div className="section">
              <h5>Deseja adicionar algo na sua comida?</h5>
              <h6>(Clique para selecionar)</h6>
              <table className="bordered">
                <tbody>
                  {
                    this.props.adicionais.filter((adicional) => adicional.ingrediente.categoria===this.state.comida.categoria._id).map((adicional) => {
                      let selecionado = this.adicionalSelecionado(adicional);
                      return (
                        <tr style={{cursor: "pointer"}} onClick={() => this.toggleAdicional(adicional, selecionado)} className={selecionado ? "teal accent-3" : null} key={adicional._id}>
                          <td>{adicional.ingrediente.nome}</td>
                          <td><span className="right">R$ {adicional.preco.format(2, 3, '.', ',')}</span></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            <div className="section">
              <div>
                <h5>Quantidade:</h5>
                <div style={{display: "inline-flex"}}>
                  <button onClick={() => this.setState({quantidade: this.state.quantidade===1 ? 1 : this.state.quantidade-1})} className="btn waves-effect waves-light btn-flat teal lighten-3"><i style={{color: "black"}} className="small material-icons">remove</i></button>
                  <h5 style={{paddingLeft: 10, paddingRight: 10, marginTop: 5}}>{this.state.quantidade}</h5>
                  <button onClick={() => this.setState({quantidade: this.state.quantidade+1})} className="btn waves-effect waves-light btn-flat teal lighten-3"><i style={{color: "black"}} className="small material-icons">add</i></button>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="section">
              <div className="input-field">
                <textarea id="textarea" value={this.state.observacoes} onChange={(event) => this.setState({observacoes: event.target.value})} placeholder="Escreva aqui se deseja que saibamos de algo..." className="materialize-textarea" style={{marginBottom: 0}}></textarea>
                <label htmlFor="textarea">Observações</label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <span>
              Total: R$ {this.calcularTotalComida().format(2, 3, '.', ',')}
            </span>
            &nbsp;&nbsp;
            <button type="button" onClick={this.adicionarComidas.bind(this)} className="modal-action modal-close waves-effect waves-green btn-flat teal accent-3">Adicionar</button>
            <button type="button" onClick={() => this.setState({quantidade: 1, adicionais: [], observacoes: ""})} className="hide-on-med-and-down modal-action left modal-close waves-effect waves-green btn-flat teal lighten-5">Cancelar</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comidas: state.comida.todas,
    adicionais: state.adicional.todos,
    pedido: state.venda.pedido
  }
}

export default connect(mapStateToProps, {obterComidas, obterAdicionais, adicionarComida, encomenda})(Cardapio);
