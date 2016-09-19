/// <reference path="./components.d.ts" />
/// <reference path="../../typings/index.d.ts" />

import {ILoginProps} from "./components";

class Login extends React.Component<ILoginProps, {}> {

  constructor(props: ILoginProps) {
    super(props);
  }

  public componentDidMount() {
    localStorage.setItem("jod_jwt", this.props.params.token);
    window.location.href = "/";
  }

  public render() {
    return <div />;
  }

}

export {Login};
