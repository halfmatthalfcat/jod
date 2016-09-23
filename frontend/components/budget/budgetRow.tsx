/// <reference path="../../../typings/index.d.ts" />

import {IBudgetRowProps, IBudgetRowState} from "./budget";
import {BudgetItem} from "../../util/api";
const moment = require("moment-timezone");
const update = require("react-addons-update");

class BudgetRow extends React.Component<IBudgetRowProps, IBudgetRowState> {

  public state: IBudgetRowState;

  private tdStyle = {
    paddingBottom: 0
  };

  private inputStyle = {
    margin: 0
  };

  constructor(props: IBudgetRowProps) {
    super(props);
    this.state = { budgetItem: props.budgetItem };
  }

  public componentDidMount(): void {
    const date = moment(this.props.budgetItem.created, "YYYY-MM-DD'T'HH:mm:ssSSSZ");
    const input = $(`#datepicker${this.props.budgetItem.budgetItemId}`).pickadate({
      format: "mm/dd/yyyy",
      onSet: (change) => {
        this.setState({
          budgetItem: update(this.state.budgetItem, {
            created: {$set: moment(change.select).format("YYYY-MM-DD HH:mm:ss")}
          })
        })
      }
    });
    const picker = input.pickadate("picker");
    picker.set('select', [date.year(), date.month(), date.date()]);
  }

  public componentWillUpdate(nextProps: IBudgetRowProps, nextState: IBudgetRowState): void {
    BudgetItem.updateBudgetItem(nextState.budgetItem);
  }

  public render() {
    return (
      <tr>
        <td style={this.tdStyle}>
          <input
            id={ `description${this.props.budgetItem.budgetItemId}` }
            defaultValue={ this.props.budgetItem.description }
            type="text"
            className="validate"
            style={this.inputStyle}
            pattern=".+"
            onChange={(event) => {
              if(($(event.target)[0] as HTMLInputElement).checkValidity()) {
                this.setState({ budgetItem: update(this.state.budgetItem, {
                  description: {$set: $(event.target).val()}
                  })
                })
              }
            }}
          />
        </td>
        <td style={this.tdStyle}>
          <input
            id={ `datepicker${this.props.budgetItem.budgetItemId}` }
            type="date"
            className="datepicker"
            style={this.inputStyle}
            defaultValue={ moment(this.props.budgetItem.created, "YYYY-MM-DD'T'HH:mm:ssSSSZ").local().format("MM/DD/YYYY") }
          />
        </td>
        <td style={{ display: "flex", alignItems: "baseline", paddingBottom: 0 }}>
          $<input
            id={ `totalPrice${this.props.budgetItem.budgetItemId}` }
            type="text"
            pattern="^[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$"
            className="validate"
            defaultValue={ this.props.budgetItem.totalPrice }
            style={this.inputStyle}
            onChange={(event) => {
              if(($(event.target)[0] as HTMLInputElement).checkValidity()) {
                this.setState({ budgetItem: update(this.state.budgetItem, {
                    totalPrice: {$set: parseFloat($(event.target).val().replace(/,/g,''))}
                  })
                })
              }
            }}
          />
        </td>
        <td style={{ textAlign: "center", padding: 0 }}>
          <a
            className="waves-effect waves-light btn-flat"
            style={{ verticalAlign: "middle" }}
            onClick={() => { this.props.del(); }}
          >Delete</a>
        </td>
      </tr>
    );
  }

}

export {BudgetRow};