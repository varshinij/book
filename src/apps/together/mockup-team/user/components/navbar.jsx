class NavBar extends React.Component {

  render(){
    //actions.logged set appropriately in the data.jsx file
    if(this.props.actions.logged==true) {
    return (
      <div>
      <nav className="navbar-fixed-top">
        <div className="nav-wrapper blue-grey darken-4 ">
          <div className="container">
            <a href="../" className="brand-logo left">critique together</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="#" onClick={this.props.actions.logout}>Logout</a></li>
                
              </ul>
              </div>
        </div>
        </nav>
        <a className="btn" onClick={this.props.actions.addbook}>Add a New Book</a>
        <a className="btn" href="#"onClick={this.props.actions.joinbook}>Join a Book Room</a>
        <a className="btn" href="#"onClick={this.props.actions.leavebook}>Leave Book Room</a>

      </div>

      


    ); }

    else  {
      return (
      <nav className="navbar-fixed-top">
        <div className="nav-wrapper blue-grey darken-4 ">
        <div className="container">
        <a href="../" className="brand-logo left">critique together</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="#" onClick={this.props.actions.login} >Login via Github</a></li>
        </ul>
        </div>
        </div>
      </nav>
      

    );
    }
  }

}
MyComponents.NavBar = NavBar
