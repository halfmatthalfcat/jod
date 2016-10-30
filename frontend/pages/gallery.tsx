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
    this.reloadMasonry = this.reloadMasonry.bind(this);
  }

  public componentDidMount(): void {
    ImageApi.getAll().then((images) => {
      this.setState({ images: images })
    });
    $("#grid").masonry({
      itemSelector: ".col",
      columnWidth: ".col"
    }).masonry("reloadItems").masonry();
  }

  private reloadMasonry(): void {
    $("#grid").masonry({
      itemSelector: ".col",
      columnWidth: ".col"
    }).masonry("reloadItems").masonry();
  }

  private newImage(image: IImage): void {
    ImageApi.addImage(image).then((newImage) => {
      this.setState(update(this.state, {
        images: {$push: [newImage]}
      }))
    })
  }

  private editImage(image: IImage): void {
    ImageApi.editImage(image).then((newImage) => {
      this.setState({
        images: this.state.images.map((i) => {
          if (i.imageId === newImage.imageId) return newImage;
          else return i;
        })
      });
    });
  }

  private deleteImage(image: IImage): void {
    ImageApi.deleteImage(image.imageId).then(() => {
      this.setState({
        images: this.state.images.reduce((acc, i) => {
          if (i.imageId !== image.imageId) acc.push(i);
          return acc;
        }, [])
      })
    })
  }

  public render() {
    return (
      <div className="container">
        <div id="grid" className="row">
          {(() => {
            if (this.state.images) {
              return this.state.images.map((image) => {
                return (
                  <div className="col s6 m4 l3">
                    <ImageCard
                      key={ image.imageId }
                      imgUrl={ image.s3Url }
                      description={ image.description }
                      reload={ this.reloadMasonry }
                      edit={ this.editImage.bind(this, image) }
                      del={ this.deleteImage.bind(this, image) }
                    />
                  </div>
                );
              });
            }
          })()}
        </div>
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