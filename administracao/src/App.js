import React from 'react';
import {Provider} from 'react-redux';
import {makeStore} from './config/store';
import Router from './Router';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={makeStore((error, store) => {})}>
        <Router />
      </Provider>
    );
  }
}
