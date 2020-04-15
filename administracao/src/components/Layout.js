import React from 'react';
import Header from './Header';
import Menu from './Menu';

export default class Layout extends React.Component {
  componentDidMount() {
    window.dispatchEvent(new Event('resize'));
  }

  render() {
    this.props.title
      ? document.title = this.props.title + " :: Foodify"
      : document.title = "Página não encontrada :: Foodify";
    return (
      <div>
        <Header/>
        <Menu path={this.props.location.pathname}/>
        <div className="content-wrapper height-full">
          <div className="content-header">
            <h1>
              {this.props.title}
              <span className="pull-right">{this.props.subtitle}</span>
            </h1>
          </div>
          <section className="content">
            <div className="row">
              <div className="col-md-12">
                {this.props.children}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
