/// <reference path="../typings/index.d.ts" />
/// <reference path="./app.d.ts" />

import 'babel-polyfill';
import { Toolbar } from './components/toolbar';
import { Home } from './pages/home';
import { Nav } from './components/nav';
import { Accounts } from './pages/accounts';
import { Admin } from './pages/admin';
import { Account } from './pages/account';
import { Budget } from './pages/budget';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

(window as any).run = () => {
  ReactDOM.render((
    <Router history={ browserHistory } >
      <Route path="/" component={ Toolbar }>
        <IndexRoute component={ Home } />
        <Route path="admin" component={ Admin }>
          <IndexRoute component={ Nav } />
          <Route path="accounts" component={ Accounts } />
          <Route path="account/:accountId" component={ Account } />
          <Route path="budget/budgetId" component={ Budget } />
        </Route>
      </Route>
    </Router>
  ), document.body);
};


