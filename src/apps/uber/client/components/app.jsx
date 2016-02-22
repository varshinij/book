class App extends React.Component {
  render(){
    return <div>

      <MyComponents.NavBar actions={this.props.actions}/>
        <MyComponents.User
            user={this.props.data.user}
            loginAction={this.props.actions.login}
            logoutAction={this.props.actions.logout}/>

        <div className="container">

        <div className="card green darken-2">
        <MyComponents.MapView
            premProviders={this.props.data.premProviders}
            center={this.props.data.center}
            user={this.props.data.user}
            setUserLocationAction={this.props.actions.setUserLocation}/>
          </div>

  <div className="card green darken-2">

      <MyComponents.StdMapView
            stdProviders={this.props.data.stdProviders}
            center={this.props.data.center}
            user={this.props.data.user}
            setUserLocationAction={this.props.actions.setUserLocation}/>

          </div>

    </div>




  </div>






  }
}

MyComponents.App = App
