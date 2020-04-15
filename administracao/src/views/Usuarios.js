import React from 'react';
import {connect} from 'react-redux';
import {obterUsuarios, adicionarUsuario, editarUsuario, deletarUsuario} from '../actions/UsuarioActions';
import ConfirmationModal from '../components/ConfirmationModal';

class Usuarios extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selecionado: null,
      operacao: "adicionar",
      usuario: {
        nome: "",
        login: "",
        senha: "",
        email: ""
      }
    }
  }

  componentWillMount(){
    this.props.obterUsuarios();
  }

  componentDidMount(){
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
    const usuario = this.state.usuario;
    usuario[campo] = event.target.value;
    return this.setState({usuario});
  }

  resetar(){
    this.setState({
      operacao: "adicionar",
      usuario: {
        nome: "",
        login: "",
        senha: "",
        email: ""
      }
    });
  }

  editar(){
    this.setState({
      operacao: "editar",
      usuario: {
        nome: this.state.selecionado.nome,
        login: this.state.selecionado.login,
        senha: this.state.selecionado.senha,
        email: this.state.selecionado.email
      }
    });
  }

  salvar(event){
    event.preventDefault();
    if(this.state.operacao==="adicionar"){
      this.props.adicionarUsuario(this.state.usuario);
    }else{
      this.props.editarUsuario(this.state.usuario, this.state.selecionado._id);
    }
  }

  deletar(){
    this.props.deletarUsuario(this.state.selecionado._id);
    this.setState({selecionado: null});
  }

  render(){
    return(
      <div>
        <ConfirmationModal ref="modal" confirmButtonStyle="btn-danger" title="Deletar usuário" confirmButton="Deletar usuário" body="Tem certeza que deseja deletar este usuário?" onConfirm={this.deletar.bind(this)}/>
        <div className="box">
          <div className="box-body">
            <div className="table-responsive">
              <table id="datatable" className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Nome</th>
                    <th>Login</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.usuarios.map((usuario) => (
                      <tr key={usuario._id} style={{cursor: "pointer"}} onClick={() => this.setState({selecionado: usuario})} className={this.state.selecionado===usuario ? "info" : null}>
                        <td>{usuario._id}</td>
                        <td>{usuario.nome}</td>
                        <td>{usuario.login}</td>
                        <td>{usuario.email}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="box-footer">
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
                  <h4 className="modal-title">Usuário</h4>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input required type="text" value={this.state.usuario.nome} className="form-control" name="nome" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="login">Login</label>
                    <input required type="text" value={this.state.usuario.login} className="form-control" name="login" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input required type="password" value={this.state.usuario.senha} className="form-control" name="senha" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="senha">Email</label>
                    <input required type="email" value={this.state.usuario.email} className="form-control" name="email" />
                  </div>
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
    usuarios: state.usuario.todos,
    carregando: state.usuario.carregando,
    erro: state.usuario.erro
  };
}

export default connect(mapStateToProps, {obterUsuarios, adicionarUsuario, editarUsuario, deletarUsuario})(Usuarios);
