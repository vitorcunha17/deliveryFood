import React from 'react';
import {BrowserRouter as ReactRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import {ToastContainer} from 'react-toastify';
import {setUsuario} from './actions/UsuarioActions';

//Views
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Usuarios from './views/Usuarios';
import Pedidos from './views/Pedidos';
import Ingredientes from './views/Ingredientes';
import Comidas from './views/Comidas';
import Encomendas from './views/Encomendas';
import Configuracoes from './views/Configuracoes';

class Router extends React.Component {
  componentWillMount(){
    let usuario = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    if(usuario){
      this.props.setUsuario(usuario);
    }
  }

  render(){
    return (
      <ReactRouter>
        <div id="div">
          <ToastContainer />
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Dashboard} title="Dashboard" />
            <PrivateRoute exact path="/pedidos" component={Pedidos} title="Pedidos" />
            <PrivateRoute exact path="/usuarios" component={Usuarios} title="Usuários" />
            <PrivateRoute exact path="/ingredientes" component={Ingredientes} title="Ingredientes" />
            <PrivateRoute exact path="/comidas" component={Comidas} title="Comidas" />
            <PrivateRoute exact path="/encomendas" component={Encomendas} title="Encomendas" />
            <PrivateRoute exact path="/configuracoes" component={Configuracoes} title="Configurações" />
          </Switch>
        </div>
      </ReactRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, {setUsuario})(Router);
