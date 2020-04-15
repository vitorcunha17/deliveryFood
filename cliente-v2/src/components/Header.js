import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {
  render(){
    return (
      <div data-uk-sticky="media: 960" style={{backgroundColor: "rgb(245, 188, 73)"}} className="uk-navbar-container uk-sticky uk-sticky-fixed uk-active uk-sticky-below">
        <div className="uk-container uk-container-expand">
          <nav className="uk-navbar">
            <div className="uk-navbar-left">
              <Link to="/" className="uk-navbar-item uk-logo"><h1 style={{fontFamily: "hitchcut", color: "white", paddingTop: 15}}>FOODIFY</h1></Link>
            </div>
            <div className="uk-navbar-right">
              <ul className="uk-navbar-nav uk-visible@m">
                <li>
                  <Link to="/">Inicio</Link>
                </li>
                <li>
                  <Link to="/encomendas">Encomendas</Link>
                </li>
              </ul>
              <a data-uk-navbar-toggle-icon href="#offcanvas" style={{colot: "white"}} data-uk-icon="icon: menu" data-uk-toggle className="uk-navbar-toggle uk-hidden@m uk-navbar-toggle-icon uk-icon"></a>
            </div>
          </nav>
        </div>
      </div>
    );
    /*
    return(
      <nav style={{backgroundColor: "#f5bc49"}}>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo" style={{fontFamily: "hitchcut"}}>FOODIFY</Link>
          <a href="" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/">Início</Link></li>
            <li><Link to="/encomenda">Encomenda</Link></li>
            <li><a href="#contato" className="modal-trigger">Contato</a></li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li style={{backgroundColor: "#a00f3a", height: "100px", marginTop: "-29px"}}>
              <h3 style={{fontFamily: "hitchcut", paddingTop: "32px"}} className="center-align">FOODIFY</h3>
            </li>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/encomenda">Encomenda</Link></li>
            <li><a href="#contato" className="modal-trigger">Contato</a></li>
          </ul>
        </div>
      </nav>
    );
    */
  }
}
