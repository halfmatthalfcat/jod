/// <reference path="./components.d.ts" />
/// <reference path="../../typings/index.d.ts" />

class Logout extends React.Component<{}, {}> {

  constructor() {
    super({});
  }

  public componentDidMount() {
    localStorage.removeItem("jod_jwt");
    window.location.href = "/";
  }

  public render() {
    return <div />;
  }

}

export {Logout};
