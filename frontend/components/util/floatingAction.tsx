class FloatingAction extends React.Component<IFloatingActionProps, {}> {

  constructor(props: IFloatingActionProps) {
    super(props);
  }

  public render() {
    return (
      <div
        className="fixed-action-btn"
        style={{ bottom: "45px", right: "24px" }}
        onClick={() => {  this.props.clicked(); }}
      >
        <a className="btn-floating btn-large" style={{ backgroundColor: "#7094DE" }} >
          <i className="fa fa-plus fa-3x" />
        </a>
      </div>
    );
  }

}

export {FloatingAction};