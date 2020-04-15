import React from 'react';
import {connect} from 'react-redux';
import ConfirmationModal from '../components/ConfirmationModal';
import CategoriaModal from '../components/CategoriaModal';
import {obterComidas, adicionarComida, editarComida, deletarComida} from '../actions/ComidaActions';
import {obterIngredientes} from '../actions/IngredienteActions';
import $ from 'jquery';

class Comidas extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selecionado: null,
      operacao: "adicionar",
      comida: {
        nome: "",
        preco: 0,
        tipo: "",
        categoria: "",
        ingredientes: []
      },
    }
  }

  componentWillMount(){
    this.props.obterComidas();
    this.props.obterIngredientes();
  }

  componentDidMount(){
    window.iniciarSelect((event) => {this.setState({categoria: event.target.value})});
    window.iniciarDataTable();
  }

  componentWillUpdate(){
    window.destruirDataTable();
  }

  componentDidUpdate(){
    window.desenharDataTable();
  }

  alterarForm(event){
    const campo = event.target.name;
    const comida = this.state.comida;
    comida[campo] = event.target.value;
    return this.setState({comida});
  }

  resetar(){
    this.setState({
      operacao: "adicionar",
      comida: {
        nome: "",
        preco: 0,
        tipo: "",
        ingredientes: []
      }
    });
  }

  editar(){
    this.setState({
      operacao: "editar",
      comida: {
        nome: this.state.selecionado.nome,
        preco: this.state.selecionado.preco,
        tipo: this.state.selecionado.tipo,
        ingredientes: this.state.selecionado.ingredientes
      }
    });
    $('.select2').val(this.state.selecionado.categoria._id);
    $('.select2').on('select2:select', (event) => {});
    $('.select2').trigger('select2:select');
    $('.select2').trigger('change.select2');
  }

  salvar(event){
    event.preventDefault();
    let comida = this.state.comida;
    comida.categoria = this.refs.categoria.value;
    this.setState({comida});
    if(this.state.operacao==="adicionar"){
      this.props.adicionarComida(this.state.comida);
    }else{
      this.props.editarComida(this.state.comida, this.state.selecionado._id);
    }
  }

  deletar(){
    this.props.deletarComida(this.state.selecionado._id);
    this.setState({selecionado: null});
  }

  render(){
    return(
      <div>
        <ConfirmationModal ref="modal" confirmButtonStyle="btn-danger" title="Deletar comida" confirmButton="Deletar comida" body="Tem certeza que deseja deletar esta comida?" onConfirm={this.deletar.bind(this)}/>
        <div className="box">
          <div className="box-body">
            <div className="table-responsive">
              <table id="datatable" className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Tipo</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.comidas.map((comida) => (
                      <tr key={comida._id} style={{cursor: "pointer"}} onClick={() => this.setState({selecionado: comida})} className={this.state.selecionado===comida ? "info" : null}>
                        <td>{comida._id}</td>
                        <td>{comida.nome}</td>
                        <td>{comida.categoria.nome}</td>
                        <td>{comida.tipo}</td>
                        <td>{comida.preco}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="box-footer">
            <CategoriaModal className="pull-left"/>
            <div className="pull-right">
              <i className="fa fa-fw fa-2x fa-spinner fa-spin vcenter" style={this.props.carregando ? {display: ""} : {display: "none"}}></i>
              <button style={{marginLeft: 10}} className="vcenter btn btn-success flat" data-toggle="modal" data-target="#modal" onClick={this.resetar.bind(this)}>Adicionar</button>
              <button style={{marginLeft: 10}} data-toggle="modal" data-target="#modal" onClick={this.editar.bind(this)} disabled={this.state.selecionado ? false : true} className="vcenter btn btn-warning flat">Editar</button>
              <button style={{marginLeft: 10}} className="vcenter btn btn-danger flat" disabled={this.state.selecionado ? false : true} onClick={() => this.refs.modal.open()}>Deletar</button>
            </div>
          </div>
        </div>

        <div id="modal" className="modal fade">
          <form onChange={this.alterarForm.bind(this)} onSubmit={this.salvar.bind(this)}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">Comida</h4>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input required type="text" value={this.state.comida.nome} className="form-control" name="nome" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nome">Preço</label>
                    <input required min="0" type="number" value={this.state.comida.preco} className="form-control" name="preco" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="categoria">Categoria</label>
                    <select id="categoria" name="categoria" ref="categoria" className="form-control select2" style={{width: "100%"}}>
                      {
                        this.props.categorias.map((categoria) => (
                          <option key={categoria._id} value={categoria._id}>{categoria.nome}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="tipo">Tipo</label>
                    <input required type="text" value={this.state.comida.tipo} className="form-control" name="tipo" />
                  </div>
                  {
                    this.state.operacao==="adicionar" ?
                    (
                      <div className="form-group">
                        <label>Ingredientes</label>
                        <ul className="list-group">
                          {
                            this.props.ingredientes.map((ingrediente) => {
                              let handleClick = () => {
                                let comida = this.state.comida;
                                if(this.state.comida.ingredientes.includes(ingrediente._id)){
                                  comida.ingredientes = comida.ingredientes.filter((i) => i!==ingrediente._id);
                                }else{
                                  comida.ingredientes.push(ingrediente._id);
                                }
                                this.setState({comida});
                              }

                              return(
                                <li key={ingrediente._id} onClick={handleClick} className={`list-group-item ${this.state.comida.ingredientes.includes(ingrediente._id) ? "active" : null}`}
                                  style={{borderRadius:0,border:"1px solid #bcbcb", cursor: "pointer"}}>
                                  {ingrediente.nome}
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    ) : null
                  }
                </div>
                <div className="modal-footer">
                  <button name="salvar"
                    type="submit"
                    className="btn btn-primary flat pull-right"
                    >
                    Salvar
                  </button>
                  <button name="cancelar"
                    type="button"
                    className="btn btn-default flat pull-left"
                    data-dismiss="modal">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comidas: state.comida.todas,
    carregando: state.comida.carregando,
    categorias: state.categoria.todas,
    ingredientes: state.ingrediente.todos
  }
}

export default connect(mapStateToProps, {obterIngredientes, obterComidas, adicionarComida, editarComida, deletarComida})(Comidas);
