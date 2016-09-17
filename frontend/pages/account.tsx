/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';

class Account extends React.Component<IAccountProps, IAccountState> {

  public state: IAccountState;

  constructor(props: IAccountProps) {
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
        Account { this.props.params.accountId }
      </div>
    );
  }

}

export {Account};
