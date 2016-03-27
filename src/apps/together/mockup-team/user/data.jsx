// a single 'data' object that holds the data of your entire app, with initial values
var data = {
  books: [],
  user: null,
  messages:[]
}

var tabs = {}

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
      //console.log("Login Failed!", error);
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

    
    //console.log("in the if loop!");
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
      $('#main').empty();
      $('#buttons1').append('<div class="row"><div class="col s12"><div class="fixed-action-btn horizontal click-to-toggle" style="float:top; position:relative; margin-top:100px;"><a class="btn-floating btn-large red"><i class="large mdi-navigation-menu"></i></a><ul><li><a class="btn-floating red modal-trigger" href="#modal1"><i class="material-icons">playlist_add</i></a></li><li><a class="btn-floating yellow darken-1 modal-trigger" href="#modal2"><i class="material-icons">perm_identity</i></a></li><li><a class="btn-floating deep-orange lighten-2 modal-trigger" href="#modal3"><i class="material-icons">search</i></a></li></ul></div></div></div>');
      $('#tabs').append('<div class="row"><div class="col s12"><div class="col s4" id="book"></div><div class="col s6 offset-s1" id="message"></div></div>');

      userRef.on('value',function(snapshot){
        //console.log("User books:")
        //console.log(snapshot.child('bookList').val())
        userBooks.push(snapshot.child('bookList').val())
        console.log("user book"+ userBooks)

        
        var bookRef = firebaseRef.child('books')
        bookRef.on('value',function(snapshot1){
          var bookname=Object.keys(snapshot1.val())
          //console.log(bookname);
          data.books = []
          for(var i in snapshot.child('bookList').val())
          {
            for(var j in bookname){
              if (snapshot.child('bookList').val()[i] == bookname[j]){
                var newBookRef = bookRef.child(bookname[j])
                newBookRef.on('value', function(s){
                  data.books.push(s.val())
 $('#book').append('<ul class="collection"><div class="card cyan darken-1"><div class="card-content"><li class="collection-item><span class="title white-text">' + bookname[j] + '</span></li></div></div></ul>' );
         
                  //render()
                })
              }
            }
          }
        })
      })

           
      var root = new Firebase('https://critiquetogether.firebaseio.com/');
      var emailRef = root.child('messages/Dead');
      //console.log("emailref: " + emailRef);
      emailRef.on('value', function(snapshot){
          
          var emails = snapshot.val();
          
          for (var key in emails) {
            var email = emails[key];
            
            
            $('#message').append('<ul class="collection"><li>' + email['message'] + '</li></ul>');
          }
        });

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
    $('#book').empty();
    $('#message').empty();
    $('#tabs').empty();
    $('#addBook').empty();
    $('#joinBook').empty();
    $('#profile').empty();
    render()

  }

}


