import React from 'react';

export default class Contato extends React.Component {
  render(){
    return(
      <div id="contato" className="modal">
        <div className="modal-content">
          <h4>Contato</h4>
          <div className="divider"></div>
          <div className="section">
            <h5 style={{fontWeight: "bold"}}>Gustavo</h5>
            <h5 style={{fontWeight: "thin"}}>(14) 99670-8722</h5>
          </div>
          <div className="divider"></div>
          <div className="section">
            <h5 style={{fontWeight: "bold"}}>Vitor</h5>
            <h5 style={{fontWeight: "thin"}}>(43) 99811-0672</h5>
          </div>
          <div className="divider"></div>
          <div className="section">
            <h5 style={{fontWeight: "bold"}}>Facebook</h5>
            <a href="https://facebook.com/foodifybr" target="_blank"><h5 style={{fontWeight: "thin"}}>facebook.com/foodifybr</h5></a>
          </div>
        </div>
      </div>
    );
  }
}
