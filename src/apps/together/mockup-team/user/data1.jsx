// a single 'data' object that holds the data of your entire app, with initial values
var data11 = {
  books: [],
  user: null
}

// a single 'handlers' object that holds all the actions of your entire app
var actions1 = {}

// the main render() function. call this function whenever the app's UI
// needs to to re-rendered
// 'data' and 'actions' are injected into the app
function render(){
ReactDOM.render(
    <MyComponents.tabs
        data={data}
        actions={actions}/>,
    $('#tabs').get(0)

  )
}

//
// DATA
//

var firebaseRef = new Firebase('https://critiquetogether.firebaseio.com/')

// Real-time Data (load constantly on changes)
firebaseRef.child('books')
  .on('value', function(snapshot){

    data.b = _.values(snapshot.val())

    
    render()

  })

//
// ACTIONS
//

// Actions
actions.login = function(){

  firebaseRef.authWithOAuthPopup("github", function(error, authData){

    // handle the result of the authentication
    if (error) {
      console.log("Login Failed!", error);
      actions.logged = false
    } else {
      actions.logged = true
      //console.log("Authenticated successfully with payload:", authData);
      var username1=authData.github.username
      firebaseRef.child('users').child(username1).once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      userExistsCallback(username1, exists);
      });

    function userExistsCallback(userId, exists) {
  if (exists) {
    console.log("in the if loop!");
         // create a user object based on authData
      var user = {
        displayName: authData.github.displayName,
        username: authData.github.username,
        id: authData.github.id,
        status: 'online',// position, default to the map center
        bookList:[]
      }

      var userBooks = []

      var userRef = firebaseRef.child('users').child(user.username)
      
      userRef.on('value', function(snapshot){
        data.user = snapshot.val()
        render()
      })

      userRef.on('value',function(snapshot){
        console.log("User books:")
        //console.log(snapshot.child('bookList').val())
        userBooks.push(snapshot.child('bookList').val())
        console.log(userBooks)

        
        var bookRef = firebaseRef.child('books')
        bookRef.on('value',function(snapshot1){
          var bookname=Object.keys(snapshot1.val())
          console.log(bookname);
          data.books = []
          for(var i in snapshot.child('bookList').val())
          {
            for(var j in bookname){
              if (snapshot.child('bookList').val()[i] == bookname[j]){
                var newBookRef = bookRef.child(bookname[j])
                newBookRef.on('value', function(s){
                  console.log("Mactheing book:")
                  console.log(s.val())
                  console.log(data.books)
                  data.books.push(s.val())
                  render()
                })
              }
            }
          }
        })
      })

      //setTimeout(console.log("Data books"),1000)
      //setTimeout(console.log(data.books),1000)

      //setInterval(console.log(userBooks),3000);
      //var bookRef = firebaseRef.child('books')
      /*bookRef.on('value',function(snapshot){
        var bookname=Object.keys(snapshot.val())
        console.log(bookname);
        for(var i in user.bookList)
        {
          forif(bookname)
        }
      })*/
      
      // subscribe to the user data
        

      // set the user data
      //userRef.set(user)



  } else {
    
    // create a user object based on authData
      var user = {
        displayName: authData.github.displayName,
        username: authData.github.username,
        id: authData.github.id,
        status: 'online',// position, default to the map center
        bookList: null
      }

      var userRef = firebaseRef.child('users').child(user.username)
      //console.log(userRef);
      // subscribe to the user data
        userRef.on('value', function(snapshot){
        data.user = snapshot.val()
        render()
      })

      // set the user data
      userRef.set(user)
  }
}

    }
  })
}

actions.logout = function(){

  if (data.user){

    actions.logged = false
    firebaseRef.unauth()

    var userRef = firebaseRef
      .child('users')
      .child(data.user.username)

    // unsubscribe to the user data
    userRef.off()

    // set the user's status to offline
    userRef.child('status').set('offline')

    data.user = null

    render()

  }

}