actions.addbook = function(){
 var user= data.user.displayName
 var usern= data.user.username
 
 $('#book').empty();
    $('#message').empty();
    $('#tabs').empty();
    $('#addBook').empty();
    $('#joinBook').empty();
    $('#profile').empty();
 $('#addBook').append('<div class="container"><div><h3>Add a Book<h3></div><form><div class="input-field col s6" align="center"><input id="name" type="text" class="validate"><label>Name of the Book</label></div><div class="input-field col s6" align="center"><input id="author" type="text" class="validate"><label>Author of the Book</label><div class="input-field col s6" align="center"><input id="description" type="text" class="validate"><label>Description</label><div class="input-field col s6" align="center"><input id="genre" type="text" class="validate"><label>Genre</label><div class="input-field col s6" align="center"><label for="disabled">Added by: '+user+'</label></form></div><a class="waves-effect waves-light orange btn white-text" id="add">Add the Book<i class="material-icons right">send</i></a>');
 
      var root = new Firebase('https://critiquetogether.firebaseio.com/');
      var booksRef = root.child('books');

      $('#add').click(function()
      {
        
        //console.log(booksRef);
      var name= $('#name').val();
      
      var author= $('#author').val();
      var description= $('#description').val();
      var genre= $('#genre').val();
      var addedMember= data.user.username

      var booksstruct = {
      name: name,
      author: author,
      description: description,
      genre: genre,
      //addedMember: addedMembers[Math.floor(Math.random() * addedMembers.length)]
                        }

      var bookName=$('#name').val();
      root.child('books').child(bookName).once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      bookExistsCallback(bookName, exists);
      });
      function bookExistsCallback(userId, exists) {
  if (exists) 
  {
    alert("This book already exists!");
  }

  else
  {
     var bookRef = booksRef.child(booksstruct.name);
     bookRef.push(booksstruct);
     var newbook=name
            //actions.login();
            var user = {
        displayName: data.user.displayName,
        username: data.user.username,
        id: data.user.id,
        status: 'online',// position, default to the map center
        bookList:[]
      }

      var userBooks = []
      userBooks.push(newbook)
      var userRef = firebaseRef.child('users').child(user.username)
      userRef.child('bookList').on('value', function(snapshot){
        var bookList1 = snapshot.val()
       // console.log("booklist"+bookList1)
        for (var key in bookList1)
        {
            var pushbook=bookList1[key]
            userBooks.push(pushbook);
            
            //console.log("pushbook"+pushbook)
        }
        console.log("userbooks" + userBooks)
          

        render()
      })
     
      userRef.child('bookList').set(userBooks);
      //onsole.log("before" + userRef);

      
      //console.log("after"+userRef);
      
      userRef.on('value', function(snapshot){
        data.user = snapshot.val()
        render()
      })
      //$('#addBook').append('<a class="btn-floating red modal-trigger" href="addBook.html"><i class="material-icons">playlist_add</i></a>');
      //$('#joinBook').append('<a class="btn-floating green modal-trigger" href="addBook.html"><i class="material-icons">perm_identity</i></a>');
      //$('#profile').append('<a class="btn-floating blue modal-trigger" href="addBook.html"><i class="material-icons">add</i></a>');
      $('#buttons1').append('<div class="row"><div class="col s12"><div class="fixed-action-btn horizontal click-to-toggle" style="float:top; position:relative; margin-top:100px;"><a class="btn-floating btn-large red"><i class="large mdi-navigation-menu"></i></a><ul><li><a class="btn-floating red modal-trigger" href="#modal1"><i class="material-icons">playlist_add</i></a></li><li><a class="btn-floating yellow darken-1 modal-trigger" href="#modal2"><i class="material-icons">perm_identity</i></a></li><li><a class="btn-floating deep-orange lighten-2 modal-trigger" href="#modal3"><i class="material-icons">search</i></a></li></ul></div></div></div>');
      $('#tabs').append('<div class="row"><div class="col s12"><div class="col s4" id="book"></div><div class="col s6 offset-s1" id="message"></div></div>');

        userRef.on('value',function(snapshot){
        //console.log("User books:")
        //console.log(snapshot.child('bookList').val())
        var books = snapshot.val();
          
          
        userBooks.push(snapshot.child('bookList').val())
      
        //console.log("User Books: "+userBooks)

        
        var bookRef = firebaseRef.child('books')
        bookRef.on('value',function(snapshot1){
          var bookname=Object.keys(snapshot1.val())
          //console.log(bookname);
          data.books = []
          
          
   
          
          
     
          
          for(var i in userBooks)
          {
            for(var j in bookname){
              if (snapshot.child('bookList').val()[i] == bookname[j]){
                var newBookRef = bookRef.child(bookname[j])
                //console.log("book one" + newBookRef)
                newBookRef.on('value', function(s){
                  data.books.push(s.val())

                  //console.log("bookname[j]" + bookname[j]);
           
                  $('#book').append('<ul class="collection"><div class="card cyan darken-1"><div class="card-content"><li class="collection-item><span class="title white-text">' + bookname[j] + '</span></li></div></div></ul>' );
         
                  //render()
                })
              }
            }
          }
        })
      })

           
      var root = new Firebase('https://critiquetogether.firebaseio.com/');
      var emailRef = root.child('messages/Dead');
      //console.log("emailref: " + emailRef);
      emailRef.on('value', function(snapshot){
          
          var emails = snapshot.val();
          
          for (var key in emails) {
            var email = emails[key];
            
            
            $('#message').append('<ul class="collection"><li>' + email['message'] + '</li></ul>');
          }
        });
            $('#addBook').empty();

  }
          

      } })
  
  
} 

