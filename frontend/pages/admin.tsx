/// <reference path="./pages.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';

class Admin extends React.Component<IAdminProps, IAdminState> {

  public state: IAdminState;

  constructor(props: IAdminProps) {
    super(props);
    this.state = {}
  }

  public componentDidMount() {

  }

  public render() {
    return (
      <div>
        Admin
        { this.props.children }
      </div>
    );
  }

}

export {Admin};
