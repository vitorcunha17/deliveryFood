import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {
  componentDidMount(){
    window.iniciarMenu();
  }

  render(){
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
  }
}
