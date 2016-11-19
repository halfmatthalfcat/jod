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
import {SortModal} from "../components/budget/sortModal";
import {TagModal} from "../components/budget/tagModal";
import {saveAs} from "file-saver";
import {SubTotalRow} from "../components/budget/subtotalRow";
const moment = require("moment-timezone");
const update = require("react-addons-update");

class Budget extends React.PureComponent<IBudgetProps, IBudgetState> {

  public state: IBudgetState;

  private budgetTitleStyle: any = {
    display: "flex",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold"
  };

  constructor(props: IBudgetProps) {
    super(props);
    this.state = { filters: { tags: [] }, invoiceItems: [] };
  }

  public componentDidMount() {
    BudgetApi.getBudget(this.props.params.budgetId).then((budget) => {
      BudgetApi.getBudgetItems(this.props.params.budgetId).then((budgetItems) => {
        Tag.getAllTagGroups().then((tagGroups) => {
          this.setState({ budgetItems: budgetItems, tagGroups: tagGroups, budget: budget });
        })
      });
    });
  }

  private resetBudget(): Promise<void> {
    return BudgetApi.getBudgetItems(this.props.params.budgetId).then((budgetItems) => {
      Tag.getAllTagGroups().then((tagGroups) => {
        this.setState({
          budgetItems: budgetItems,
          tagGroups: tagGroups
        });
      });
    });
  }

  private tagFilter(budgetItem: IBudgetItem): boolean {
    if (this.state.filters.tags.length === 0) return true;
    else if (budgetItem.tags) {
      const itemTags = budgetItem.tags.map((tag) => { return tag.tagId; });
      return this.state.filters.tags.reduce((acc, tag) => {
        if(itemTags.indexOf(tag.tagId) !== -1) return true;
        else return acc;
      }, false);
    } else return false;
  }

