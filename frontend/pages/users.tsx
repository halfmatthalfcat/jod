/// <reference path="./pages.d.ts" />

import {IUsersProps, IUsersState} from "./pages";
import {IFullUser} from "../../common/models/models";
import {User, UserInfo} from "../util/api";
import {UserCard} from "../components/user/userCard";
import {UserModal} from "../components/user/userModal";
import {chunk} from "../util/helpers";
import {FloatingAction} from "../components/util/floatingAction";
const update = require("react-addons-update");

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

  private userModal(user?: IFullUser): void {
    $(`#userModal${ user ? user.user.userId : "" }`).openModal({
      dismissible: true,
      ready: () => { console.log("User modal open"); },
      complete: () => { console.log("User modal closed"); }
    });
  };

  private upsertUser(user: IFullUser): void {
    if (user.user.userId) {
      UserInfo.updateUserInfo(user.userInfo).then((newUserInfo) => {
        User.updateUser(user.user).then((newUser) => {
          User.getAllUsersFull().then((users) => {
            this.setState({
              users: users
            });
            $(`#userModal${ user.user.userId ? user.user.userId : "" }`).closeModal();
          });
        });
      });
    } else {
      User.addUser(user.user).then((newUser) => {
        const updatedUserInfo = update(user.userInfo, {
          userId: {$set: newUser.userId}
        });
        UserInfo.addUserInfo(updatedUserInfo).then((newUserInfo) => {
          User.getAllUsersFull().then((users) => {
            this.setState({
              users: users
            });
            $(`#userModal${ user.user.userId ? user.user.userId : "" }`).closeModal();
          });
        });
      });
    }
  };

  private deleteUser(user: IFullUser): void {
    User.deleteUser(user.user.userId).then((deleted) => {
      User.getAllUsersFull().then((users) => {
        this.setState({ users: users });
      });
    });
  };

  public render() {
    return (
      <div>
        {(() => {
          return chunk(this.state.users, 4).map((elm) => {
            return (
              <div className="row">
                {(() => {
                  return elm.map((user) => {
                    return (
                      <div className="col s3">
                        <UserCard
                          key={ `userCard${user.user.userId}` }
                          user={user}
                          edit={ this.userModal.bind(this, user) }
                          del={ this.deleteUser.bind(this, user) }
                        />
                        <UserModal
                          key={ `userModal${user.user.userId}` }
                          user={user}
                          update={ this.upsertUser.bind(this) }
                        />
                      </div>
                    );
                  });
                })()}
              </div>
            );
          });
        })()}
        <UserModal key="userModal" update={ this.upsertUser.bind(this) } />
        <FloatingAction clicked={ this.userModal }/>
      </div>
    );
  }

}

export {Users};
