import React from 'react';
import Contato from './Contato';
import Header from './Header';

export default class Layout extends React.Component {
  constructor(props){
    super(props);
    document.title = this.props.title;
  }

  render(){
    return(
      <div>
        <Header />
        {this.props.children}
        <Contato />
      </div>
    )
  }
}
