class User extends React.Component {

  render(){

    if (this.props.user){
      // user is authenticated
      return(
      
      <div className="container center">
        <h2>Welcome to <strong>COOK IT, </strong>{this.props.user.displayName}!</h2>
      </div>
    );
    } else {
      // user is not set
      return(
      <div className="container">
        <h1>You are not logged in yet.</h1>
        <div className="row">
          <div className="col s3">
            <a className="waves-effect waves-light btn-large brown darken-3" onClick={this.props.actions.login}>GitHub Login</a>
          </div>
          <div className="col s3">
            <a className="waves-effect waves-light btn-large brown darken-3" onClick={this.props.actions.loginFB}>Facebook Login</a>
          </div>
        </div>
    </div>

);
    }
  }
}
MyComponents.User = User