actions.joinbook = function(){

  $('#book').empty();
    $('#message').empty();
    $('#tabs').empty();
    $('#addBook').empty();
    $('#joinBook').empty();
    $('#profile').empty();
$('#joinBook').append('<div align="center"><h3>Select a Book Club to Join</h3></div><form action="#">');
var test1=0
var book=[]
var root = new Firebase('https://critiquetogether.firebaseio.com/books');
root.once("value", function(snapshot) {
  console.log("outside")
  snapshot.forEach(function(childSnapshot) {
    console.log("inside")
    var key = childSnapshot.key();
    
$('#joinBook').append('<p align=""center"><input type="checkbox" id="'+test1+'"/><label for="'+test1+'"">'+key+'</label></p>');
    /*if (document.getElementById(test1).checked) {
            alert("checked");
            var booksChecked=[]
            booksChecked.push(key);
            console.log(booksChecked);
        } else {
            alert("You didn't check it!");
        } */
        test1+=1
        book.push(key);
        
    
  });
});
$('#joinBook').append('</form><div align="center"><a class="waves-effect waves-light orange btn white-text" id="join">Join<i class="material-icons right">send</i></a></div></div>');

 $('#join').click(function()



      {
        var booksChecked=[]
        console.log(test1);
        for (var i=0; i<test1; i++)
        {
          
        if (document.getElementById(i).checked) {
            
            booksChecked.push(book[i]);
            console.log(booksChecked);
            
        } else {
           
        }

      }




    
    //console.log("in the if loop!");
         // create a user object based on authData
      var user = {
        displayName: data.user.displayName,
        username: data.user.username,
        id: data.user.id,
        status: 'online',// position, default to the map center
        bookList:[]
      }

      
var userBooks=[]
      var userRef = firebaseRef.child('users').child(user.username)
      userRef.child('bookList').on('value', function(snapshot){
        var bookList1 = snapshot.val()
       // console.log("booklist"+bookList1)
        for (var key in bookList1)
        {
            var pushbook=bookList1[key]
            booksChecked.push(pushbook);
            
            //console.log("pushbook"+pushbook)
        }
        console.log("userbooks" + booksChecked)
          

        render()
      })
     
      userRef.child('bookList').set(booksChecked);
      
      
      $('#buttons1').append('<div class="row"><div class="col s12"><div class="fixed-action-btn horizontal click-to-toggle" style="float:top; position:relative; margin-top:100px;"><a class="btn-floating btn-large red"><i class="large mdi-navigation-menu"></i></a><ul><li><a class="btn-floating red modal-trigger" href="#modal1"><i class="material-icons">playlist_add</i></a></li><li><a class="btn-floating yellow darken-1 modal-trigger" href="#modal2"><i class="material-icons">perm_identity</i></a></li><li><a class="btn-floating deep-orange lighten-2 modal-trigger" href="#modal3"><i class="material-icons">search</i></a></li></ul></div></div></div>');
      $('#tabs').append('<div class="row"><div class="col s12"><div class="col s4" id="book"></div><div class="col s6 offset-s1" id="message"></div></div>');

      userRef.on('value',function(snapshot){
        //console.log("User books:")
        //console.log(snapshot.child('bookList').val())
        userBooks.push(snapshot.child('bookList').val())
        console.log("user book"+ userBooks)

        
        var bookRef = firebaseRef.child('books')
        bookRef.on('value',function(snapshot1){
          var bookname=Object.keys(snapshot1.val())
          //console.log(bookname);
          data.books = []
          for(var i in snapshot.child('bookList').val())
          {
            for(var j in bookname){
              if (snapshot.child('bookList').val()[i] == bookname[j]){
                var newBookRef = bookRef.child(bookname[j])
                newBookRef.on('value', function(s){
                  data.books.push(s.val())
 $('#book').append('<ul class="collection"><div class="card cyan darken-1"><div class="card-content"><li class="collection-item><span class="title white-text">' + bookname[j] + '</span></li></div></div></ul>' );
         
                  //render()
                })
              }
            }
          }
        })
      })

           
      var root = new Firebase('https://critiquetogether.firebaseio.com/');
      var emailRef = root.child('messages/Dead');
      //console.log("emailref: " + emailRef);
      emailRef.on('value', function(snapshot){
          
          var emails = snapshot.val();
          
          for (var key in emails) {
            var email = emails[key];
            
            
            $('#message').append('<ul class="collection"><li>' + email['message'] + '</li></ul>');
          }
        });
      $('#joinBook').empty();


})
}

