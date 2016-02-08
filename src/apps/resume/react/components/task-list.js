MyComponents.Task = React.createClass({

  render: function() {
    var thisNode = this;
    var taskElements = Object.keys(this.props.task).map(function(key,i){
      var item = thisNode.props.task[key];
      if (key != 'title' && key != 'completed' && item[key] != "") {
        return <MyComponents.TaskItem keyName={key} value={item} key={i}/>
      }
    });
    
    return (
      <li className="card-panel red lighten-1 z-depth-1">
        <div className="card-content">
          <span className="card-title"><b> {this.props.task.title} </b></span>
          {taskElements}
        </div>
      </li>
    );
  }

});

MyComponents.TaskItem = React.createClass({
  render: function() {
    return (<p><span className="white-text">{this.props.keyName} :</span> {this.props.value}</p> )
  }
})

MyComponents.TaskList = React.createClass({
  render: function() {
    var thisNode = this;
    var taskElements = Object.keys(this.props.tasks).map(function(key,i){
      var task = thisNode.props.tasks[key];
      if (('assigned' in task) && task['assigned'] == 'VarshiniJagannath') {
        return <MyComponents.Task task={thisNode.props.tasks[key]} key={i}/>
      }
    });

    return (
      <div className="row">
        
        <ul>

        {taskElements}

        </ul>
      </div>
    );
  }
});