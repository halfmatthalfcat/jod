import {IBudgetHeaderProps} from "./budget";


class BudgetHeader extends React.Component<IBudgetHeaderProps, {}> {

  private headerStyle = {
    marginLeft: "auto"
  };

  constructor(props: IBudgetHeaderProps) {
    super(props);
  }

  public render() {
    return (
      <th data-field={ this.props.name }>
        <div style={{ display: "flex", flexFlow: "row nowrap", alignItems: "center" }}>
          <span>{ this.props.name }</span>
          {(() => {
            if (this.props.name === this.props.selectedHeader) {
              switch(this.props.direction) {
                case "asc": return <i className="fa fa-sort-asc" style={ this.headerStyle } onClick={() => { this.props.headerClicked(); }}/>;
                case "desc": return <i className="fa fa-sort-desc" style={ this.headerStyle } onClick={() => { this.props.headerClicked(); }}/>;
                default: return <i className="fa fa-sort" style={ this.headerStyle } onClick={() => { this.props.headerClicked(); }}/>;
              }
            } else {
              return <i className="fa fa-sort" style={ this.headerStyle } onClick={() => { this.props.headerClicked(); }}/>;
            }
          })()}
        </div>
      </th>
    );
  }

}

export {BudgetHeader};