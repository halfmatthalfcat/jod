import {IBudgetItemModalProps, IBudgetItemModalState} from "./budget";
import {ITag, IBudgetItem} from "../../../common/models/models";
const Sortable = require("sortablejs");
const update = require("react-addons-update");
const moment = require("moment-timezone");

class BudgetItemModal extends React.Component<IBudgetItemModalProps, IBudgetItemModalState> {

  public state: IBudgetItemModalState;

  private cardStyle = {
    display: "flex",
    flexFlow: "row wrap",
    padding: "10px",
    height: "100%"
  };

  private cardHeader = {
    flexBasis: "100%",
    marginBottom: "10px",
    height: "50px"
  };

  constructor(props: IBudgetItemModalProps) {
    super(props);
    if (props.budgetItem) {
      this.state = {
        budgetItemId: props.budgetItem.budgetItemId,
        budgetId: props.budgetId,
        description: props.budgetItem.description,
        created: props.budgetItem.created,
        totalPrice: props.budgetItem.totalPrice,
        notes: props.budgetItem.notes,
        invoiced: props.budgetItem.invoiced ? moment(props.budgetItem.invoiced).format("YYYY-MM-DD HH:mm:ss") : null,
        tags: props.budgetItem.tags
      }
    } else {
      this.state = { budgetId: props.budgetId, tags: [], notes: "", totalPrice: 0.00 };
    }
    this.clearState = this.clearState.bind(this);
    this.saveBudgetItem = this.saveBudgetItem.bind(this);
    this.clearDatePicker = this.clearDatePicker.bind(this);
  }

