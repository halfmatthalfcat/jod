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
      showLogin: false,
      searchText: null
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
    this.props.route.routeListener(this.clearSearchOnRouteChange.bind(this));
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

  private searchListen(event: Event): void {
    this.setState({ searchText: $(event.target).val() }, () => {

    })
  }

  private clearSearchOnRouteChange(): void {
    this.setState({ searchText: null });
    $("#search").val("");
  }

  public render() {
    return (
      <div style={ this.containerStyle }>
        <div className="navbar-fixed">
          <nav style={{ backgroundColor: "#7094DE" }}>
            <div
              className="nav-wrapper"
              onMouseEnter={() => {  this.setState({ showSearch: true, showLogin: false }); }}
              onMouseLeave={() => {  this.setState({ showSearch: false, showLogin: false }); }}
              style={{ display: "flex", flexFlow: "row nowrap", justifyContent: "flex-end" }}
            >
              {(() => {
                if (this.state.showSearch || this.state.searchText) {
                  return (
                    <div className="input-field middle" style={{ width: "100%", marginRight: "15px" }}>
                      <input id="search" type="search" onChange={ this.searchListen.bind(this) } required/>
                      <label htmlFor="search"><i className="fa fa-search" /></label>
                    </div>
                  );
                } else {
                  return <a href="/" className="brand-logo center">JOliverDecor</a>;
                }
              })()}
              {(() => {
                if (this.state.user) {
                  return(
                    <ul className="right hide-on-med-and-down" style={{ display: "flex", flexShrink: 0 }}>
                      <li><Link to="/admin">Hi, { this.state.user.username }!</Link></li>
                      <li><Link to="/admin/gallery">Gallery</Link></li>
                      <li><Link to="/admin/users">Users</Link></li>
                      <li><Link to="/admin/accounts">Accounts</Link></li>
                      <li><Link to="/logout">Logout</Link></li>
                    </ul>
                  );
                } else {
                  return(
                    <ul className="right hide-on-med-and-down" style={{ display: "flex", flexShrink: 0 }}>
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
        {
          this.props.children && React.cloneElement(this.props.children, {
            searchText: this.state.searchText
          })
        }
      </div>
    );
  }

}

export {Toolbar};
