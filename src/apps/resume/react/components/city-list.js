MyComponents.City = React.createClass({

  render: function() {
    console.log(this.props.city);
    var city = this.props.city;
    var imageName = "images/" + this.props.name + ".jpg";
    var cityName = this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);
    return (

          
        <div className="col s12">
        <div className="card large red lighten-1">
          <div className="card-image">
            <img src={imageName} />
            <span className="card-title" >{cityName}</span>
          </div>
          <div className="card-content red lighten-1">
            
            <p>Temperature: {city.currently.temperature} &#8457;</p>
            <p>Humidity: {city.currently.humidity} mph</p>
            <p>Precipitation: {city.currently.precipIntensity} in./hr </p>
            <p>Visibility: {city.currently.visibility} miles</p>
            <p><span className="white-text"><b>Summary: {city.daily.summary}</b></span></p>
          </div>
          
          </div>
        </div>
      
       
    );
  }

});

MyComponents.CityList = React.createClass({
  render: function() {
    console.log(this.props.cities);
    var thisNode = this;
    var cityElements = Object.keys(this.props.cities).map(function(key,i){
      if (thisNode.props.names.indexOf(key) !== -1) {
        console.log(key);
        return (
          <MyComponents.City city={thisNode.props.cities[key]} name={key} key={i}/>
        )
      }
    });

    return (
      <div id="cities" className="row">
        
        {cityElements}
      </div>
    );
  }
});