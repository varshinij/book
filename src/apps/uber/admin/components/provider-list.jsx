class ProviderList extends React.Component {
  render(){
    var providerArr = []
    var evens = []
	var odds = []
    
    var providers = this.props.premProviders;
		for (var key in providers){	    
			providerArr.push(
          			<div className="card brown darken-3" key={providers[key].name}>
            			<div className="card-content white-text">
            	  			<span className="card-title">{providers[key].name}</span>
              				<p>
              					{providers[key].specialty}<br />
              					{providers[key].rating} Stars<br />
              				</p>
            			</div>
          			</div>)
		}
		for (var i=0;i<providerArr.length;i++){
    		if ((i+2)%2==0) {
        		evens.push(providerArr[i]);
    		}
    		else {
        		odds.push(providerArr[i]);
    		}
    	}
    	providerArr = [evens, odds]
	return (
	<div className="row">
		<div className="col s6">
			{providerArr[0]}
		</div>
		<div className="col s6">
			{providerArr[1]}
		</div>
	</div>
		);
  }
}
MyComponents.ProviderList = ProviderList