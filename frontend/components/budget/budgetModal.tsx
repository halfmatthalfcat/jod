import {IBudgetModalState, IBudgetModalProps} from "./budget";
const update = require("react-addons-update");
import "materialize-css";

class BudgetModal extends React.Component<IBudgetModalProps, IBudgetModalState> {

  public state: IBudgetModalState;

  constructor(props: IBudgetModalProps) {
    super(props);
    if(props.budget) {
      this.state = { budget: props.budget }
    } else this.state = {
      budget: {
        userId: -1,
        budgetName: "New Budget"
      }
    };
  }

  public componentDidMount(): void {
    $(`#budgetModalSelect${this.props.budget ? this.props.budget.budgetId : "" }`).material_select();
    $(`#budgetModalSelect${this.props.budget ? this.props.budget.budgetId : "" }`).on("change", (event) => {
      this.setState({ budget: update(this.state.budget, {
          userId: {$set: $(event.target).val() }
        })
      });
    });
    Materialize.updateTextFields();
  }

  public componentDidUpdate(prevProps: IBudgetModalProps, prevState: IBudgetModalState): void {
    $(`#budgetModalSelect${this.props.budget ? this.props.budget.budgetId : "" }`).material_select();
    Materialize.updateTextFields();
  }

  private sendBudget(): void {
    if(
      this.state.budget.userId > -1
    ) {
      this.props.update(this.state.budget);
    }
  }

  public render() {
    return (
      <div
        id={ `budgetModal${this.props.budget ? this.props.budget.budgetId : "" }` }
        className="modal modal-fixed-footer"
        style={{ height: "60%" }}
      >
        <div className="modal-content">
          <h4>{ this.props.budget ? "Edit Budget" : "New Budget" }</h4>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <select id={`budgetModalSelect${this.props.budget ? this.props.budget.budgetId : "" }`}>
                    <option value="" disabled selected>Select A User</option>
                    {(() => {
                      return this.props.users.map((user) => {
                        if(user.user.userId === this.state.budget.userId) {
                          return (
                            <option value={ user.user.userId } selected>
                              { `${user.userInfo.lastName}, ${user.userInfo.firstName}` }
                            </option>
                          );
                        } else {
                          return (
                            <option value={ user.user.userId }>
                              { `${user.userInfo.lastName}, ${user.userInfo.firstName}` }
                            </option>
                          );
                        }
                      })
                    })()}
                  </select>
                  <label>Owner</label>
                </div>
                <div className="input-field col s6">
                  <input
                    id="budgetName"
                    type="text"
                    className="validate"
                    pattern=".+"
                    defaultValue={
                      this.props.budget ? this.props.budget.budgetName : null
                    }
                    onChange={(event) => {
                      if(($(event.target)[0] as HTMLInputElement).checkValidity()) {
                        this.setState({ budget: update(this.state.budget, {
                            budgetName: {$set: $(event.target).val()}
                          })
                        })
                      }
                    }}
                  />
                  <label htmlFor="budgetName">Budget Name</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <a className="modal-action modal-close wave-effect btn-flat">Cancel</a>
          <a className="modal-action wave-effect btn-flat" onClick={ this.sendBudget }>Save</a>
        </div>
      </div>
    );
  }

}

export {BudgetModal};