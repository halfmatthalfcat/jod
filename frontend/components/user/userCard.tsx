import {IUserCardProps} from "./user";

class UserCard extends React.Component<IUserCardProps, {}> {

  constructor(props: IUserCardProps) {
    super(props);
  }

  public render() {
    return (
      <div className="card">
        <div className="card-content card-common">
          <span className="card-title">{ this.props.user.userInfo.lastName }, {this.props.user.userInfo.firstName}</span>
          <p>
            <div>
              <span>{ this.props.user.userInfo.address1 }</span><br />
              <span>{ this.props.user.userInfo.address2 }</span><br />
              <span>{ this.props.user.userInfo.city }, { this.props.user.userInfo.state } { this.props.user.userInfo.zipCode }</span>
            </div>
            <div>
              <span>{ this.props.user.userInfo.phone }</span>
            </div>
            <div>
              <span>{ this.props.user.user.email }</span>
            </div>
          </p>
        </div>
        <div className="card-action">
          <a href="#" onClick={() => { this.props.del(); }}>Delete</a>
          <a href="#" onClick={() => { this.props.edit(); }}>Edit</a>
          <a href={ `mailto:${ this.props.user.user.email }` }>Email</a>
        </div>
      </div>
    );
  }

}

export {UserCard};