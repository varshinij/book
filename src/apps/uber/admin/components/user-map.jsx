const {Map, Marker, CircleMarker, Popup, TileLayer, MapLayer}  = window.ReactLeaflet

class UserMap extends React.Component {
  render(){
    console.log("This.user: "+this.props.users)

    var myIcon = L.icon({
        iconUrl: '../icons/user.png',
        iconSize:  [32]
      })

  const providers = this.props.users
    const providerElements = _.map(providers, function(p,i){
      return <Marker position={p.pos} icon={myIcon} key={i}>
        <Popup>
          <span>{(p.username)}</span>
        </Popup>
      </Marker>
    })

    let userElement
    if (this.props.user){
      userElement = <CircleMarker center={this.props.users.pos}/>
    } else {
      userElement = ''
    }

    // Note: .bind(this) is important for the handler function's 'this'
    // pointer to refer to this ProviderMap instance

    return  <div><center><h4><b>COOKIT USERS</b></h4></center><Map center={this.props.center}
          zoom={13}
          onLeafletClick={this.handleLeafletClick.bind(this)}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
        {providerElements}
        {userElement}
      </Map></div>
  }

  handleLeafletClick(event){
    console.log('leaflet click event', event)
    //this.props.setUserLocationAction(event.latlng)
  }
}

MyComponents.UserMap = UserMap