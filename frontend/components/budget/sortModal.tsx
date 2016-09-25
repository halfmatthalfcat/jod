import {ISortModalProps, ISortModalState} from "./budget";
import {ITag} from "../../../common/models/models";
const update = require("react-addons-update");

class SortModal extends React.Component<ISortModalProps, {}> {

  constructor(props: ISortModalProps) {
    super(props);
  }

  public componentWillReceiveProps(props: ISortModalProps): void {
    if(props.tagGroups) {
      this.setState({ tags: props.tagGroups.reduce((acc, tagGroup) => {
          tagGroup.tags.forEach((tag) => { acc.push(tag); });
          return acc;
        }, [])
      });
    }
  }

  private tagSelected(tag: ITag): boolean {
    return this.props.tagsFiltered
      .map((t) => { return t.tagId; })
      .indexOf(tag.tagId) === -1;
  }

  public render() {
    return(
      <div id="sortModal" className="modal bottom-sheet">
        <div className="modal-content">
          <h4>Sorting Options</h4>
          <div className="row">
            <div className="col s4">
              <div className="card" style={{ height: "200px", padding: "10px" }}>
                {(() => {
                  if(this.props.tagGroups) {
                    return this.props.tagGroups.reduce((acc, tagGroup) => {
                      if(tagGroup.tags) {
                        tagGroup.tags.forEach((tag) => {
                          acc.push(
                            <div
                              className="chip"
                              style={{
                              backgroundColor: tag.tagColor,
                              opacity: this.tagSelected(tag) ? 1 : .5
                            }}
                              key={ `sortChip${tag.tagId}` }
                            >
                              <span style={{ color: tag.tagTextColor }}>{ tag.tagName }</span>
                              {(() => {
                                if(this.tagSelected(tag)) {
                                  return <i
                                    className="fa fa-check"
                                    style={{ color: tag.tagTextColor, marginLeft: "10px", cursor: "pointer" }}
                                    onClick={() => { this.props.toggleFilter(tag); }}
                                  />;
                                } else return <i
                                  className="fa fa-times"
                                  style={{ color: tag.tagTextColor, marginLeft: "10px", cursor: "pointer" }}
                                  onClick={() => { this.props.toggleFilter(tag); }}
                                />;
                              })()}
                            </div>
                          );
                        });
                      }
                      return acc;
                    }, []);
                  }
                })()}
              </div>
              <div style={{ height: "200px", padding: "10px" }}>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export {SortModal};