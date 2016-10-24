import {ITagRowProps} from "./budget";
import "materialize-css";

class TagRow extends React.Component<ITagRowProps, {}> {

  private rand = Math.round(Math.random() * 100);

  constructor(props: ITagRowProps) {
    super(props);
  }

  public render() {
    return(
      <tr key={ `tagRow${this.rand}tr` } style={{ borderBottomColor: "#AB7345" }}>
        <td key={ `tagRow${this.rand}td` } colSpan="4" style={{ padding: 0 }}>
          <div key={ `tagRow${this.rand}div` } style={{ maxHeight: "32px", display: "flex", margin: "5px" }}>
            {(() => {
              return this.props.tags.map((tag) => {
                return(
                  <div
                    className="chip"
                    style={{ backgroundColor: tag.tagColor }}
                    key={ `tagRow${this.rand}tag${tag.tagId}tagContainer` }
                  >
                    <span
                      style={{ color: tag.tagTextColor }}
                      key={ `tagRow${this.rand}tag${tag.tagId}tagName` }
                    >
                      { tag.tagName }
                    </span>
                    <i
                      key={ `tagRow${this.rand}tag${tag.tagId}tagClose` }
                      className="fa fa-times"
                      style={{ color: tag.tagTextColor, marginLeft: "10px", cursor: "pointer" }}
                      onClick={() => { this.props.delTagMap(tag); }}
                    />
                  </div>
                );
              });
            })()}
          </div>
        </td>
      </tr>
    );
  }

}

export {TagRow};