actions.leavebook = function(){

  $('#book').empty();
    $('#message').empty();
    $('#tabs').empty();
    $('#addBook').empty();
    $('#joinBook').empty();
    
$('#leaveBook').append('<div align="center"><h3>Select a Book Club to Leave</h3></div><form action="#">');
var test1=0
var book=[]
var root = new Firebase('https://critiquetogether.firebaseio.com/');

root.child('users').child(data.user.username).child('bookList').once("value", function(snapshot) {
  //console.log("outside")
  snapshot.forEach(function(childSnapshot) {
    //console.log("inside")
    var key = childSnapshot.val();
 
$('#leaveBook').append('<p align=""center"><input type="checkbox" id="'+test1+'"/><label for="'+test1+'"">'+key+'</label></p>');
        test1+=1
        book.push(key);
        
    
  });
});
$('#leaveBook').append('</form><div align="center"><a class="waves-effect waves-light orange btn white-text" id="leave">Leave BookRoom<i class="material-icons right">send</i></a></div></div>');

 $('#leave').click(function()



      {
        var booksChecked=[]
        console.log(test1);
        for (var i=0; i<test1; i++)
        {
          
        if (document.getElementById(i).checked) {
            
            booksChecked.push(book[i]);
            
            
        } else {
           
        }

      }
      console.log("Books checked: " +booksChecked);




    
    //console.log("in the if loop!");
         // create a user object based on authData
      var user = {
        displayName: data.user.displayName,
        username: data.user.username,
        id: data.user.id,
        status: 'online',// position, default to the map center
        bookList:[]
      }

      
var userBooks=[]
      var userRef = firebaseRef.child('users').child(user.username)
      userRef.child('bookList').on('value', function(snapshot){
        var bookList1 = snapshot.val()
       // console.log("booklist"+bookList1)
        for (var key in bookList1)
        {
            var pushbook=bookList1[key]
            //booksChecked.push(pushbook);
            
            //console.log("pushbook"+pushbook)
        }
        //console.log("userbooks" + booksChecked)
          

        render()
      })
var subtractedBooks=[]

      userRef.on('value',function(snapshot){
        console.log("User books: "+book)
        //console.log(snapshot.child('bookList').val())
        
        var bookfound
        
                console.log("Initial books")
        console.log(booksChecked)
        for(var b in book)
        {
          b = book[b]
          console.log("Checking : " + b);
          bookfound = false
          for(var bookcheck in booksChecked)
          { 
            bookcheck = booksChecked[bookcheck]
            console.log(bookcheck)
            if(bookcheck==b)
            {
              console.log("Found")
              bookfound = true
            }
          }

          if(bookfound==false)
            {
            console.log("Pushing : " + b)
            subtractedBooks.push(b)
            }
        }
        console.log("Final books :"+ subtractedBooks)
      })
     
      //userRef.child('bookList').set(booksChecked);
      userRef.child('bookList').set(subtractedBooks);
      
      $('#tabs').append('<div class="row"><div class="col s12"><div class="col s4" id="book"></div><div class="col s6 offset-s1" id="message"></div></div>');

      userRef.on('value',function(snapshot){
        console.log("User books: "+book)
        //console.log(snapshot.child('bookList').val())
        
        var bookfound
        
        var subtractedBooks=[]
        console.log("Initial books")
        console.log(booksChecked)
        for(var b in book)
        {
          b = book[b]
          console.log("Checking : " + b);
          bookfound = false
          for(var bookcheck in booksChecked)
          { 
            bookcheck = booksChecked[bookcheck]
            console.log(bookcheck)
            if(bookcheck==b)
            {
              console.log("Found")
              bookfound = true
            }
          }

          if(bookfound==false)
            {
            console.log("Pushing : " + b)
            subtractedBooks.push(b)
            }
        }
        console.log("Final books :"+ subtractedBooks)
        //userRef.child('bookList').set(subtractedBooks);
        //subtractedBooks.set(snapshot.child('bookList').val())
        //console.log("subtracted books :"+ subtractedBooks)
        
        var bookRef = firebaseRef.child('books')
        bookRef.on('value',function(snapshot1){
          var bookname=Object.keys(snapshot1.val())
          //console.log(bookname);
          data.books = []

          for(var i in snapshot.child('bookList').val())
          {
            for(var j in bookname){
              if (snapshot.child('bookList').val()[i] == bookname[j]){
                var newBookRef = bookRef.child(bookname[j])
                newBookRef.on('value', function(s){
                  data.books.push(s.val())
 $('#book').append('<ul class="collection"><div class="card cyan darken-1"><div class="card-content"><li class="collection-item><span class="title white-text">' + bookname[j] + '</span></li></div></div></ul>' );
         
                  //render()
                })
              }
            }
          }
        })
      })

           
      var root = new Firebase('https://critiquetogether.firebaseio.com/');
      var emailRef = root.child('messages/Dead');
      //console.log("emailref: " + emailRef);
      emailRef.on('value', function(snapshot){
          
          var emails = snapshot.val();
          
          for (var key in emails) {
            var email = emails[key];
            
            
            $('#message').append('<ul class="collection"><li>' + email['message'] + '</li></ul>');
          }
        });
      $('#leaveBook').empty();


})
}




