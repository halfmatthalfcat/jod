/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import {IBudgetProps, IBudgetState} from "./pages";

class Budget extends React.Component<IBudgetProps, IBudgetState> {

  public state: IBudgetState;

  constructor(props: IBudgetProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {

  }

  public render() {
    return (
      // Render nav before content
      <div>
        { this.props.children }
        Budget
      </div>
    );
  }

}

export {Budget};
