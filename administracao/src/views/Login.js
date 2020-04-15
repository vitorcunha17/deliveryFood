import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/UsuarioActions';
import {Redirect} from 'react-router-dom';

const styles = {
  formSignin: {
    maxWidth: "380px",
    height: "250px",
    padding: "0px 35px",
    margin: "0 auto",
    backgroundColor: "#fff",
    border: "1px solid rgba(0,0,0,0,0.1)",
    position: "absolute",
    top: "25%",
    bottom: 0,
    left: 0,
    right: 0
  },
  formSiginHeading: {
    marginBottom: "30px"
  }
};

class Login extends React.Component {
  constructor(props){
    super(props);
    document.title = "Login :: Foodify";
    this.state = {
      credentials: {
        login: "",
        senha: ""
      }
    };
  }

  onChange(event){
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials});
  }

  handleFormSubmit(event){
    event.preventDefault();
    this.props.login(this.state.credentials);
  }

  render(){
    if(this.props.usuario){
      return (
        <Redirect to="/" />
      )
    }

    return(
      <div className="wrapper height-full">
        <form onChange={this.onChange.bind(this)} onSubmit={this.handleFormSubmit.bind(this)}>
          <div style={styles.formSignin}>
            <h2 style={styles.formSigninHeading}>Login<i className="fa fa-spin fa-fw fa-spinner pull-right" style={this.props.carregando ? {display: ""} : {display: "none"}}></i></h2>
            <input type="text" name="login" value={this.state.credentials.login} className="form-control" placeholder="Usuário" required />
            <input type="password" name="senha" style={{marginTop: 15}} value={this.state.credentials.senha} className="form-control" placeholder="Senha" required/>
            <input type="submit" className="btn btn-lg bg-black btn-block flat" style={{marginTop: 30}} value="Entrar"/>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usuario: state.usuario.autenticado,
    carregando: state.usuario.carregando,
    erro: state.usuario.erro
  };
};

export default connect(mapStateToProps, {login})(Login);
