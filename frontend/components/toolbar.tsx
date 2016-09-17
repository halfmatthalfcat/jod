/// <reference path="./components.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';

class Toolbar extends React.Component<IToolbarProps, IToolbarState> {

  public state: IToolbarState;

  private style: any = {
    display: 'flex',
    flexFlow: 'column nowrap'

  };

  constructor(props: IToolbarProps) {
    super(props);
    this.state = {}
  }

  public componentDidMount() {

  }

  public render() {
    return (
      <div style={ this.style }>
        Toolbar
        { this.props.children }
      </div>
    );
  }

}

export {Toolbar};
