import {ITagRowProps} from "./budget";
import "materialize-css";

class TagRow extends React.Component<ITagRowProps, {}> {

  private rand = Math.round(Math.random() * 100);

  constructor(props: ITagRowProps) {
    super(props);
    $(`#dropdown-button${this.rand}`).dropdown({
      belowOrigin: true,
      constrain_width: true
    });
  }

  public render() {
    return(
      <tr>
        <td colSpan="3" style={{ paddingBottom: 0 }}>
          {(() => {
            return this.props.tags.map((tag) => {
              return(
                <div className="chip" style={{ backgroundColor: tag.tagColor }}>
                  <span style={{ color: tag.tagTextColor }}>{ tag.tagName }</span>
                  <i className="close fa fa-times" style={{ color: tag.tagTextColor }} />
                </div>
              );
            });
          })()}
          <div className="chip">Add Tag</div>
        </td>
      </tr>
    );
  }

}

export {TagRow};