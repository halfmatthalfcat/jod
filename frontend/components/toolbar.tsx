/// <reference path="./components.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import {Link} from "react-router";
import {isNullOrEmpty} from "../util/helpers";
import {IToolbarProps, IToolbarState} from "./components";
import {App} from "../util/api";
import "materialize-css";

class Toolbar extends React.Component<IToolbarProps, IToolbarState> {

  public state: IToolbarState;

  private containerStyle: any = {
    display: "flex",
    flexFlow: "column nowrap",
  };

  private loginContainerStyle(visible: boolean): any {
    return {
      display: visible ? "flex" : "none",
      backgroundColor: "#CED5DB",
      flexFlow: "row nowrap",
      alignItems: "center",
      justifyContent: "center"
    };
  }

  constructor(props: IToolbarProps) {
    super(props);
    this.state = {
      showLogin: false
    };
  }

  public componentDidMount() {
    if (!isNullOrEmpty(localStorage.getItem("jod_jwt"))) {
      const token = localStorage.getItem("jod_jwt");
      App.validate(token).then((user) => {
        this.setState({
          user: user,
          showLogin: false
        });
      });
    } else {
      console.log("Not jwt token found.");
    }
    this.handleLogin();
  }

  private toggleLogin(): void {
    const el = $("#login-container");
    switch (this.state.showLogin) {
      case true: el.slideUp("fast", () => {
        this.setState({ showLogin: false });
      }); break;
      case false: el.slideDown("fast", () => {
        this.setState({ showLogin: true });
      }); break;
    }
  }

  private handleLogin(): void {
    $("#email").on("keyup", (event) => {
      if (event.keyCode === 13) {
        App.requestLogin($(event.target).val()).then((emailSent) => {
          if(emailSent) Materialize.toast("Email sent", 2000);
          else Materialize.toast("Email not found", 2000);
        });
      }
    });
  }

  public render() {
    return (
      <div style={ this.containerStyle }>
        <div className="navbar-fixed">
          <nav style={{ backgroundColor: "#7094DE" }}>
            <div className="nav-wrapper">
              <a href="/" className="brand-logo center">JOliverDecor</a>
              {(() => {
                if (this.state.user) {
                  return(
                    <ul className="right hide-on-med-and-down">
                      <li style={{ marginRight: "15px" }}>Hi, { this.state.user.username }!</li>
                      <li><Link to="/users">Users</Link></li>
                      <li><Link to="/accounts">Accounts</Link></li>
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
        <div id="login-container" style={ this.loginContainerStyle(this.state.showLogin) }>
          <div className="input-field" style={{ width: "50%" }}>
            <input
              placeholder="email address"
              id="email"
              type="text"
              className="validate"
              style={{ textAlign: "center" }}
            />
          </div>
        </div>
        { this.props.children }
      </div>
    );
  }

}

export {Toolbar};
