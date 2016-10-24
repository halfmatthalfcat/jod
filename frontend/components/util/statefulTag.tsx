import {IStatefulTagProps} from "./util";

class StatefulTag extends React.Component<IStatefulTagProps, {}> {

  constructor(props: IStatefulTagProps) {
    super(props);
  }

  public render() {
    return (
      <div
        className="chip"
        style={{
          backgroundColor: this.props.tag.tagColor,
          opacity: this.props.active ? 1 : .5,
          cursor: "pointer"
        }}
        key={ `tag${this.props.tag.tagId}` }
        onClick={() => {
          if(this.props.active) this.props.deactivated();
          else this.props.activated();
        }}
      >
        <span style={{ color: this.props.tag.tagTextColor }}>{ this.props.tag.tagName }</span>
        {(() => {
          if(this.props.active) {
            return <i
              className="fa fa-check"
              style={{ color: this.props.tag.tagTextColor, marginLeft: "10px" }}
            />;
          } else return <i
            className="fa fa-times"
            style={{ color: this.props.tag.tagTextColor, marginLeft: "10px" }}
          />;
        })()}
      </div>
    )
  }

}

export {StatefulTag};