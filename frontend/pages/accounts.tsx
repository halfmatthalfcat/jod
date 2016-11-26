/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import {IAccountsProps, IAccountsState} from "./pages";
import {User, BudgetApi} from "../util/api";
import {IBudget, IFullUser} from "../../common/models/models";
import {chunk} from "../util/helpers";
import {BudgetCard} from "../components/budget/budgetCard";
import {BudgetModal} from "../components/budget/budgetModal";
import {FloatingAction} from "../components/util/floatingAction";

class Accounts extends React.PureComponent<IAccountsProps, IAccountsState> {

  public state: IAccountsState;

  constructor(props: IAccountsProps) {
    super(props);
    this.state = {
      users: new Array<[IFullUser, Array<IBudget>]>()
    };
    this.searchFilter = this.searchFilter.bind(this);
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

  private budgetModal(budget?: IBudget): void {
    console.log(`Opening Budget ${budget ? budget.userId : "X"}`);
    $(`#budgetModal${ budget ? budget.budgetId : "" }`).openModal({
      dismissible: true
    });
  }

  private upsertBudget(budget: IBudget): void {
    if(budget.budgetId) {
      BudgetApi.updateBudget(budget).then(() => {
        User.getAllUsersFull().then((users) => {
          Promise.all<[IFullUser, Array<IBudget>]>(users.map((user) => {
            return new Promise((resolve, reject) => {
              User.getUserBudgets(user.user.userId).then((budgets) => {
                resolve([user, budgets]);
              });
            });
          })).then((userBudgets) => {
            this.setState({ users: userBudgets });
            $(`#budgetModal${ budget.budgetId ? budget.budgetId : "" }`).closeModal();
          });
        });
      });
    } else {
      BudgetApi.addBudget(budget).then(() => {
        User.getAllUsersFull().then((users) => {
          Promise.all<[IFullUser, Array<IBudget>]>(users.map((user) => {
            return new Promise((resolve, reject) => {
              User.getUserBudgets(user.user.userId).then((budgets) => {
                resolve([user, budgets]);
              });
            });
          })).then((userBudgets) => {
            this.setState({ users: userBudgets });
            $(`#budgetModal${ budget.budgetId ? budget.budgetId : "" }`).closeModal();
          });
        });
      });
    }
  }

  private deleteBudget(budget: IBudget): void {
    BudgetApi.deleteBudget(budget.budgetId).then(() => {
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
    });
  }

  private searchFilter(user: [IFullUser, Array<IBudget>]): boolean {
    const [u, budgetArray] = user;
    if (
      this.props.searchText &&
      u.userInfo.lastName &&
      u.userInfo.firstName
    ) {
      const lowerSearchText = this.props.searchText.toLowerCase();
      return (
        u.userInfo.lastName.toLowerCase().includes(lowerSearchText) ||
        u.userInfo.firstName.toLowerCase().includes(lowerSearchText)
      );
    } else if (!this.props.searchText) { return true; } else { return false; }
  }

  private removeEmpties(user: [IFullUser, Array<IBudget>]): boolean {
    const [u, budgetArray] = user;
    return u.userInfo.lastName ? true : false;
  }

  private sortByUser(user1: [IFullUser, Array<IBudget>], user2: [IFullUser, Array<IBudget>]): number {
    const [u1, budgetArray] = user1;
    const [u2, budgetArray2] = user2;

    if (u1.userInfo && u1.userInfo.lastName && u2.userInfo && u2.userInfo.lastName) {
      if(u1.userInfo.lastName > u2.userInfo.lastName) return 1;
      else if (u1.userInfo.lastName < u2.userInfo.lastName) return -1;
      else return 0;
    } else return -1;

  }

  public render() {
    console.log("Rendering accounts");
    return (
      <ul className="collapsible" data-collapsible="accordion" style={{ margin: "10px" }}>
        {(() => {
          if(this.state.users) {
            return this.state.users
              .filter(this.removeEmpties)
              .filter(this.searchFilter)
              .sort(this.sortByUser)
              .map((userBudget) => {
                return (
                  <li>
                    <div className="collapsible-header" style={{ backgroundColor: "#AB7345", color: "white" }}>
                      <div style={{ display: "flex", flexFlow: "row nowrap", alignItems: "center" }}>
                        <div>{ userBudget[0].userInfo.lastName }, { userBudget[0].userInfo.firstName }</div>
                      </div>
                    </div>
                    <div className="collapsible-body">
                      {(() => {
                        return chunk(userBudget[1], 6).map((elm) => {
                          return (
                            <div className="row">
                              {(() => {
                                return elm.map((budget) => {
                                  return (
                                    <div className="col s2">
                                      <BudgetCard
                                        key={ `budget${budget.budgetId}` }
                                        budget={ budget }
                                        edit={ this.budgetModal.bind(this, budget) }
                                        del={ this.deleteBudget.bind(this, budget) }
                                      />
                                      <BudgetModal
                                        key={ `budgetModal${budget.budgetId}` }
                                        budget={ budget }
                                        users={this.state.users.map((userBudget) => { return userBudget[0]; })}
                                        update={ this.upsertBudget.bind(this) }
                                      />
                                    </div>
                                  );
                                });
                              })()}
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </li>
                );
            });
          }
        })()}
        <BudgetModal
          key="budgetModal"
          users={ this.state.users.map((userBudget) => { return userBudget[0]; }) }
          update={ this.upsertBudget.bind(this) }
        />
        <FloatingAction clicked={ this.budgetModal } />
      </ul>
    );
  }

}

export {Accounts};
