class EmptyCard extends React.Component<IEmptyCardProps, {}> {

  constructor(props: IEmptyCardProps) {
    super(props);
  }

  public render() {
    return (
      <div
        className="card-panel"
        onClick={ this.props.onClick() }
        style={{ cursor: "pointer" }}
      >
        {(() => {
          if(this.props.icon) {
            return <i className={ `fa fa-${ this.props.icon }` } />;
          }
        })()}
        <h4>{ this.props.message }</h4>
      </div>
    );
  }

}

export {EmptyCard};