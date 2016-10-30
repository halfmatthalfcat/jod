import {IImageCardProps} from "./gallery";

class ImageCard extends React.Component<IImageCardProps, {}> {

  constructor(props: IImageCardProps) {
    super(props);
  }

  public componentDidMount(): void {
    $(".materialboxed").materialbox();
  }

  public render() {
    return (
      <div className="card">
        <div className="card-image">
          <img onLoad={() => { this.props.reload() }} className="materialboxed" src={ this.props.imgUrl } />
        </div>
        {(() => {
          if (this.props.description) {
            return (
              <div className="card-content">
                <p>{ this.props.description }</p>
              </div>
            );
          }
        })()}
        {(() => {
          if (this.props.del && this.props.edit) {
            return (
              <div className="card-action">
                <a onClick={() => { this.props.del() }}>Delete</a>
                <a onChange={() => { this.props.edit() }}>Edit</a>
              </div>
            );
          }
        })()}
      </div>
    );
  }

}

export {ImageCard};