  public componentDidMount(): void {
    const input = $(this.state.budgetItemId ? `#budgetItemDatePicker${this.state.budgetItemId}` : "#budgetItemDatePicker").pickadate({
      format: "mm/dd/yyyy",
      onSet: (change) => {
        this.setState({ created: moment(change.select).format("YYYY-MM-DD HH:mm:ss") });
      }
    });
    if (this.props.budgetItem) {
      const date = moment(this.props.budgetItem.created, "YYYY-MM-DD'T'HH:mm:ssSSSZ");
      const picker = input.pickadate("picker");
      picker.set('select', [date.year(), date.month(), date.date()]);
    }
    Sortable.create(document.getElementById(this.state.budgetItemId ? `availableTags${this.state.budgetItemId}` : "availableTags"), {
      animation: 150,
      draggable: ".chip",
      group: "tags"
    });
    Sortable.create(document.getElementById(this.state.budgetItemId ? `chosenTags${this.state.budgetItemId}` : "chosenTags"), {
      animation: 150,
      draggable: ".chip",
      group: "tags"
    });
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
        invoiced: nextProps.budgetItem.invoiced ? nextProps.budgetItem.invoiced : null,
        tags: nextProps.budgetItem.tags
      }, () => {
        const input = $(this.state.budgetItemId ? `#budgetItemDatePicker${this.state.budgetItemId}` : "#budgetItemDatePicker").pickadate({
          format: "mm/dd/yyyy",
          onSet: (change) => {
            this.setState({ created: moment(change.select).format("YYYY-MM-DD HH:mm:ss") });
          }
        });
        if (this.props.budgetItem) {
          const date = moment(this.props.budgetItem.created, "YYYY-MM-DD'T'HH:mm:ssSSSZ");
          const picker = input.pickadate("picker");
          picker.set('select', [date.year(), date.month(), date.date()]);
        }
      });
    } else {
      this.state = { budgetId: nextProps.budgetId, tags: [], notes: "" };
    }
    Sortable.create(document.getElementById(this.state.budgetItemId ? `availableTags${this.state.budgetItemId}` : "availableTags"), {
      animation: 150,
      draggable: ".chip",
      group: "tags",
      onAdd: (event: any) => {
        this.setState({
          tags: this.state.tags.filter((t) =>
            t.tagId !== (JSON.parse(event.item.id) as ITag).tagId
          )
        })
      }
    });
    Sortable.create(document.getElementById(this.state.budgetItemId ? `chosenTags${this.state.budgetItemId}` : "chosenTags"), {
      animation: 150,
      draggable: ".chip",
      group: "tags",
      onAdd: (event: any) => {
        this.setState(update(this.state, {
          tags: {$push: [JSON.parse(event.item.id) as ITag]}
        }));
      }
    });
    Materialize.updateTextFields();
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
    $(this.state.budgetItemId ? `#budgetItemDatePicker${this.state.budgetItemId}` : "#budgetItemDatePicker")
      .pickadate("picker")
      .clear();
  }

  private tagFilter(tag: ITag): boolean {
    return this.state.tags
      .map((tag) => { return tag.tagId; })
      .indexOf(tag.tagId) === -1;
  }

  private clearState(func: () => void): void {
    // TODO: This is ugly af
    func();
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
        id={ this.state.budgetItemId ? `budgetItemModal${this.state.budgetItemId}` : "budgetItemModal"}
        className="modal modal-fixed-footer"
      >
        <div className="modal-content">
          <h4>{ this.props.budgetItem ? "Edit Budget Item" : "New Budget Item" }</h4>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s4">
                  <input
                    id={ this.state.budgetItemId ? `budgetItemDatePicker${this.state.budgetItemId}` : "budgetItemDatePicker"}
                    type="date"
                    className="datepicker"
                  />
                  <label htmlFor={ this.state.budgetItemId ? `budgetItemDatePicker${this.state.budgetItemId}` : "budgetItemDatePicker"}>date</label>
                </div>
                <div className="input-field col s4">
                  <input
                    id={ this.state.budgetItemId ? `budgetItemDescription${this.state.budgetItemId}` : "budgetItemDescription"}
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
                  <label htmlFor={ this.state.budgetItemId ? `budgetItemDescription${this.state.budgetItemId}` : "budgetItemDescription"}>description</label>
                </div>
                <div className="input-field col s4">
                  <input
                    id={ this.state.budgetItemId ? `budgetItemTotalPrice${this.state.budgetItemId}` : "budgetItemTotalPrice"}
                    type="number"
                    step="0.01"
                    className="validate"
                    value={ this.state.totalPrice }
                    onChange={(event) => {
                      this.setState({ totalPrice: $(event.target).val() });
                    }}
                  />
                  <label htmlFor={ this.state.budgetItemId ? `budgetItemTotalPrice${this.state.budgetItemId}` : "budgetItemTotalPrice"}>total price</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id={ this.state.budgetItemId ? `budgetItemTextArea${this.state.budgetItemId}` : "budgetItemTextArea"}
                    className="materialize-textarea"
                    value={ this.state.notes }
                    onChange={(event) => {
                      this.setState({ notes: $(event.target).val() })
                    }}
                  />
                  <label htmlFor={ this.state.budgetItemId ? `budgetItemTextArea${this.state.budgetItemId}` : "budgetItemTextArea"}>notes</label>
                </div>
              </div>
              <div className="row" id={ this.state.budgetItemId ? `tagOptions${this.state.budgetItemId}` : "tagOptions"}>
                <div className="col s6">
                  <span>Available Tags</span>
                  <div className="card" style={{ height: "200px" }}>
                    <div className="card-content list-group" id={ this.state.budgetItemId ? `availableTags${this.state.budgetItemId}` : "availableTags"} style={this.cardStyle}>
                      {(() => {
                        if(this.props.tagGroups){
                          return this.props.tagGroups.reduce((acc, tagGroup) => {
                            tagGroup.tags
                              .filter(this.tagFilter.bind(this))
                              .forEach((tag) => {
                                acc.push(
                                  <div
                                    className="chip list-group-item"
                                    style={{ backgroundColor: tag.tagColor }}
                                    key={ `tag${tag.tagId}` }
                                    id={ JSON.stringify(tag) }
                                  >
                                    <span
                                      style={{ color: tag.tagTextColor }}
                                    >
                                      { tag.tagName }
                                    </span>
                                  </div>
                                );
                            });
                            return acc;
                          }, [])
                        }
                      })()}
                    </div>
                  </div>
                </div>
                <div className="col s6">
                  <span>Chosen Tags</span>
                  <div className="card" style={{ height: "200px" }}>
                    <div className="card-content list-group" id={ this.state.budgetItemId ? `chosenTags${this.state.budgetItemId}` : "chosenTags"} style={this.cardStyle}>
                      {(() => {
                        if (this.state.tags.length > 0) {
                          return this.state.tags.map((tag) => {
                            return(
                              <div
                                className="chip list-group-item"
                                style={{ backgroundColor: tag.tagColor }}
                                key={ `tag${tag.tagId}` }
                                id={ JSON.stringify(tag) }
                              >
                                <span
                                  style={{ color: tag.tagTextColor }}
                                >
                                  { tag.tagName }
                                </span>
                              </div>
                            );
                          });
                        }
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
              if(this.props.budgetItem) this.clearState(this.props.updateBudgetItem.bind(this.state as IBudgetItem));
              else this.clearState(this.saveBudgetItem);
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