/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import {IBudgetProps, IBudgetState} from "./pages";
import {BudgetRow} from "../components/budget/budgetRow";
import {BudgetApi, Tag} from "../util/api";
import {BudgetHeader} from "../components/budget/budgetHeader";
import {IBudgetItem} from "../../common/models/models";
import {TagRow} from "../components/budget/tagRow";
const moment = require("moment-timezone");

class Budget extends React.Component<IBudgetProps, IBudgetState> {

  public state: IBudgetState;

  constructor(props: IBudgetProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    BudgetApi.getBudgetItems(this.props.params.budgetId).then((budgetItems) => {
      Tag.getAllTagGroups().then((tagGroups) => {
        this.setState({ budgetItems: budgetItems, tagGroups: tagGroups });
      })
    });
    $(".pp-wrapper").pushpin({ top: $(".budgetWrapper").offset().top });
  }

  private handleHeader(name: string): void {
    if (
      this.state.selectedHeader &&
      this.state.selectedHeader === name &&
      this.state.sortDirection === "desc"
    ) {
      this.setState({ selectedHeader: null, sortDirection: null, budgetItems: this.budgetSort("date", "asc") });
    } else if (
      this.state.selectedHeader &&
      this.state.selectedHeader === name &&
      this.state.sortDirection === "asc"
    ) {
      this.setState({ sortDirection: "desc", budgetItems: this.budgetSort(name, "desc") });
    } else if (
      this.state.selectedHeader &&
      this.state.sortDirection &&
      this.state.selectedHeader !== name
    ) {
      this.setState({ selectedHeader: name, sortDirection: "asc", budgetItems: this.budgetSort(name, "asc") })
    } else {
      this.setState({ selectedHeader: name, sortDirection: "asc", budgetItems: this.budgetSort(name, "asc") })
    }
  }

  private budgetSort(name: string, direction: string): Array<IBudgetItem> {
    switch(name) {
      case "date": return this.state.budgetItems.sort((a, b) => {
        if (moment(a.created).isBefore(moment(b.created))) return direction === "desc" ? 1 : -1;
        else if (moment(a.created).isAfter(moment(b.created))) return direction === "desc" ? -1 : 1;
        else return 0;
      });
      case "description": return this.state.budgetItems.sort((a, b) => {
        if (a.description < b.description) return direction === "desc" ? 1 : -1;
        else if (a.description > b.description) return direction === "desc" ? -1 : 1;
        else return 0;
      });
      case "totalPrice": return this.state.budgetItems.sort((a, b) => {
        if (a.totalPrice < b.totalPrice) return direction === "desc" ? 1 : -1;
        else if (a.totalPrice > b.totalPrice) return direction === "desc" ? -1 : 1;
        else return 0;
      });
      default: return this.state.budgetItems
    }
  }

  public render() {
    return (
      <div className="budgetWrapper" style={{ padding: "10px", display: "flex" }}>
        <div className="budgetTableWrapper" style={{ display: "flex", flexBasis: "100%" }}>
          <table style={{ width: "100%" }}>
            <thead>
            <tr>
              <BudgetHeader
                name="description"
                headerClicked={ this.handleHeader.bind(this, "description") }
                selectedHeader={ this.state.selectedHeader }
                direction={ this.state.sortDirection }
              />
              <BudgetHeader
                name="date"
                headerClicked={ this.handleHeader.bind(this, "date") }
                selectedHeader={ this.state.selectedHeader }
                direction={ this.state.sortDirection }
              />
              <BudgetHeader
                name="totalPrice"
                headerClicked={ this.handleHeader.bind(this, "totalPrice") }
                selectedHeader={ this.state.selectedHeader }
                direction={ this.state.sortDirection }
              />
            </tr>
            </thead>
            <tbody>
            {(() => {
              if (this.state.budgetItems) {
                return this.state.budgetItems.reduce((acc, budgetItem) => {
                  acc.push(<BudgetRow budgetItem={ budgetItem } />);
                  acc.push(<TagRow tags={ budgetItem.tags } />);
                  return acc;
                }, []);
              }
            })()}
            </tbody>
          </table>
        </div>
        <div className="ppWrapper" style={{ display: "flex" }}>
          <div>Pushpin</div>
        </div>
      </div>
    );
  }

}

export {Budget};
