// a single 'data' object that holds the data of your entire app, with initial values
var data = {
  center: [37.78, -122.41], // San Francisco
  premProviders: [],
  stdProviders: [],
  users: []
}

// a single 'handlers' object that holds all the actions of your entire app
var actions = {}

// the main render() function. call this function whenever the app's UI
// needs to to re-rendered
// 'data' and 'actions' are injected into the app
function render(){
  ReactDOM.render(
    <MyComponents.App
        data={data}
        actions={actions}/>,
    $('#app-container').get(0)
  )
}

//
// DATA
//

var firebaseRef = new Firebase('https://cookit.firebaseio.com/')

// Real-time Data (load constantly on changes)
firebaseRef.child('users')
  .on('value', function(snapshot){

    data.users = _.values(snapshot.val())

    render()

  })

// Real-time Data (load constantly on changes)
firebaseRef.child('providers/premium')
  .on('value', function(snapshot){

    data.premProviders = _.values(snapshot.val())

    render()

  })

firebaseRef.child('providers/standard')
  .on('value', function(snapshot){

    data.stdProviders = _.values(snapshot.val())

    render()

  })