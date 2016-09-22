/// <reference path="../typings/index.d.ts" />
/// <reference path="./app.d.ts" />

import {Toolbar} from "./components/toolbar";
import {Login} from "./components/login";
import {Home} from "./pages/home";
import {Accounts} from "./pages/accounts";
import {Admin} from "./pages/admin";
import {Users} from "./pages/users";
import {Budget} from "./pages/budget";

import * as React from "react";
import * as ReactDOM from "react-dom";

import {Router, Route, IndexRoute, browserHistory} from "react-router";

$(document).ready(() => {
  ReactDOM.render(
    <Router history={ browserHistory }>
      <Route path="/" component={ Toolbar } routeListener={ browserHistory.listen }>
        <IndexRoute component={ Home }/>
        <Route path="login/:token" component={ Login } />
        <Route path="users" component={ Users } />
        <Route path="accounts" component={ Accounts } />
        <Route path="budget/:budgetId" component={ Budget } />
      </Route>
    </Router>
  , document.getElementById("app"));
});


