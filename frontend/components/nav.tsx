/// <reference path="./components.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import {INavProps, INavState} from "./components";

class Nav extends React.Component<INavProps, INavState> {

  public state: INavState;

  constructor(props: INavProps) {
    super(props);
    this.state = {}
  }

  public componentDidMount() {

  }

  public render() {
    return (
      React.DOM.div(null, "Nav")
    );
  }

}

export {Nav};
