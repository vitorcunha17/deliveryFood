import {Route} from 'react-router-dom';
import React from 'react';
import Layout from './Layout';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    <Layout {...props} title={rest.title}>
      <Component {...props} />
    </Layout>
  )} />
);

export default PrivateRoute;
