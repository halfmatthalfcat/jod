/// <reference path="../../../typings/index.d.ts" />

import {IBudgetRowProps, IBudgetRowState} from "./budget";
import {BudgetItem} from "../../util/api";
const moment = require("moment-timezone");
const update = require("react-addons-update");

class BudgetRow extends React.Component<IBudgetRowProps, IBudgetRowState> {

  public state: IBudgetRowState;

  private rowStyle(hasTags: boolean): any {
    if(hasTags) return {
      borderBottomColor: "#AB7345"
    };
    else return {
      borderBottom: 0
    };
  }

  private currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  constructor(props: IBudgetRowProps) {
    super(props);
    console.log(`Rendering ${props.budgetItem.budgetItemId}`);
    this.state = { budgetItem: update(props.budgetItem, {
      invoiced: {$apply: (invoiceDate: string) => {
        if(invoiceDate) return moment(invoiceDate).format("YYYY-MM-DD HH:MM:ss");
        else return null;
      }}
    })};
  }

  public render() {
    return (
      <tr style={this.rowStyle(this.props.budgetItem.tags.length < 1)}>
        <td style={{ margin: 0, width: "10%" }}>
          <span>{ moment(this.props.budgetItem.created, "YYYY-MM-DD'T'HH:mm:ssSSSZ").format("MM/DD/YYYY") }</span>
        </td>
        <td style={{ margin: 0, width: "60%" }}>
          <span>{ this.props.budgetItem.description }</span>
        </td>
        <td style={{ margin: 0, width: "10%" }}>
          <span>{ this.currencyFormatter.format(this.props.budgetItem.totalPrice) }</span>
        </td>
        <td style={{ textAlign: "center", padding: 0, width: "20%" }}>
          <a
            className="wave-effect waves-light btn-flat"
            onClick={() => { this.props.update(); }}
          >
            Edit
          </a>
          <a
            className="waves-effect waves-light btn-flat"
            style={{ verticalAlign: "middle" }}
            onClick={() => { this.props.del(); }}
          >
            Delete
          </a>
          {(() => {
            if(this.props.budgetItem.invoiced) {
              return (
                <p>
                  <input
                    type="checkbox"
                    id={ `invoice${this.props.budgetItem.budgetItemId}` }
                    checked="checked"
                    disabled="disabled"
                  />
                  <label htmlFor={ `invoice${this.props.budgetItem.budgetItemId}` }>
                    Invoiced on { moment(this.props.budgetItem.invoiced).format("MM/DD/YYYY") }
                  </label>
                </p>
              );
            } else {
              return (
                <p>
                  <input
                    type="checkbox"
                    id={ `invoice${this.props.budgetItem.budgetItemId}` }
                    onChange={(event) => {
                      if ($(event.target).is(":checked")) this.props.addInvoiceItem();
                      else this.props.removeInvoiceItem();
                    }}
                  />
                  <label htmlFor={ `invoice${this.props.budgetItem.budgetItemId}` }>
                    Invoice
                  </label>
                </p>
              );
            }
          })()}
        </td>
      </tr>
    );
  }

}

export {BudgetRow};