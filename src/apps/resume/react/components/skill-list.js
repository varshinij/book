MyComponents.Skill = React.createClass({

  render: function() {
    return (
      <div className="col s6">
        <div className="card-panel red lighten-1 z-depth-1">
          <div className="card-content">
            {this.props.skill}
          </div>
        </div>
      </div>
    );
  }

});

MyComponents.SkillList = React.createClass({
  render: function() {

    var skillElements = this.props.skills.map(function(s,i){
      return <MyComponents.Skill skill={s} key={i}/>
    })

    return (
      <div>
        <div>
      


        {skillElements}
        

        </div>
      </div>
    );
  }
});
