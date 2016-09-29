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
const moment = require("moment-timezone");
const update = require("react-addons-update");

class Budget extends React.Component<IBudgetProps, IBudgetState> {

  public state: IBudgetState;

  constructor(props: IBudgetProps) {
    super(props);
    this.state = { filters: { tags: [] } };
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

  private resetBudget(): Promise<{}> {
    return new Promise((resolve, reject) => {
      BudgetApi.getBudgetItems(this.props.params.budgetId).then((budgetItems) => {
        Tag.getAllTagGroups().then((tagGroups) => {
          this.setState({
            budgetItems: this.applyTagFilter(budgetItems),
            tagGroups: tagGroups
          }, () => {
            resolve();
          });
        }, reject)
      }, reject);
    });
  }

  private applyTagFilter(budgetItems: Array<IBudgetItem>): Array<IBudgetItem> {
    if(this.state.filters.tags.length > 0) {
      return budgetItems.filter((budgetItem) => {
        const r = budgetItem.tags
          .map((t) => { return t.tagId; })
          .reduce((acc, tagId) => {
            if(this.state.filters.tags
                .map((tg) => { return tg.tagId; })
                .indexOf(tagId) === -1) return true;
            else return acc;
          }, false);
        console.log(r);
        return r;
      });
    } else return budgetItems;
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

  private addItem(budgetItem: IBudgetItem): void {
    BudgetItem.addBudgetItem(budgetItem).then(() => {
      console.log("In add item block");
      this.resetBudget().then(() => {
        $("#budgetItemModal").closeModal();
      }, (rejection) => { console.log(rejection); });
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

  private updateTagGroup(tagGroupId: number, tagId: number): void {
    Tag.updateTagToTagGroup(tagGroupId, tagId).then(() => {
      this.resetBudget();
    });
  }

  private deleteTagMap(budgetItem: IBudgetItem, tag: ITag): void {
    BudgetItem.removeTagFromBudgetItem(budgetItem.budgetItemId, tag.tagId).then(() => {
      this.resetBudget();
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
              {(() => {
                if(this.state.budget) {
                  return (
                    <td>{ this.state.budget.budgetName }</td>
                  );
                }
              })()}
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
        <SortModal
          tagGroups={ this.state.tagGroups }
          toggleFilter={ this.toggleTagFilter.bind(this) }
          tagsFiltered={ this.state.filters.tags }
        />
        <TagModal
          tagGroups={ this.state.tagGroups }
          updateTagGroup={ this.updateTagGroup.bind(this) }
        />
      </div>
    );
  }

}

export {Budget};
