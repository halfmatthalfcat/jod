/// <reference path="./components.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as jQuery from "jquery";
import {Link} from "react-router";
import {isNullOrEmpty} from "../util/helpers";
import {IToolbarProps, IToolbarState} from "./components";
import {App} from "../util/api";

class Toolbar extends React.Component<IToolbarProps, IToolbarState> {

  public state: IToolbarState;

  private containerStyle: any = {
    display: "flex",
    flexFlow: "column nowrap",
  };

  constructor(props: IToolbarProps) {
    super(props);
    this.state = {
      showLogin: false
    };
  }

  public componentDidMount() {
    if (!isNullOrEmpty(localStorage.getItem("jod_jwt"))) {
      const token = localStorage.getItem("jod_jwt");
      App.login(token).then((user) => {
        this.setState({
          user: user,
          showLogin: this.state.showLogin
        });
      });
    } else {
      console.log("Not jwt token found.");
    }
  }

  private toggleLogin(): void {
    const el = jQuery("#login-container");
    switch (this.state.showLogin) {
      case true: el.slideDown("fast", () => {
        this.setState({ showLogin: false });
      }); break;
      case false: el.slideUp("fast", () => {
        this.setState({ showLogin: true });
      }); break;
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
                if (this.state.user) {
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
                      <li><a onClick={ this.toggleLogin.bind(this) }>Login</a></li>
                    </ul>
                  );
                }
              })()}
            </div>
          </nav>
        </div>
        <div id="login-container">
          Login
        </div>
        { this.props.children }
      </div>
    );
  }

}

export {Toolbar};
