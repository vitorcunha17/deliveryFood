import React from 'react';
import {connect} from 'react-redux';

class Configuracoes extends React.Component {
  render(){
    return(
      <div className="box">
        <div className="box-body">
          <div className="form-group">
            <label htmlFor="abertura">Abre:</label>
            <input id="abertura" type="number" min="0" max="23" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="fechamento">Fecha:</label>
            <input id="fechamento" type="number" min="0" max="23" className="form-control" />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, {})(Configuracoes);
