import {IBudgetItemModalProps, IBudgetItemModalState} from "./budget";
import {ITag, IBudgetItem} from "../../../common/models/models";
import {StatefulTag} from "../util/statefulTag";
const update = require("react-addons-update");
const moment = require("moment-timezone");

class BudgetItemModal extends React.Component<IBudgetItemModalProps, IBudgetItemModalState> {

  public state: IBudgetItemModalState;

  constructor(props: IBudgetItemModalProps) {
    super(props);
    this.state = {
      budgetId: props.budgetId,
      description: "",
      created: new Date().toString(),
      totalPrice: 0.00,
      tags: [],
      notes: ""
    };
    this.clearState = this.clearState.bind(this);
    this.saveBudgetItem = this.saveBudgetItem.bind(this);
    this.clearDatePicker = this.clearDatePicker.bind(this);
    this.getAllTags = this.getAllTags.bind(this);
    this.getAppliedTags = this.getAppliedTags.bind(this);
    this.tagActive = this.tagActive.bind(this);
  }

  public componentDidMount(): void {
    $("#budgetItemDatePicker").pickadate({
      format: "mm/dd/yyyy",
      onSet: (change) => {
        this.setState({ created: moment(change.select).format("YYYY-MM-DD HH:mm:ss") });
      }
    });
    if (this.props.budgetItem) {
      const date = moment(this.props.budgetItem.created, "YYYY-MM-DD'T'HH:mm:ssSSSZ");
      $("#budgetItemDatePicker")
        .pickadate("picker")
        .set('select', [date.year(), date.month(), date.date()]);
    }
    Materialize.updateTextFields();
  }

  public componentDidUpdate(): void {
    Materialize.updateTextFields();
  }

  public componentWillReceiveProps(nextProps: IBudgetItemModalProps): void {
    if (nextProps.budgetItem) {
      this.setState({
        budgetItemId: nextProps.budgetItem.budgetItemId,
        description: nextProps.budgetItem.description,
        created: nextProps.budgetItem.created,
        totalPrice: nextProps.budgetItem.totalPrice,
        notes: nextProps.budgetItem.notes,
        invoiced: nextProps.budgetItem.invoiced ? moment(nextProps.budgetItem.invoiced).format("YYYY-MM-DD HH:mm:ss") : null,
        tags: nextProps.budgetItem.tags
      }, () => {
        const date = moment(nextProps.budgetItem.created, "YYYY-MM-DD'T'HH:mm:ssSSSZ");
        $("#budgetItemDatePicker")
          .pickadate("picker")
          .set('select', [date.year(), date.month(), date.date()]);
      });
    } else {
      this.setState({
        budgetItemId: null,
        budgetId: nextProps.budgetId,
        description: "",
        created: "",
        totalPrice: 0.00,
        tags: [],
        notes: ""
      }, () => {
        this.clearDatePicker();
      })
    }
  }

  private saveBudgetItem(): void {
    if(
      this.state.created &&
      this.state.description &&
      this.state.totalPrice
    ) {
      this.props.addBudgetItem(this.state as IBudgetItem);
    }
  }

  private clearDatePicker(): void {
    $("#budgetItemDatePicker")
      .pickadate("picker")
      .clear();
  }

  private tagActive(tag: ITag): boolean {
    return this.state.tags
      .map((tag) => { return tag.tagId; })
      .indexOf(tag.tagId) !== -1;
  }

  private getAllTags(): Array<ITag> {
    if(this.props.tagGroups) {
      return this.props.tagGroups.reduce((acc, tagGroup) => {
        return acc.concat(tagGroup.tags);
      }, [])
    } else return []
  }

  private getAppliedTags(): Array<ITag> {
    if (this.props.tagGroups) {
      return this.props.tagGroups.reduce((acc, tagGroup) => {
        return acc.concat(tagGroup.tags.filter(this.tagActive))
      }, [])
    } else return []
  }

  private addTag(tag: ITag): void {
    this.setState(update(this.state, {
      tags: {$push: [tag]}
    }), () => {
      if(this.state.budgetItemId) {
        this.props.addTagMap(this.state as IBudgetItem, tag);
      }
    });
  }

  private removeTag(tag: ITag): void {
    this.setState(update(this.state, {
      tags: {$set: this.state.tags.filter((t) => {
        return t.tagId !== tag.tagId;
      })}
    }), () => {
      if(this.state.budgetItemId) {
        this.props.delTagMap(this.state as IBudgetItem, tag);
      }
    });
  }

  private clearState(): void {
    this.setState({
      budgetId: this.props.budgetId,
      tags: [],
      description: "",
      created: "",
      notes: "",
      totalPrice: 0.00
    }, () => {
      this.clearDatePicker();
    })
  }

  public render() {
    return (
      <div
        id="budgetItemModal"
        className="modal modal-fixed-footer"
      >
        <div className="modal-content">
          <h4>{ this.props.budgetItem ? "Edit Budget Item" : "New Budget Item" }</h4>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s4">
                  <input
                    id="budgetItemDatePicker"
                    type="date"
                    className="datepicker"
                  />
                  <label htmlFor="budgetItemDatePicker">date</label>
                </div>
                <div className="input-field col s4">
                  <input
                    id="budgetItemDescription"
                    type="text"
                    className="validate"
                    pattern=".+"
                    value={ this.state.description }
                    onChange={(event) => {
                      if(($(event.target)[0] as HTMLInputElement).checkValidity()) {
                        this.setState({ description: $(event.target).val() });
                      }
                    }}
                  />
                  <label htmlFor="budgetItemDescription">description</label>
                </div>
                <div className="input-field col s4">
                  <input
                    id="budgetItemTotalPrice"
                    type="number"
                    step="0.01"
                    className="validate"
                    value={ this.state.totalPrice }
                    onChange={(event) => {
                      this.setState({ totalPrice: $(event.target).val() });
                    }}
                  />
                  <label htmlFor="budgetItemTotalPrice">total price</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="budgetItemTextArea"
                    className="materialize-textarea"
                    value={ this.state.notes }
                    onChange={(event) => {
                      this.setState({ notes: $(event.target).val() })
                    }}
                  />
                  <label htmlFor="budgetItemTextArea">notes</label>
                </div>
              </div>
              <div className="row" id="tagOptions">
                <div className="col s12">
                  <span>Tags</span>
                  <div className="card" style={{ height: "200px" }}>
                    <div className="card-content">
                      {(() => {
                        return this.getAllTags().map((tag) => {
                          return <StatefulTag
                            tag={tag}
                            active={this.tagActive(tag)}
                            activated={this.addTag.bind(this, tag)}
                            deactivated={this.removeTag.bind(this, tag)}
                          />
                        });
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <a className="modal-action modal-close wave-effect btn-flat">Cancel</a>
          <a
            className="modal-action wave-effect btn-flat"
            onClick={() => {
              if(this.props.budgetItem) {
                this.props.updateBudgetItem(this.state as IBudgetItem);
                this.clearState();
              }
              else {
               this.saveBudgetItem();
               this.clearState();
              }
            }}
          >
            Save
          </a>
        </div>
      </div>
    );
  }

}

export {BudgetItemModal};