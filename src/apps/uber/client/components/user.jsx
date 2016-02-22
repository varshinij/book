class User extends React.Component {

  render(){

    if (this.props.user){
      // user is authenticated
      return(
      <div className ="green darken-2">
      <div className="card green darken-2">
      <div className="container">
          <h2 align="center">Welcome to <strong>COOK IT, </strong>{this.props.user.displayName}!</h2>
      </div>
      </div>
      </div>
    );
    } else {
      // user is not set
      return(
    <div className ="green darken-2">
    <div className="card green darken-2">
    <div className="container">
          <h1>You are not logged in yet.</h1>
          <h2>Login to see the map showing all the providers</h2>
          </div>
          </div>
    </div>

);
    }
  }

}
MyComponents.User = User
