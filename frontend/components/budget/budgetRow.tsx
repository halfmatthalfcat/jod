/// <reference path="../../../typings/index.d.ts" />

import {IBudgetRowProps} from "./budget";
const moment = require("moment-timezone");

class BudgetRow extends React.Component<IBudgetRowProps, {}> {

  private priceFormatter = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });

  constructor(props: IBudgetRowProps) {
    super(props);
  }

  public componentDidMount(): void {
    const date = moment(this.props.budgetItem.created, "YYYY-MM-DD'T'HH:mm:ssSSSZ");
    const input = $(`#datepicker${this.props.budgetItem.budgetItemId}`).pickadate({
      format: "mm/dd/yyyy"
    });
    const picker = input.pickadate("picker");
    picker.set('select', [date.year(), date.month(), date.date()]);
  }

  public render() {
    return (
      <tr>
        <td>
          <input
            id="description"
            defaultValue={ this.props.budgetItem.description }
            type="text"
            className="validate"
          />
        </td>
        <td>
          <input
            id={ `datepicker${this.props.budgetItem.budgetItemId}` }
            type="date"
            className="datepicker"
            defaultValue={ moment(this.props.budgetItem.created, "YYYY-MM-DD'T'HH:mm:ssSSSZ").local().format("MM/DD/YYYY") }
          />
        </td>
        <td style={{ display: "flex", alignItems: "baseline" }}>
          $<input
            id="totalPrice"
            type="number"
            className="validate"
            defaultValue={ this.props.budgetItem.totalPrice }
          />
        </td>
      </tr>
    );
  }

}

export {BudgetRow};