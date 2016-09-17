/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';

class Accounts extends React.Component<IAccountsProps, IAccountsState> {

  public state: IAccountsState;

  constructor(props: IAccountsProps) {
    super(props);
    this.state = {}
  }

  public componentDidMount() {

  }

  public render() {
    return (
      // Render nav before content
      <div>
        { this.props.children }
        Accounts
      </div>
    );
  }

}

export {Accounts};
