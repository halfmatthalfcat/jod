/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import {IUsersProps, IUsersState} from "./pages";
import {IFullUser} from "../../common/models/models";
import {User, UserInfo} from "../util/api";
import {UserCard} from "../components/user/userCard";
import {UserModal} from "../components/user/userModal";
import {EmptyCard} from "../components/util/emptyCard";

class Users extends React.Component<IUsersProps, IUsersState> {

  public state: IUsersState;

  constructor(props: IUsersProps) {
    super(props);
    this.state = {
      users: [] as Array<IFullUser>
    };
  }

  public componentDidMount() {
    User.getAllUsersFull().then((users) => {
      this.setState({
        users: users
      });
    });
  }

  private userModal = (user?: IFullUser) => {
    this.setState({ user: user, users: this.state.users });
    $(`#userModal${ user ? user.user.userId : "" }`).openModal({
      dismissible: true,
      ready: () => { console.log("User modal open"); },
      complete: () => { console.log("User modal closed"); }
    });
  };

  private upsertUser = (user: IFullUser) => {
    if (user.user.userId) {
      UserInfo.updateUserInfo(user.userInfo).then((newUserInfo) => {
        User.updateUser(user.user).then((newUser) => {
          User.getAllUsersFull().then((users) => {
            this.setState({
              users: users
            });
            $(`#userModal${ user ? user.user.userId : "" }`).closeModal();
          });
        });
      });
    } else {
      User.addUser(user.user).then((newUser) => {
        UserInfo.addUserInfo(user.userInfo).then((newUserInfo) => {
          User.getAllUsersFull().then((users) => {
            this.setState({
              users: users
            });
            $(`#userModal${ user ? user.user.userId : "" }`).closeModal();
          });
        });
      });
    }
  };

  private deleteUser = (user: IFullUser) => {
    User.deleteUser(user.user.userId).then((deleted) => {
      User.getAllUsersFull().then((users) => {
        this.setState({ users: users });
      });
    });
  };

  public render() {
    return (
      <div className="row">
        <div className="col s12">
          {(() => {
            return this.state.users.map((user: IFullUser) => {
              return (
                <div>
                  <UserCard
                    key={ `userCard${user.user.userId}` }
                    user={user}
                    edit={ this.userModal.bind(this, user) }
                    del={ this.deleteUser.bind(this, user) }
                  />
                  <UserModal
                    key={ `userModal${user.user.userId}` }
                    user={user}
                    update={ this.upsertUser }
                  />
                </div>
              );
            });
          })()}
        </div>
      </div>
    );
  }

}

export {Users};
