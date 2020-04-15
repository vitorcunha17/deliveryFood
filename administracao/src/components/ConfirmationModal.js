import React from 'react';
import {Modal} from 'react-bootstrap';

export default class ConfirmationModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: props.visible
    };
    this.close = this.close.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onConfirm(event){
    event.preventDefault();
    this.props.onConfirm();
    this.setState({showModal: false});
  }

  open(){
    this.setState({showModal: true});
  }

  close(){
    this.setState({showModal: false});
  }

  render(){
    return(
      <Modal show={this.state.showModal} onHide={this.close} dialogClassName="modal-width">
        <form onSubmit={this.onConfirm}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.body}
          </Modal.Body>
          <Modal.Footer>
            <div>
              <button type="submit" onClick={this.onConfirm} className={`btn pull-right flat ${this.props.confirmButtonStyle==null ? 'btn-success' : this.props.confirmButtonStyle}`}>{this.props.confirmButton}</button>
              <button type="button" onClick={this.close} className="btn btn-default pull-left flat">Cancelar</button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
