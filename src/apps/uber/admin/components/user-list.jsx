MyComponents.User = React.createClass({
 render: function() {
   return (
   	<tr>
   		<td>{ this.props.user['username'] }</td>
   		<td>{ this.props.user['status'] }</td>
    </tr>
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
        <pre></pre>
        <table>
        <thead>
          <tr>
              <th data-field="uName">User Name</th>
              <th data-field="status">Status</th>
          </tr>
        </thead>
        <tbody>
          { users }
        </tbody>
      </table>
      </div>      
    </div>
  }
}
MyComponents.UserList = UserList
