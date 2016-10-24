import {ISubTotalRowProps} from "./budget";

class SubTotalRow extends React.Component<ISubTotalRowProps, {}> {

  private currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  constructor(props: ISubTotalRowProps) {
    super(props);
    this.getSubTotal = this.getSubTotal.bind(this);
    this.getInvoicedTotal = this.getInvoicedTotal.bind(this);
  }

  private getSubTotal(): number {
    if (this.props.budgetItems) {
      return this.props.budgetItems.reduce((acc, budgetItem) => {
        return acc + budgetItem.totalPrice;
      }, 0.00);
    } else return 0.00;
  };

  private getInvoicedTotal(): number {
    if (this.props.budgetItems) {
      return this.props.budgetItems
        .filter((budgetItem) => { return !!budgetItem.invoiced; })
        .reduce((acc, budgetItem) => {
          return acc + budgetItem.totalPrice;
        }, 0.00);
    } else return 0.00;
  };

  private getGrandTotal(): number {
    return this.getSubTotal() - this.getInvoicedTotal();
  };

  public render() {
    return (
      <div id="subtotalModal" className="modal bottom-sheet">
        <div className="modal-content">
          <h4>Budget Stats</h4>
          <p>
            Total Budgeted: <span>{ this.currencyFormatter.format(this.getSubTotal()) }</span><br/>
            Total Invoiced: <span>{ this.currencyFormatter.format(this.getInvoicedTotal()) }</span><br/>
            Total Outstanding: <b>{ this.currencyFormatter.format(this.getGrandTotal()) }</b>
          </p>
        </div>
      </div>
    );
  }

}

export {SubTotalRow};