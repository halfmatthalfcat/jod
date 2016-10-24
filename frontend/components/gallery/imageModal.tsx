import {IImageModalProps, IImageModalState} from "./gallery";
import {SyntheticEvent} from "react";
import {IImage} from "../../../common/models/models";

class ImageModal extends React.Component<IImageModalProps, IImageModalState> {

  public state: IImageModalState;

  constructor(props: IImageModalProps) {
    super(props);
    this.state = {
      imageId: null,
      key: "",
      s3Url: "",
      description: ""
    };
    this.clearState = this.clearState.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.addImage = this.addImage.bind(this);
  }

  public componentWillReceiveProps(nextProps: IImageModalProps): void {
    if (nextProps.image) {
      this.setState({
        imageId: nextProps.image.imageId,
        key: nextProps.image.key,
        s3Url: nextProps.image.s3Url,
        description: nextProps.image.description
      })
    } else {
      this.setState({
        imageId: null,
        key: "",
        s3Url: "",
        description: "",
        image: ""
      });
    }
  }

  private clearState(): void {
    this.setState({
      imageId: null,
      key: "",
      s3Url: "",
      description: ""
    });
  }

  private loadImage(event: SyntheticEvent): void {
    event.persist();
    const reader = new FileReader();
    const file = (event.target as HTMLInputElement).files[0];
    reader.onload = () => {
      if (file) {
        this.setState({
          image: reader.result
        });
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  private addImage(): void {
    if (this.state.key !== "" && this.state.image !== "") {
      this.props.addImage(this.state as IImage)
    }
  }

  public render() {
    return (
      <div id="imageModal" className="modal">
        <div className="modal-content">
          <h4>{ this.props.image ? "Edit Image" : "New Image" }</h4>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="imageKey"
                    className="validate"
                    value={ this.state.key }
                    type="text"
                    pattern=".+"
                    onChange={(event: Event) => {
                      if((event.target as HTMLInputElement).checkValidity()) {
                        this.setState({ key: $(event.target).val() })
                      }
                    }}
                  />
                  <label htmlFor="imageKey">Key</label>
                </div>
                <div className="input-field col s6">
                  <input
                    id="imageDescription"
                    className="validate"
                    value={ this.state.description }
                    type="text"
                    pattern=".*"
                    onChange={(event: Event) => {
                      if((event.target as HTMLInputElement).checkValidity()) {
                        this.setState({ description: $(event.target).val() })
                      }
                    }}
                  />
                  <label htmlFor="imageDescription">Description</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,image/jpeg"
                    onChange={this.loadImage}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <div className="card">
                    <div className="card-image">
                      <img src={ this.state.image } />
                    </div>
                    {(() => {
                      if (this.state.description && this.state.description !== "") {
                        return (
                          <div className="card-content">
                            <p>{ this.state.description }</p>
                          </div>
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <a
            className="modal-action waves-effect waves-light btn-flat"
            onClick={() => { this.addImage() }}
          >Create</a>
          <a className="modal-action modal-close waves-effect waves-light btn-flat">Close</a>
        </div>
      </div>
    );
  }

}

export {ImageModal};