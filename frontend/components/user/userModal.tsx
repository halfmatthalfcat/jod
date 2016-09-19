/// <reference path="./user.d.ts" />
/// <reference path="../../../typings/index.d.ts" />

import {IUserModalProps, IUserModalState} from "./user";
import {Materialize} from "../../../common/materialize/materialize";
const update = require("react-addons-update");

class UserModal extends React.Component<IUserModalProps, IUserModalState> {

  public state: IUserModalState;

  constructor(props: IUserModalProps) {
    super(props);
    console.log(props);
    this.state = {
      user: update(props.user, {
        userInfo: {
          userId: {$set: props.user.user.userId}
        }
      })
    };
  }

  public componentWillReceiveProps(nextProps: IUserModalProps): void {
    Materialize.updateTextFields();
  }

  public render() {
    return(
      <div id={ `userModal${this.props.user ? this.props.user.user.userId : "" }` } className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>{ this.props.user ? "Edit User" : "New User" }</h4>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="firstName"
                    type="text"
                    className="validate"
                    defaultValue={
                      this.props.user ? this.props.user.userInfo.firstName : null
                    }
                    onChange={(event) => { this.setState({ user: update(this.state.user, {
                          userInfo: {
                            firstName: {$set: $(event.target).val()}
                          }
                        })
                      });
                    }}
                  />
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div className="input-field col s6">
                  <input
                    id="lastName"
                    type="text"
                    className="validate"
                    defaultValue={
                      this.props.user ? this.props.user.userInfo.lastName : null
                    }
                    onChange={(event) => { this.setState({ user: update(this.state.user, {
                          userInfo: {
                            lastName: {$set: $(event.target).val()}
                          }
                        })
                      });
                    }}
                  />
                  <label htmlFor="lastName">Last Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="username"
                    type="text"
                    className="validate"
                    defaultValue={
                      this.props.user ? this.props.user.user.username : null
                    }
                    onChange={(event) => { this.setState({ user: update(this.state.user, {
                          user: {
                            username: {$set: $(event.target).val()}
                          }
                        })
                      });
                    }}
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="input-field col s6">
                  <input
                    id="email"
                    type="email"
                    className="validate"
                    defaultValue={
                      this.props.user ? this.props.user.user.email : null
                    }
                    onChange={(event) => { this.setState({ user: update(this.state.user, {
                          user: {
                            email: {$set: $(event.target).val()}
                          }
                        })
                      });
                    }}
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="address1"
                    type="text"
                    className="validate"
                    defaultValue={
                      this.props.user ? this.props.user.userInfo.address1 : null
                    }
                    onChange={(event) => { this.setState({ user: update(this.state.user, {
                          userInfo: {
                            address1: {$set: $(event.target).val()}
                          }
                        })
                      });
                    }}
                  />
                  <label htmlFor="address1">Address 1</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="address2"
                    type="text"
                    className="validate"
                    defaultValue={
                      this.props.user ? this.props.user.userInfo.address2 : null
                    }
                    onChange={(event) => { this.setState({ user: update(this.state.user, {
                          userInfo: {
                            address2: {$set: $(event.target).val()}
                          }
                        })
                      });
                    }}
                  />
                  <label htmlFor="address2">Address 2</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s4">
                  <input
                    id="city"
                    type="text"
                    className="validate"
                    defaultValue={
                      this.props.user ? this.props.user.userInfo.city : null
                    }
                    onChange={(event) => { this.setState({ user: update(this.state.user, {
                          userInfo: {
                            city: {$set: $(event.target).val()}
                          }
                        })
                      });
                    }}
                  />
                  <label htmlFor="city">City</label>
                </div>
                <div className="input-field col s4">
                  <input
                    id="state"
                    type="text"
                    className="validate"
                    defaultValue={
                      this.props.user ? this.props.user.userInfo.state : null
                    }
                    onChange={(event) => { this.setState({ user: update(this.state.user, {
                          userInfo: {
                            state: {$set: $(event.target).val()}
                          }
                        })
                      });
                    }}
                  />
                  <label htmlFor="state">State</label>
                </div>
                <div className="input-field col s4">
                  <input
                    id="zipCode"
                    type="text"
                    className="validate"
                    defaultValue={
                      this.props.user ? this.props.user.userInfo.zipCode : null
                    }
                    onChange={(event) => { this.setState({ user: update(this.state.user, {
                          userInfo: {
                            zipCode: {$set: $(event.target).val()}
                          }
                        })
                      });
                    }}
                  />
                  <label htmlFor="zipCode">Zip Code</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <a className="modal-action modal-close waves-effect btn-flat">Cancel</a>
          <a className="modal-action waves-effect btn-flat" onClick={() => { this.props.update(this.state.user); }}>Save</a>
        </div>
      </div>
    );
  }

}

export {UserModal};