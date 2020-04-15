import React from 'react';
import {connect} from 'react-redux';
import {obterCategorias, adicionarCategoria, deletarCategoria} from '../actions/CategoriaActions';

class CategoriaModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categoria: ""
    }
  }

  componentWillMount(){
    this.props.obterCategorias();
  }

  salvar(event){
    event.preventDefault();
    this.props.adicionarCategoria({nome: this.state.categoria});
    this.setState({categoria: ""});
  }

  render(){
    return(
      <div>
        <button className={`${this.props.className} btn btn-default flat`} data-target="#modal-categoria" data-toggle="modal">Categorias</button>

        <div className="modal modal-fade" id="modal-categoria">
          <form onSubmit={this.salvar.bind(this)}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">Categorias</h4>
                </div>
                <div className="modal-body">
                  <ul className="list-group">
                    {
                      this.props.categorias.length>0 ? this.props.categorias.map((categoria) => (
                        <li key={categoria._id} style={{borderRadius:0,border:"1px solid #bcbcb"}} className="list-group-item">
                          <span className="badge" style={{cursor: "pointer"}} onClick={() => this.props.deletarCategoria(categoria._id)}>
                            <i className="fa fa-times"></i>
                          </span>
                          {categoria.nome}
                        </li>
                      )) : "Nenhuma categoria registrada"
                    }
                  </ul>
                  <div className="input-group">
                    <input type="text" value={this.state.categoria} onChange={(event) => this.setState({categoria: event.target.value})} className="form-control" />
                    <div className="input-group-btn">
                      <button className="btn btn-primary flat">Adicionar categoria</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categorias: state.categoria.todas
  }
}

export default connect(mapStateToProps, {obterCategorias, adicionarCategoria, deletarCategoria})(CategoriaModal);
