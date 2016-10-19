import {ITagModalProps, ITagModalState} from "./budget";
import {Tag} from "../../util/api";
const update = require("react-addons-update");
import {chunk} from "../../util/helpers";
import "materialize-css";
import {ITagGroup} from "../../../common/models/models";

class TagModal extends React.Component<ITagModalProps, ITagModalState> {

  public state: ITagModalState;

  private cardStyle = {
    padding: "10px",
    height: "200px"
  };

  constructor(props: ITagModalProps) {
    super(props);
    this.state = {
      tagColor: "lightgrey",
      tagText: "New Tag",
      tagTextColor: "#000000",
      tagGroups: props.tagGroups || []
    };
  }

  public componentDidMount(): void {
    this.state.tagGroups.forEach((tagGroup) => {
      Sortable.create(document.getElementById(`cardModalTagGroup${tagGroup.tagGroupId}`), {
        animation: 150,
        draggable: ".chip",
        group: "tagGroup",
        onAdd: (event) => { this.updateTagGroup(tagGroup.tagGroupId, parseInt($(event.item).data("id"))); }
      })
    });
  }

  public componentDidUpdate(): void {
    this.state.tagGroups.forEach((tagGroup) => {
      Sortable.create(document.getElementById(`cardModalTagGroup${tagGroup.tagGroupId}`), {
        animation: 150,
        draggable: ".chip",
        group: "tagGroup",
        onAdd: (event) => { this.updateTagGroup(tagGroup.tagGroupId, parseInt($(event.item).data("id"))); }
      })
    });
  }

  public componentWillReceiveProps(newProps: ITagModalProps): void {
    this.setState(update(this.state, {
      tagGroups: {$apply: (tgs: Array<ITagGroup>) => {
        if (newProps.tagGroups) {
          return newProps.tagGroups.filter((tagGroup) => {
            return tgs
                .map((tagGroup) => { return tagGroup.tagGroupId; })
                .indexOf(tagGroup.tagGroupId) === -1
          }).concat(this.state.tagGroups)
        } else return this.state.tagGroups;
      }}
    }));
  }

  private addTagGroup(tagGroupName: string): void {
    Tag.addTagGroup({ tagGroupName: tagGroupName } as ITagGroup).then((tagGroup) => {
      this.setState(update(this.state, {
        tagGroups: {$push: [tagGroup]}
      }));
    })
  }

  private updateTagGroup(tagGroupId: number, tagId: number): void {
    Tag.updateTagToTagGroup(tagGroupId, tagId).then(() => {
      Tag.getAllTagGroups().then((tagGroups) => {
        this.setState({ tagGroups: tagGroups })
      })
    });
  }

  private addTag(): void {
    // 1 = unsorted
    Tag.addTag(1, {
      tagName: this.state.tagText,
      tagColor: this.state.tagColor,
      tagTextColor: this.state.tagTextColor
    }).then((tag) => {
      Tag.getAllTagGroups().then((tagGroups) => {
        this.setState({ tagGroups: tagGroups })
      })
    })
  }

  public render() {
    return (
      <div id="tagModal" className="modal modal-fixed-footer">
        <div className="modal-content">
          <div>
            <h4>New Tag</h4>
            <div
              className="row"
              style={{ marginBottom: 0 }}
            >
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s4">
                    <input
                      id="tagName"
                      type="text"
                      className="validate"
                      pattern=".+"
                      onChange={(event) => {
                        if(($(event.target)[0] as HTMLInputElement).checkValidity()) {
                          this.setState({ tagText: $(event.target).val() });
                        }
                      }}
                      />
                    <label htmlFor="tagName">tag name</label>
                  </div>
                  <div
                    className="col s4"
                    style={{ display: "flex", flexFlow: "row wrap" }}
                  >
                    <label htmlFor="tagColor" style={{ width: "100%", marginBottom: "20px" }}>tag color</label>
                    <input
                      id="tagColor"
                      type="color"
                      style={{ width: "100%" }}
                      onChange={(event) => {
                        this.setState({ tagColor: $(event.target).val() })
                      }}
                    />
                  </div>
                  <div
                    className="col s4"
                    style={{ display: "flex", flexFlow: "row wrap" }}
                  >
                    <label
                      htmlFor="tag"
                      style={{ width: "100%", marginBottom: "20px" }}
                    >
                      tag text color
                    </label>
                    <input
                      id="tagColorText"
                      type="color"
                      style={{ width: "100%" }}
                      onChange={(event) => {
                        this.setState({ tagTextColor: $(event.target).val() })
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="row">
              <div className="col s12">
                <div
                  className="card-panel"
                  id="newTagArea"
                >
                  <span className="card-title">New Tag Preview</span>
                  <div
                    className="chip"
                    style={{ backgroundColor: this.state.tagColor, marginLeft: "100px" }}
                  >
                    <span
                      style={{ color: this.state.tagTextColor }}
                    >
                      { this.state.tagText }
                    </span>
                  </div>
                  <a
                    className="wave-effect waves-light btn-flat"
                    style={{ float: "right" }}
                    onClick={() => { this.addTag(); }}
                  >
                    Create
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s4">
                <h4>Tag Groups</h4>
              </div>
              <div className="input-field col s6" style={{ marginTop: 0 }}>
                <input
                  id="newTagGroupName"
                  className="validate"
                  pattern=".+"
                  type="text"
                />
                <label htmlFor="newTagGroupName">new tag group</label>
              </div>
              <div className="col s2">
                <a
                  className="waves-effect waves-light btn-flat"
                  onClick={(event) => {
                    const tagGroupInput = $("#newTagGroupName");
                    if((tagGroupInput[0] as HTMLInputElement).checkValidity()) {
                      this.addTagGroup(tagGroupInput.val());
                    }
                  }}
                >
                  Create Tag Group
                </a>
              </div>
            </div>
            {(() => {
              return chunk(this.state.tagGroups, 4).map((tagGroups) => {
                return (
                  <div className="row">
                    {(() => {
                      return tagGroups.map((tagGroup) => {
                        return(
                          <div className="col s3">
                            <div
                              className="card"
                              style={ this.cardStyle }
                              id={ `cardModalTagGroup${tagGroup.tagGroupId}` }
                            >
                              <span
                                className="card-title"
                                style={{ marginBottom: "10px", flexBasis: "100%", fontSize: "16px" }}
                              >
                                { tagGroup.tagGroupName }
                              </span>
                              <hr />
                              {(() => {
                                if (tagGroup.tags) {
                                  return tagGroup.tags.map((tag) => {
                                    return (
                                      <div className="chip" style={{ backgroundColor: tag.tagColor }} data-id={ tag.tagId }>
                                        <span style={{ color: tag.tagTextColor }}>{ tag.tagName }</span>
                                        <i className="fa fa-times" style={{ color: tag.tagTextColor, marginLeft: "5px" }} />
                                      </div>
                                    );
                                  });
                                }
                              })()}
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                );
              });
            })()}
          </div>
        </div>
        <div className="modal-footer">
          <a className="modal-action modal-close waves-effect waves-light btn-flat">
            Close
          </a>
        </div>
      </div>
    );
  }

}

export {TagModal};