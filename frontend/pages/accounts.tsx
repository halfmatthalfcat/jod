/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import {IAccountsProps, IAccountsState} from "./pages";
import {User} from "../util/api";
import {IBudget, IFullUser} from "../../common/models/models";

class Accounts extends React.Component<IAccountsProps, IAccountsState> {

  public state: IAccountsState;

  constructor(props: IAccountsProps) {
    super(props);
    this.state = {
      users: new Array<[IFullUser, Array<IBudget>]>()
    };
  }

  public componentDidMount() {
    User.getAllUsersFull().then((users) => {
      Promise.all<[IFullUser, Array<IBudget>]>(users.map((user) => {
        return new Promise((resolve, reject) => {
          User.getUserBudgets(user.user.userId).then((budgets) => {
            resolve([user, budgets]);
          });
        });
      })).then((userBudgets) => {
        this.setState({ users: userBudgets });
      });
    });
    $(".collapsible").collapsible({ accordion: true });
  }

  public render() {
    return (
      <ul className="collapsible" data-collapsible="accordion" style={{ margin: "10px" }}>
        {(() => {
          console.log(this.state.users);
          if(this.state.users) {
            return this.state.users.map((userBudget) => {
              return (
                <li>
                  <div className="collapsible-header">{ userBudget[0].userInfo.lastName }, { userBudget[0].userInfo.firstName }</div>
                  <div className="collapsible-body"><p>Accounts here</p></div>
                </li>
              );
            });
          }
        })()}
      </ul>
    );
  }

}

export {Accounts};
