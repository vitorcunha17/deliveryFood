import React from 'react';
import {connect} from 'react-redux';
import InputMask from 'react-input-mask';
import {processarPagamento} from '../actions/PagamentoActions';
import {removerComida, salvarVenda} from '../actions/VendaActions';

class Pedido extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pagamento: "cartão",
      troco: 0,
      nome: "",
      sobrenome: "",
      rua: "",
      numero: "",
      celular: "",
      cartao: "",
      token: "",
      bandeira: "",
      data: "",
      horario: "",
      email: "",
      cpf: "",
      nomeCartao: "",
      cvv: "",
      mes: "",
      ano: "",
      idCartao: "",
      carregando: false,
      erro: false,
      redirecionar: false,
      mensagemErro: ""
    }
  }

  componentDidMount(){
    window.iniciarModal();
  }

  finalizarPedido(event){
    event.preventDefault();
    this.processarCompra(event);
  }

  processarCompra(event){
    if(this.state.pagamento==="dinheiro"){
      let venda = this.props.pedido;
      venda.cliente = this.state.nome + " " + this.state.sobrenome;
      venda.endereco = this.state.rua + ", " + this.state.numero;
      venda.celular = this.state.celular;
      venda.pagamento = "dinheiro";
      venda.status = "não finalizado";
      if(Number(this.state.troco)>0){
        venda.troco = Number(this.state.troco);
      }
      this.props.salvarVenda(venda);
      window.fecharModal();
      this.props.history.push("/finalizado");
    }else{
      let pagamento = {
        nome: this.state.nome,
        sobrenome: this.state.sobrenome,
        area: this.state.celular.split(" ")[0].replace("(", "").replace(")", ""),
        telefone: Number(this.state.celular.split(" ")[1].replace("-", "")),
        rua: this.state.rua,
        numero: Number(this.state.numero),
        itens: this.props.pedido.itens
      };
      let venda = this.props.pedido;
      venda.cliente = this.state.nome + " " + this.state.sobrenome;
      venda.endereco = this.state.rua + ", " + this.state.numero;
      venda.celular = this.state.celular;
      venda.encomenda = this.props.encomenda ? true : false;
      if(venda.encomenda){
        let data = this.state.data.split("/");
        let horario = this.state.horario.split(":");
        let dataEncomenda = new Date(data[3], data[2], data[1], horario[0], horario[1]);
        venda.dataEncomenda = dataEncomenda;
      }
      venda.pagamento = "cartão";
      venda.status = "não pago";
      this.props.salvarVenda(venda).then(() => {
        pagamento.vendaId = this.props.venda._id;
        this.props.processarPagamento(pagamento);
      });
    }
  }

  render(){
    return(
      <div id="pedido" className="col xl5 l6 m12 s12">
        <ul className="collection with-header">
          <li className="collection-header"><h4>Pedido</h4></li>
          {
            this.props.pedido.itens.map((item, i) => (
              <li key={i} className="collection-item">
                <span className="medium">{item.comida.nome}</span>
                {
                  item.adicionais.length!==0 ?
                  (
                    <div className="row" style={{marginBottom: 0}}>
                      <div className="col xl8 l8 m8 s8">
                      {
                        item.adicionais.length!==0 ?
                        [
                          <br key={0}/>,
                          <span key={1} className="thin">Adicionais: &nbsp;
                            {
                              item.adicionais.map((adicional) => adicional.ingrediente.nome).join(", ")
                            }
                          </span>
                        ] : null
                      }
                      </div>
                      <div className="col x4 l4 m14 s4">
                        <span className="secondary-content row">
                            R$ {item.total.format(2, 3, '.', ',')} &nbsp;
                            <i style={{cursor: "pointer", position: "relative", top: 6}} className="material-icons" onClick={() => this.props.removerComida(item)}>clear</i>
                        </span>
                      </div>
                    </div>
                  )
                  :
                  <span className="secondary-content">
                    R$ {item.total.format(2, 3, '.', ',')} &nbsp;
                    <i style={{cursor: "pointer", position: "relative", top: 6}} className="material-icons" onClick={() => this.props.removerComida(item)}>clear</i>
                  </span>
                }

              </li>
            ))
          }
          <li className="collection-item">
            <span>
              Total: R$ {this.props.pedido.total.format(2, 3, '.' , ',')}
            </span>
            <span className="secondary-content" style={{paddingBottom: 10}}>
              <button data-target="modal-finalizar" className={`btn modal-trigger waves-effect waves-light ${this.props.pedido.itens.length===0 ? "disabled" : null}`}>Finalizar pedido</button>
            </span>
          </li>
        </ul>

        <div id="modal-finalizar" className="modal modal-fixed-footer">
          <form id="form" onSubmit={this.finalizarPedido.bind(this)}>
            <div className="modal-content">
              <h4>
                Finalizar pedido
              </h4>
              <div className="divider"></div>
              {
                !this.props.carregando ?
                (
                  <div>
                    {
                      this.state.erro ?
                      (
                        <div className="section">
                          <div className="row">
                            <div className="col s12">
                              <div className="card-panel red lighten-2">
                                Houve um erro ao processar sua compra
                                <p>{this.state.mensagemErro}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null
                    }
                    <div className="section">
                      <table className="bordered">
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Preço</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.props.pedido.itens.map((item, i) => (
                              <tr key={i}>
                                <td>
                                  <span style={{fontWeight: "bold"}}>{item.comida.nome}</span>
                                  <br/>
                                  {
                                    item.comida.ingredientes.length!==0 ?
                                    [
                                      <span key={0}>
                                        Ingredientes: &nbsp;
                                        {
                                          item.comida.ingredientes.map((ingrediente) => ingrediente.nome).join(", ")
                                        }
                                      </span>,
                                      <br key={1}/>
                                    ]: null
                                  }
                                  {
                                    item.adicionais.length!==0 ?
                                    [
                                      <span key={0}>
                                        Adicionais: &nbsp;
                                        {
                                          item.adicionais.map(adicional => adicional.ingrediente.nome).join(", ")
                                        }
                                      </span>,
                                      <br key={1}/>
                                    ] : null
                                  }
                                  {
                                    item.observacoes!=="" ?
                                    (
                                      <span>
                                        Observações: {item.observacoes}
                                      </span>
                                    ) : null
                                  }
                                </td>
                                <td>R$ {item.total.format(2, 3, '.', ',')}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                    <div className="section">
                      <h5>Informações para entrega</h5>
                      <h6>Não cobramos taxa para entrega</h6>
                      <div className="row">
                        <div className="input-field col s12 m6 l6 xl6">
                          <input id="nome" type="text" required className="validate" value={this.state.nome} onChange={(event) => this.setState({nome: event.target.value})} />
                          <label htmlFor="nome" className="active">Nome</label>
                        </div>
                        <div className="input-field col s12 m6 l6 xl6">
                          <input id="sobrenome" type="text" required className="validate" value={this.state.sobrenome} onChange={(event) => this.setState({sobrenome: event.target.value})} />
                          <label htmlFor="sobrenome" className="active">Sobrenome</label>
                        </div>
                        <div className="input-field col s12 m6 l6 xl6">
                          <InputMask id="celular" type="text" mask="(99) 99999-9999" required className="validate" value={this.state.celular} onChange={(event) => this.setState({celular: event.target.value})} />
                          <label htmlFor="celular" className="active">Celular</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col m9 s12">
                          <input id="rua" type="text" required className="validate" value={this.state.rua} onChange={(event) => this.setState({rua: event.target.value})} />
                          <label htmlFor="rua" className="active">Rua</label>
                        </div>
                        <div className="input-field col s12 m3">
                          <input id="numero" type="number" required min="1" className="validate" value={this.state.numero} onChange={(event) => this.setState({numero: event.target.value})} />
                          <label htmlFor="numero" className="active">Número</label>
                        </div>
                      </div>
                      {
                        this.props.encomenda ?
                        (
                          <div className="row">
                            <div className="input-field col s12 m6">
                              <InputMask id="data" mask="99/99/9999" type="text" required className="validate" value={this.state.data} onChange={(event) => this.setState({data: event.target.value})} />
                              <label htmlFor="data" className="active">Data para entrega</label>
                            </div>
                            <div className="input-field col s12 m6">
                              <InputMask id="horario" mask="99:99" type="text" required className="validate" value={this.state.horario} onChange={(event) => this.setState({horario: event.target.value})} />
                              <label htmlFor="horario" className="active">Horário para entrega</label>
                            </div>
                          </div>
                        ) : null
                      }
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                      <h5>Forma de pagamento</h5>
                      <p>
                        <input name="pagamento" checked={this.state.pagamento==="dinheiro" ? true : false} onChange={() => this.setState({pagamento: "dinheiro"})} type="radio" id="dinheiro" />
                        <label htmlFor="dinheiro">Dinheiro</label>
                      </p>
                      <p>
                        <input name="pagamento" checked={this.state.pagamento==="cartão" ? true : false} onChange={() => this.setState({pagamento: "cartão"})} type="radio" id="cartão" />
                        <label htmlFor="cartão">Cartão</label>
                      </p>
                      {
                        this.state.pagamento==="dinheiro" ?
                        (
                          <div className="section">
                            <div className="input-field">
                              <input id="troco" min="0" value={this.state.troco} onChange={(event) => this.setState({troco: event.target.value})} type="number" className="validate"/>
                              <label htmlFor="troco" className="active">Troco para quanto? (Caso não precise, apenas deixa 0)</label>
                            </div>
                          </div>
                        )
                        :
                        null
                      }
                    </div>
                  </div>
                )
                :
                (
                  <div className="section">
                    <div className="center-align">
                      <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue">
                          <div className="circle-clipper left">
                            <div className="circle"></div>
                          </div><div className="gap-patch">
                            <div className="circle"></div>
                          </div><div className="circle-clipper right">
                            <div className="circle"></div>
                          </div>
                        </div>

                        <div className="spinner-layer spinner-red">
                          <div className="circle-clipper left">
                            <div className="circle"></div>
                          </div><div className="gap-patch">
                            <div className="circle"></div>
                          </div><div className="circle-clipper right">
                            <div className="circle"></div>
                          </div>
                        </div>

                        <div className="spinner-layer spinner-yellow">
                          <div className="circle-clipper left">
                            <div className="circle"></div>
                          </div><div className="gap-patch">
                            <div className="circle"></div>
                          </div><div className="circle-clipper right">
                            <div className="circle"></div>
                          </div>
                        </div>

                        <div className="spinner-layer spinner-green">
                          <div className="circle-clipper left">
                            <div className="circle"></div>
                          </div><div className="gap-patch">
                            <div className="circle"></div>
                          </div><div className="circle-clipper right">
                            <div className="circle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

            </div>
            <div className="modal-footer">
              <span>
                Total: R$ {this.props.pedido.total.format(2, 3, '.', ',')}
              </span>
              &nbsp;&nbsp;
              <button type="submit" disabled={this.props.carregando} className="modal-action waves-effect waves-green btn-flat teal accent-3">Finalizar pedido</button>
              <button type="button" className="hide-on-med-and-down modal-action left modal-close waves-effect waves-green btn-flat teal lighten-5">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pedido: state.venda.pedido,
    transacao: state.pagamento.transacao,
    carregando: state.pagamento.carregando,
    venda: state.venda.venda
  }
}

export default connect(mapStateToProps, {processarPagamento, removerComida, salvarVenda})(Pedido);
