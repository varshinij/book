
const {Map, Marker, CircleMarker, Popup, TileLayer, MapLayer}  = window.ReactLeaflet



class MapView extends React.Component {
  
  render(){
    const providers = this.props.premProviders
    const stdproviders = this.props.stdProviders
    const providerElements = _.map(providers, function(p,i){
      var latlng = [p.lat, p.lon]
      var myIcon = L.icon({
        iconUrl: '../icons/standard.png',
        iconSize:  [32]
      })
      var myRating = p.rating + " stars"
      return <Marker icon={myIcon} position={latlng} key={i}>
        <Popup>
          <span>{(p.name)}<br />{(p.specialty)}<br />{(myRating)}<br />
		  </span>
        </Popup>
      </Marker>
    })
	const stdElements = _.map(stdproviders, function(p,i){
      var latlng = [p.lat, p.lon]
      var myIconURL = '../icons/' + p.specialty.toLowerCase() + '.png'
      var myIcon = L.icon({
        iconUrl: myIconURL,
        iconSize:  [32]
      })
      var myRating = p.rating + " stars"
      return <Marker position={latlng} icon={myIcon} key={i}>
        <Popup>
          <span>{(p.name)}<br />{(myRating)}<br />
		  </span>
        </Popup>
      </Marker>
    })

    let userElement
    if (this.props.user){
      var myIcon = L.icon({
        iconUrl: '../icons/user.png',
        iconSize:  [32]
      })
      userElement = <Marker icon={myIcon} position={this.props.user.pos}/>
    } else {
      userElement = ''
    }

    // Note: .bind(this) is important for the handler function's 'this'
    // pointer to refer to this MapView instance

    if (this.props.user) {
    return  <div className="container brown darken-3 white-text center">
    <h3>Set Your Location</h3><Map center={this.props.center}
          zoom={13}
          onLeafletClick={this.handleLeafletClick.bind(this)}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
        {providerElements}
		{stdElements}
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
