/// <reference path="./components.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import {Link} from "react-router";
import {isNullOrEmpty} from '../util/Helpers';

class Toolbar extends React.Component<IToolbarProps, IToolbarState> {

  public state: IToolbarState;

  private containerStyle: any = {
    display: 'flex',
    flexFlow: 'column nowrap',
  };

  constructor(props: IToolbarProps) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  public componentDidMount() {
    if(!isNullOrEmpty(localStorage.getItem("jod_jwt"))){
      var token = localStorage.getItem("jod_jwt");

    }
  }

  public render() {
    return (
      <div style={ this.containerStyle }>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo center">JOliverDecor</a>
              {(() => {
                if(this.state.loggedIn){
                  return(
                    <ul className="right hide-on-med-and-down">
                      <li><Link to="/accounts">Accounts</Link></li>
                      <li><Link to="/budgets">Budgets</Link></li>
                      <li>Hi, { this.state.user.username }</li>
                      <li><Link to="/logout">Logout</Link></li>
                    </ul>
                  );
                } else {
                  return(
                    <ul className="right hide-on-med-and-down">
                      <li><Link to="/login">Login</Link></li>
                    </ul>
                  );
                }
              })()}
            </div>
          </nav>
        </div>
        { this.props.children }
      </div>
    );
  }

}

export {Toolbar};
