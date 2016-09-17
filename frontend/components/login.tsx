/// <reference path="./components.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';

class Login extends React.Component<ILoginProps, ILoginState> {

  public state: ILoginState;

  constructor(props: ILoginProps) {
    super(props);
    this.state = {}
  }

  public componentDidMount() {

  }

  public render() {
    return (
      React.DOM.div(null, "Login")
    );
  }

}

export {Login};
