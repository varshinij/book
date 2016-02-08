MyComponents.About = React.createClass({

  render: function() {
    return (
      
     <div className="col s12 m8 offset-m2 l6 offset-l3">
     
        <div className="card-panel red lighten-2 z-depth-1">
        
          <div className="row valign-wrapper">
            <div className="col s2">
              <img src="images/varshini.png" alt="" className="circle responsive-img"  width="300" height="300"/>  
            </div>
            <div className="col s10">
              
                <b>Varshini Jagannath </b>
                <br/>
                <p> <b>Current : </b> MS in Computer Science, <i> University of Colorado at Boulder </i> </p>
                
                <p> <b> Past : </b> Bachelor of Engineering in Information Science, <i> MS Ramaiah Institute of Technology </i> </p>
                <p> <a href="https://github.com/varshinij"><img src="images/git.png" height="50" width="50"></img> </a></p>
              
            
          </div>
        </div>
      </div>
      </div>
    );
  }

});
