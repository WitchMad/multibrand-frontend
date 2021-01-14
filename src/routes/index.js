import React from 'react';
import { Router, Switch } from 'react-router-dom';

import Route from './Route';

import Main from '~/pages/Main';
import SignUp from '~/pages/Auth/SignUp';
import SignIn from '~/pages/Auth/SignIn';

import history from '~/services/history';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Main} isPrivate />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  </Router>
);

export default Routes;
