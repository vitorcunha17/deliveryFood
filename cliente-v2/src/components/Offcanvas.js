import React from 'react';
import {Link} from 'react-router-dom';

export default class Offcanvas extends React.Component {
  render(){
    return (
      <div id="offcanvas" data-uk-offcanvas="mode: push; overlay: true" className="uk-offcanvas">
        <div className="uk-offcanvas-bar uk-offcanvas-bar-animation uk-offcanvas-push">
          <div className="uk-panel">
            <ul className="uk-nav uk-nav-default">
              <li>
                <Link to="/">Inicio</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