  private searchFilter(budgetItem: IBudgetItem): boolean {
    if (this.props.searchText) {
      return budgetItem.description.toLowerCase().includes(this.props.searchText.toLowerCase());
    } else return true;
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

  private toggleTagFilter(tag: ITag): void {
    if(this.state.filters.tags
        .map((t) => { return t.tagId; })
        .indexOf(tag.tagId) === -1) {
      this.setState(update(this.state, {
        filters: {
          tags: {$push: [tag]}
        }
      }), () => { this.resetBudget(); });
    } else {
      this.setState(update(this.state, {
        filters: {
          tags: {$set: this.state.filters.tags.filter((t) => { return t.tagId !== tag.tagId; })}
        }
      }), () => { this.resetBudget(); })
    }
  }

  private addInvoiceItem(budgetItem: IBudgetItem): void {
    this.setState(update(this.state, {
      invoiceItems: {$push: [budgetItem]}
    }));
  }

  private removeInvoiceItem(budgetItem: IBudgetItem): void {
    this.setState(update(this.state, {
      invoiceItems: {$set: this.state.invoiceItems.filter((invoiceItem) => {
        return invoiceItem.budgetItemId !== budgetItem.budgetItemId;
      })}
    }));
  }

  private addItem(budgetItem: IBudgetItem): void {
    BudgetItem.addBudgetItem(budgetItem).then(() => {
      this.resetBudget().then(() => {
        $("#budgetItemModal").closeModal();
      }, (rejection) => { console.log(rejection); });
    });
  }

  private updateItem(budgetItem: IBudgetItem): void {
    BudgetItem.updateBudgetItem(budgetItem).then(() => {
      this.resetBudget().then(() => {
        this.setState({ focusedItem: null }, () => {
          $("#budgetItemModal").closeModal();
        });
      });
    });
  }

  private deleteItem(budgetItem: IBudgetItem): void {
    BudgetItem.deleteBudgetItem(budgetItem.budgetItemId).then(() => {
      this.resetBudget();
    });
  }

  private addTagMap(budgetItem: IBudgetItem, tag: ITag): void {
    BudgetItem.addTagToBudgetItem(budgetItem.budgetItemId, tag.tagId).then(() => {
      this.resetBudget();
    });
  }

  private deleteTagMap(budgetItem: IBudgetItem, tag: ITag): void {
    BudgetItem.removeTagFromBudgetItem(budgetItem.budgetItemId, tag.tagId).then(() => {
      this.resetBudget();
    });
  }

  private generateBudget(): void {
    BudgetApi.generateBudget(this.state.budget.budgetId, this.state.budgetItems).then((pdf) => {
      saveAs(pdf, `${this.state.budget.budgetName}_BUDGET_${moment().local().format("MM/DD/YYYY")}`);
      this.resetBudget();
    });
  }

  private generateInvoice(): void {
    BudgetApi.generateInvoice(this.state.budget.budgetId, this.state.invoiceItems).then((pdf) => {
      saveAs(pdf, `${this.state.budget.budgetName}_INVOICE_${moment().local().format("MM/DD/YYYY")}`);
      this.resetBudget();
    });
  }

  private unsetBudgetFocus(): void {
    this.setState({ focusedItem: null }, () => {
      $("#budgetItemModal").openModal();
    });
  }

  private setBudgetFocus(budgetItem: IBudgetItem): void {
    this.setState({ focusedItem: budgetItem }, () => {
      $("#budgetItemModal").openModal();
    });
  }

  public render() {
    return (
      <div className="budgetWrapper" style={{ display: "flex" }}>
        <div className="budgetTableWrapper" style={{ display: "flex", flexBasis: "100%" }}>
          <table className="bordered" style={{ width: "100%" }}>
            <thead>
            <tr style={{ borderBottomColor: "#AB7345" }}>
              <BudgetHeader
                name="date"
                headerClicked={ this.handleHeader.bind(this, "date") }
                selectedHeader={ this.state.selectedHeader }
                direction={ this.state.sortDirection }
                width={10}
              />
              <BudgetHeader
                name="description"
                headerClicked={ this.handleHeader.bind(this, "description") }
                selectedHeader={ this.state.selectedHeader }
                direction={ this.state.sortDirection }
                width={60}
              />
              <BudgetHeader
                name="totalPrice"
                headerClicked={ this.handleHeader.bind(this, "totalPrice") }
                selectedHeader={ this.state.selectedHeader }
                direction={ this.state.sortDirection }
                width={10}
              />
              {(() => {
                if(this.state.budget) {
                  return (
                    <th>
                      <td style={ this.budgetTitleStyle }>{ `${this.state.budget.budgetName} Budget` }</td>
                    </th>
                  );
                }
              })()}
            </tr>
            </thead>
            <tbody>
            {(() => {
              if (this.state.budgetItems) {
                return this.state.budgetItems
                  .filter(this.searchFilter.bind(this))
                  .filter(this.tagFilter.bind(this))
                  .reduce((acc, budgetItem) => {
                    acc.push(
                      <BudgetRow
                        key={ `budgetRow${budgetItem.budgetItemId}` }
                        budgetItem={ budgetItem }
                        del={ this.deleteItem.bind(this, budgetItem) }
                        update={ this.setBudgetFocus.bind(this, budgetItem) }
                        addInvoiceItem={ this.addInvoiceItem.bind(this, budgetItem) }
                        removeInvoiceItem={ this.removeInvoiceItem.bind(this, budgetItem) }
                      />
                    );
                    if(budgetItem.tags && budgetItem.tags.length > 0) {
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
                    }
                    return acc;
                }, []);
              }
            })()}
            </tbody>
          </table>
        </div>
        <BudgetActions
          newItem={ this.unsetBudgetFocus.bind(this) }
          resetBudget={ this.resetBudget.bind(this) }
          generateBudget={ this.generateBudget.bind(this) }
          generateInvoice={ this.generateInvoice.bind(this) }
        />
        <SortModal
          tagGroups={ this.state.tagGroups }
          toggleFilter={ this.toggleTagFilter.bind(this) }
          tagsFiltered={ this.state.filters.tags }
        />
        <TagModal
          tagGroups={ this.state.tagGroups }
        />
        <BudgetItemModal
          tagGroups={ this.state.tagGroups }
          budgetId={ this.props.params.budgetId }
          budgetItem={ this.state.focusedItem }
          updateBudgetItem={ this.updateItem.bind(this) }
          addBudgetItem={ this.addItem.bind(this) }
          addTagMap={ this.addTagMap.bind(this) }
          delTagMap={ this.deleteTagMap.bind(this) }
        />
        <SubTotalRow
          budgetItems={ this.state.budgetItems }
        />
      </div>
    );
  }

}

export {Budget};
