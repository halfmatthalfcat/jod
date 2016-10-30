/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import {IHomeProps, IHomeState} from "./pages";
import {ImageApi} from "../util/api";
import {ImageCard} from "../components/gallery/imageCard";

class Home extends React.Component<IHomeProps, IHomeState> {

  public state: IHomeState;

  constructor(props: IHomeProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    ImageApi.getAll().then((images) => {
      this.setState({ images: images });
    });
  }

  private reloadMasonry(): void {
    $("#grid").masonry({
      itemSelector: ".col",
      columnWidth: ".col"
    }).masonry("reloadItems").masonry();
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
                    />
                  </div>
                );
              });
            }
          })()}
        </div>
      </div>
    );
  }

}

export {Home};
