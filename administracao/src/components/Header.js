import React from 'react';
//import {IMG_URL} from '../config.js';
import {Link, Redirect} from 'react-router-dom';
import {logout} from '../actions/UsuarioActions';
import {connect} from 'react-redux';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirecionar: false
    }
  }

  logout(){
    this.props.logout();
    this.setState({redirecionar: true});
  }

  render(){
    if(this.state.redirecionar){
      return(
        <Redirect to="/login" />
      );
    }
    
    return(
      <header className="main-header">
        <Link to="/" className="logo">
          <span className="logo-mini">F</span>
          <span className="logo-lg">Foodify</span>
        </Link>
        <nav className="navbar navbar-static-top">
          <a className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="user user-menu">
                <a role="button" style={{cursor: "default"}}>
                  <span>{this.props.usuario.nome}</span>
                </a>
              </li>
              <li className="user user-menu">
                <a role="button" onClick={this.logout.bind(this)}>
                  <i style={{fontSize: 18}} className="fa fa-power-off"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usuario: state.usuario.autenticado
  };
};

export default connect(mapStateToProps, {logout})(Header);
