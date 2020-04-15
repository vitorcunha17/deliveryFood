import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {makeStore} from './config/store';
import Router from './Router';

class App extends Component {
  render() {
    return (
      <Provider store={makeStore((error, store) => {})}>
        <Router />
      </Provider>
    );
  }
}

export default App;
