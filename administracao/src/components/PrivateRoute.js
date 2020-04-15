import {Redirect, Route} from 'react-router-dom';
import React from 'react';
import Layout from './Layout';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    JSON.parse(sessionStorage.getItem('usuarioLogado')) ?
    <Layout {...props} title={rest.title}>
      <Component {...props} />
    </Layout>
    :
    <Redirect to="/login" />
  )} />
);

export default PrivateRoute;
