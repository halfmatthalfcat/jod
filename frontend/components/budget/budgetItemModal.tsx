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
    this.state = { budgetId: props.budgetId, tags: [], notes: "" };
  }

  public componentDidMount(): void {
    $("#budgetItemDatePicker").pickadate({
      format: "mm/dd/yyyy",
      onSet: (change) => {
        this.setState({ created: moment(change.select).format("YYYY-MM-DD HH:mm:ss") });
      }
    });
    Sortable.create(document.getElementById("availableTags"), {
      animation: 150,
      draggable: ".chip",
      group: "tags"
    });
    Sortable.create(document.getElementById("chosenTags"), {
      animation: 150,
      draggable: ".chip",
      group: "tags"
    });
  }

  public componentDidUpdate(): void {
    Sortable.create(document.getElementById("availableTags"), {
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
    Sortable.create(document.getElementById("chosenTags"), {
      animation: 150,
      draggable: ".chip",
      group: "tags",
      onAdd: (event: any) => {
        this.setState(update(this.state, {
          tags: {$push: [JSON.parse(event.item.id) as ITag]}
        }));
      }
    });
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

  public render() {
    return (
      <div
        id="budgetItemModal"
        className="modal modal-fixed-footer"
      >
        <div className="modal-content">
          <h4>New Budget Item</h4>
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
                    type="text"
                    pattern="^[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$"
                    className="validate"
                    onChange={(event) => {
                      if(($(event.target)[0] as HTMLInputElement).checkValidity()) {
                        this.setState({ totalPrice: parseFloat($(event.target).val().replace(/,/g,'')) })
                      }
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
                    onChange={(event) => [
                      this.setState({ notes: $(event.target).val() })
                    ]}
                  />
                  <label htmlFor="budgetItemTextArea">notes</label>
                </div>
              </div>
              <div className="row" id="tagOptions">
                <div className="col s6">
                  <span>Available Tags</span>
                  <div className="card" style={{ height: "200px" }}>
                    <div className="card-content list-group" id="availableTags" style={this.cardStyle}>
                      {(() => {
                        if(this.props.tagGroups){
                          return this.props.tagGroups.reduce((acc, tagGroup) => {
                            tagGroup.tags.forEach((tag) => {
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
                    <div className="card-content list-group" id="chosenTags" style={this.cardStyle}>
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
            onClick={() => { this.saveBudgetItem(); }}
          >
            Save
          </a>
        </div>
      </div>
    );
  }

}

export {BudgetItemModal};