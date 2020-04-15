import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Menu extends React.Component {
  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <ul className="sidebar-menu">
            <li className={this.props.path === '/' ? 'active' : null}>
              <Link to="/">
                <i className="fa fa-dashboard fa-fw"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={this.props.path === '/configuracoes' ? 'active' : null}>
              <Link to="/configuracoes">
                <i className="fa fa-cogs fa-fw"></i>
                <span>Configurações</span>
              </Link>
            </li>
            <li className={this.props.path === '/pedidos' ? 'active' : null}>
              <Link to="/pedidos">
                <i className="fa fa-file-text-o fa-fw"></i>
                <span>Pedidos</span>
              </Link>
            </li>
            <li className={this.props.path === '/encomendas' ? 'active' : null}>
              <Link to="/encomendas">
                <i className="fa fa-clock-o fa-fw"></i>
                <span>Encomendas</span>
              </Link>
            </li>
            <li className={this.props.path === '/usuarios' ? 'active' : null}>
              <Link to="/usuarios">
                <i className="fa fa-user fa-fw"></i>
                <span>Usuários</span>
              </Link>
            </li>
            <li className={this.props.path === '/ingredientes' ? 'active' : null}>
              <Link to="/ingredientes">
                <i className="fa fa-spoon fa-fw"></i>
                <span>Ingredientes</span>
              </Link>
            </li>
            <li className={this.props.path === '/comidas' ? 'active' : null}>
              <Link to="/comidas">
                <i className="fa fa-cutlery fa-fw"></i>
                <span>Comidas</span>
              </Link>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usuario: state.usuario.autenticado
  }
}

export default connect(mapStateToProps)(Menu);
