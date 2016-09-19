/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import {IHomeProps, IHomeState} from "./pages";

class Home extends React.Component<IHomeProps, IHomeState> {

  public state: IHomeState;

  constructor(props: IHomeProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {

  }

  public render() {
    return (
      <div>
        Home
      </div>
    );
  }

}

export {Home};
