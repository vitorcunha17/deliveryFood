import React from 'react';
import {connect} from 'react-redux';
import {obterIngredientes, adicionarIngrediente, editarIngrediente, deletarIngrediente} from '../actions/IngredienteActions';
import ConfirmationModal from '../components/ConfirmationModal';
import CategoriaModal from '../components/CategoriaModal';
import $ from 'jquery';

class Ingredientes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selecionado: null,
      operacao: "adicionar",
      ingrediente: {
        nome: "",
        preco: 0,
        categoria: ""
      },
      adicional: true
    }
  }

  componentWillMount(){
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
    const ingrediente = this.state.ingrediente;
    ingrediente[campo] = event.target.value;
    return this.setState({ingrediente});
  }

  resetar(){
    this.setState({
      operacao: "adicionar",
      ingrediente: {
        nome: "",
        preco: 0
      }
    });
  }

  editar(){
    this.setState({
      operacao: "editar",
      ingrediente: {
        nome: this.state.selecionado.nome,
        preco: this.state.selecionado.adicional.preco
      }
    });
    $('.select2').val(this.state.selecionado.categoria._id);
    $('.select2').on('select2:select', (event) => {});
    $('.select2').trigger('select2:select');
    $('.select2').trigger('change.select2');
  }

  salvar(event){
    event.preventDefault();
    let ingrediente = this.state.ingrediente;
    ingrediente.categoria = this.refs.categoria.value;
    ingrediente.adicional = this.state.adicional;
    this.setState({ingrediente});
    if(this.state.operacao==="adicionar"){
      this.props.adicionarIngrediente(this.state.ingrediente);
    }else{
      this.props.editarIngrediente(this.state.ingrediente, this.state.selecionado._id);
    }
  }

  deletar(){
    this.props.deletarIngrediente(this.state.selecionado._id);
    this.setState({selecionado: null});
  }

  render(){
    return(
      <div>
        <ConfirmationModal ref="modal" confirmButtonStyle="btn-danger" title="Deletar ingrediente" confirmButton="Deletar ingrediente" body="Tem certeza que deseja deletar este ingrediente?" onConfirm={this.deletar.bind(this)}/>
        <div className="box">
          <div className="box-body">
            <div className="table-responsive">
              <table id="datatable" className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Preço como adicional</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.ingredientes.map((ingrediente) => (
                      <tr key={ingrediente._id} style={{cursor: "pointer"}} onClick={() => this.setState({selecionado: ingrediente})} className={this.state.selecionado===ingrediente ? "info" : null}>
                        <td>{ingrediente._id}</td>
                        <td>{ingrediente.nome}</td>
                        <td>{ingrediente.categoria ? ingrediente.categoria.nome : null}</td>
                        <td>{ingrediente.adicional ? ingrediente.adicional.preco : null}</td>
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
                  <h4 className="modal-title">Ingrediente</h4>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input required type="text" value={this.state.ingrediente.nome} className="form-control" name="nome" />
                  </div>
                  <div key={2} className="form-group">
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
                    <label htmlFor="adicional">É um adicional?</label>
                    <div className="radio">
                      <label><input type="radio" name="adicional" onChange={() => this.setState({adicional: true})} checked={this.state.adicional}/>Sim</label>
                    </div>
                    <div className="radio">
                      <label><input type="radio" name="adicional" onChange={() => this.setState({adicional: false})} checked={!this.state.adicional}/>Não</label>
                    </div>
                  </div>
                  {
                    this.state.adicional ?
                    (
                      <div key={1} className="form-group">
                        <label htmlFor="nome">Preço como adicional</label>
                        <input required min="0" type="number" value={this.state.ingrediente.preco} className="form-control" name="preco" />
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredientes: state.ingrediente.todos,
    carregando: state.ingrediente.carregando,
    categorias: state.categoria.todas
  }
}

export default connect(mapStateToProps, {obterIngredientes, adicionarIngrediente, editarIngrediente, deletarIngrediente})(Ingredientes);
