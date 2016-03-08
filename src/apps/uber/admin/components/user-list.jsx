MyComponents.User = React.createClass({
 render: function() {
   if ( typeof this.props.user['username'] == "undefined") {
      var dispayName =  this.props.user['displayName']
    }
    else {
      var dispayName =  this.props.user['username']
    }
   return (
   	<li>
   		<div className="collapsible-header">{ dispayName }</div>
   		<div className="collapsible-body"><p>{ this.props.user['status'] }</p></div>
    </li>
   );
 }
});


class UserList extends React.Component {
  render(){
  	var users = this.props.users.map(function(u,i){
      return <MyComponents.User user={u} key={i}/>
    })

    return <div>
      <div>
        <ul className="collapsible" data-collapsible="expandable">
          { users }
        </ul>
      </div>      
    </div>
  }
  componentDidMount(){
    $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false
    });
   });
  }
}
MyComponents.UserList = UserList