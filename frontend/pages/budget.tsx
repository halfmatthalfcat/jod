/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import {IBudgetProps, IBudgetState} from "./pages";
import {BudgetRow} from "../components/budget/budgetRow";
import {BudgetApi, BudgetItem, Tag} from "../util/api";
import {BudgetHeader} from "../components/budget/budgetHeader";
import {IBudgetItem, ITag} from "../../common/models/models";
import {TagRow} from "../components/budget/tagRow";
import {BudgetActions} from "../components/budget/budgetActions";
import {BudgetItemModal} from "../components/budget/budgetItemModal";
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

  private addItem(budgetItem: IBudgetItem): void {
    BudgetItem.addBudgetItem(budgetItem).then(() =>{
      BudgetApi.getBudgetItems(this.props.params.budgetId).then((budgetItems) => {
        Tag.getAllTagGroups().then((tagGroups) => {
          this.setState({ budgetItems: budgetItems, tagGroups: tagGroups });
          $("#budgetItemModal").closeModal();
        })
      });
    });
  }

  private deleteItem(budgetItem: IBudgetItem): void {
    BudgetItem.deleteBudgetItem(budgetItem.budgetItemId).then(() => {
      BudgetApi.getBudgetItems(this.props.params.budgetId).then((budgetItems) => {
        Tag.getAllTagGroups().then((tagGroups) => {
          this.setState({ budgetItems: budgetItems, tagGroups: tagGroups });
        })
      });
    });
  }

  private addTagMap(budgetItem: IBudgetItem, tag: ITag): void {
    BudgetItem.addTagToBudgetItem(budgetItem.budgetItemId, tag.tagId).then(() => {
      BudgetApi.getBudgetItems(this.props.params.budgetId).then((budgetItems) => {
        Tag.getAllTagGroups().then((tagGroups) => {
          this.setState({ budgetItems: budgetItems, tagGroups: tagGroups });
        })
      });
    });
  }

  private deleteTagMap(budgetItem: IBudgetItem, tag: ITag): void {
    BudgetItem.removeTagFromBudgetItem(budgetItem.budgetItemId, tag.tagId).then(() => {
      BudgetApi.getBudgetItems(this.props.params.budgetId).then((budgetItems) => {
        Tag.getAllTagGroups().then((tagGroups) => {
          this.setState({ budgetItems: budgetItems, tagGroups: tagGroups });
        })
      });
    });
  }

  public render() {
    return (
      <div className="budgetWrapper" style={{ padding: "10px", display: "flex" }}>
        <div className="budgetTableWrapper" style={{ display: "flex", flexBasis: "100%" }}>
          <table style={{ width: "100%" }}>
            <thead>
            <tr>
              <BudgetHeader
                name="date"
                headerClicked={ this.handleHeader.bind(this, "date") }
                selectedHeader={ this.state.selectedHeader }
                direction={ this.state.sortDirection }
              />
              <BudgetHeader
                name="description"
                headerClicked={ this.handleHeader.bind(this, "description") }
                selectedHeader={ this.state.selectedHeader }
                direction={ this.state.sortDirection }
              />
              <BudgetHeader
                name="totalPrice"
                headerClicked={ this.handleHeader.bind(this, "totalPrice") }
                selectedHeader={ this.state.selectedHeader }
                direction={ this.state.sortDirection }
              />
              <td />
            </tr>
            </thead>
            <tbody>
            {(() => {
              if (this.state.budgetItems) {
                return this.state.budgetItems.reduce((acc, budgetItem) => {
                  acc.push(
                    <BudgetRow
                      key={ `budgetRow${budgetItem.budgetItemId}` }
                      budgetItem={ budgetItem }
                      del={ this.deleteItem.bind(this, budgetItem) }
                    />
                  );
                  acc.push(
                    <TagRow
                      key={ `tagRow${budgetItem.budgetItemId}` }
                      budgetItemId={ budgetItem.budgetItemId }
                      tags={ budgetItem.tags }
                      tagGroups={ this.state.tagGroups }
                      addTagMap={ this.addTagMap.bind(this, budgetItem) }
                      delTagMap={ this.deleteTagMap.bind(this, budgetItem) }
                    />
                  );
                  return acc;
                }, []);
              }
            })()}
            </tbody>
          </table>
        </div>
        <BudgetActions />
        <BudgetItemModal
          tagGroups={ this.state.tagGroups }
          budgetId={ this.props.params.budgetId }
          addBudgetItem={ this.addItem.bind(this) }
        />
      </div>
    );
  }

}

export {Budget};
