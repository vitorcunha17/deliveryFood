import React from 'react';
import {BrowserRouter as ReactRouter, Switch} from 'react-router-dom';
import Route from './components/Route';

//Views
import Inicio from './views/Inicio';
import Finalizado from './views/Finalizado';
import Encomenda from './views/Encomenda';
import Processando from './views/Processando';
import Falha from './views/Falha';

class Router extends React.Component {
  render(){
    return (
      <ReactRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Inicio} title="Início"/>
            <Route exact path="/finalizado" component={Finalizado} title="Pedido finalizado"/>
            <Route exact path="/encomenda" component={Encomenda} title="Encomenda"/>
            <Route exact path="/processando" component={Processando} title="Processando"/>
            <Route exact path="/falha" component={Falha} title="Falha"/>
            <Route component={Inicio} title="Inicio" />
          </Switch>
        </div>
      </ReactRouter>
    );
  }
}

export default Router;
