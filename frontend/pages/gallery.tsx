import {IGalleryProps, IGalleryState} from "./pages";
import {ImageModal} from "../components/gallery/imageModal";
import {IImage} from "../../common/models/models";
import {ImageApi} from "../util/api";
import {ImageCard} from "../components/gallery/imageCard";
const update = require("react-addons-update");

class Gallery extends React.Component<IGalleryProps, IGalleryState> {

  public state: IGalleryState;

  constructor(props: IGalleryProps) {
    super(props);
    this.state = {};
    this.newImage = this.newImage.bind(this);
  }

  public componentDidMount(): void {
    ImageApi.getAll().then((images) => {
      this.setState({ images: images })
    });
  }

  private newImage(image: IImage): void {
    ImageApi.addImage(image).then((newImage) => {
      this.setState(update(this.state, {
        images: {$push: [newImage]}
      }))
    })
  }

  public render() {
    return (
      <div>
        {(() => {
          if (this.state.images) {
            return this.state.images.map((image) => {
              console.log(image.s3Url);
              return(
                <ImageCard
                  key={ image.imageId }
                  imgUrl={ image.s3Url }
                  description={ image.description }
                />
              )
            })
          }
        })()}
        <div
          className="fixed-action-btn tooltipped"
          data-position="left"
          data-delay="50"
          data-tooltip="Add Image"
          onClick={() => {
            $("#imageModal").openModal({
              complete: () => {
                console.log("complete");
                this.setState({ focusedItem: null });
              }
            });
          }}
         >
          <a className="btn-floating btn-large" style={{ backgroundColor: "#7094DE" }} >
            <i className="fa fa-plus fa-3x" />
          </a>
        </div>
        <ImageModal
          image={ this.state.focusedItem }
          addImage={ this.newImage }
        />
      </div>
    );
  }

}

export {Gallery};