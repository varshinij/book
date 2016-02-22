
const {Map, Marker, CircleMarker, Popup, TileLayer, MapLayer}  = window.ReactLeaflet

class MapView extends React.Component {
  render(){

    const providers = this.props.premProviders

    const providerElements = _.map(providers, function(p,i){
      var latlng = [p.lat, p.lon]
      console.log("Prem Providers: "+p.name)
      return <Marker position={latlng} key={i}>
        <Popup>
          <span>{(p.name)}<br />{(p.specialty)}<br />{(p.rating)}</span>
        </Popup>
      </Marker>
    })

    let userElement
    if (this.props.user){
      userElement = <CircleMarker center={this.props.user.pos}/>
    } else {
      userElement = ''
    }

    // Note: .bind(this) is important for the handler function's 'this'
    // pointer to refer to this MapView instance

    if (this.props.user) {
    return  <div className="container grey darken-3">
    <h2>Premium service providers:</h2><Map center={this.props.center}
          zoom={13}
          onLeafletClick={this.handleLeafletClick.bind(this)}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
        {providerElements}
        {userElement}
      </Map></div>
    }
    else {
      return <div></div>
    }
  }


  handleLeafletClick(event){
    console.log('leaflet click event', event)
    this.props.setUserLocationAction(event.latlng)
  }
}

MyComponents.MapView = MapView
