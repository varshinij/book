const {Map, Marker, CircleMarker, Popup, TileLayer, MapLayer}  = window.ReactLeaflet

class ProviderMap extends React.Component {
  render(){
    console.log("pmap:"+this.props.premProviders)
  const providers = this.props.premProviders
    const providerElements = _.map(providers, function(p,i){
      var latlng = [p.lat, p.lon]
      var myIconURL = '../icons/' + p.specialty.toLowerCase() + '.png'
      var myIcon = L.icon({
        iconUrl: myIconURL,
        iconSize:  [32]
      })
      var myRating = p.rating + " stars"
      return <Marker position={latlng} icon={myIcon} key={i}>
        <Popup>
          <span>{(p.name)}<br />{(p.specialty)}<br />{(myRating)}</span>
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

    return  <div><center><h4><b>PREMIUM COOKIT CHEFS</b></h4></center><Map className="map-div" center={this.props.center}
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

MyComponents.ProviderMap = ProviderMap

