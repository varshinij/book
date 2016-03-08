class NavBar extends React.Component {

  render(){
    //actions.logged set appropriately in the data.jsx file
    if(this.props.actions.logged==true) {
    return (
      <nav className="navbar-fixed-top">
        <div className="nav-wrapper blue-grey darken-4 ">
          <div className="container">
            <a href="../" className="brand-logo left">COOK IT</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="#" onClick={this.props.actions.logout}>Logout</a></li>
                <li className="active"><a href="#">User</a></li>
                <li><a href="../admin/">Admin</a></li>
              </ul>
              </div>
        </div>
      </nav>


    ); }

    else if(this.props.actions.loggedFB==true) {
    return (
      <nav className="navbar-fixed-top">
        <div className="nav-wrapper blue-grey darken-4 ">
          <div className="container">
            <a href="../" className="brand-logo left">COOK IT</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li className="active"><a href="#">User</a></li>
                <li><a href="../admin/">Admin</a></li>
                <li><a href="#" onClick={this.props.actions.logoutFB}>Logout</a></li>
              </ul>
              </div>
        </div>
      </nav>
    ); }

    else  {
      return (
      <nav className="navbar-fixed-top">
        <div className="nav-wrapper blue-grey darken-4 ">
        <div className="container">
        <a href="../" className="brand-logo left">COOK IT</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="#" onClick={this.props.actions.login}>Login via Github</a></li>
          <li><a href="#" onClick={this.props.actions.loginFB}>Login via Facebook</a></li>
          <li className="active"><a href="#">User</a></li>
          <li><a href="../admin/">Admin</a></li>
        </ul>
        </div>
        </div>
      </nav>

    );
    }
  }

}
MyComponents.NavBar = NavBar
