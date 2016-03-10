var _ = require('lodash')
var random_name = require('node-random-name');
//var random_book = require('node-random-book');
var Firebase = require('firebase');

var ref = new Firebase('https://critiquetogether.firebaseio.com');
var usersRef = ref.child("users");
var booksRef = ref.child("books");

var userNames = ["Varshini", "Yadira", "Roger", "Novak", "Chris"];
var status = ["online", "offline"]
var books = ["The Firm","Famous Five","Harry Potter","Fountain Head","Dead Lock"]
var authors = ["John Grisham","Enid Blyton","JK Rowling","Fountain Head","Iris Johansen"]
var descriptions = ["A Crime novel that eases your mind","A book about 5 teenagers","A story about a boy who learns he is a wizard","A novel about a hero and about those who try to destroy him","An archeologist who travels around the world to save priceless artifacts"]
var genres = ["fiction","Children's Literature","Mystery","Philosophical Fiction","Adventure"]
var addedMembers = ["Yadira","Varshini","Chris","Roger","Novak"]

// simualate adding a book
function simulate(){

  // generate a random name and book


  
  var users = {
    name: userNames[Math.floor(Math.random() * userNames.length)],
    status: status[Math.floor(Math.random() * status.length)],
    booklist: books[Math.floor(Math.random() * books.length)]
  }

  var booksstruct = {
    name: books[Math.floor(Math.random() * books.length)],
    author: authors[Math.floor(Math.random() * authors.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    genre: genres[Math.floor(Math.random() * genres.length)],
    addedMember: addedMembers[Math.floor(Math.random() * addedMembers.length)]
  }


  var duration = 8*Math.random()
  // simulate adding a book
  enter(users)
  addbook(booksstruct)

   //simulate deleting a book
  setTimeout(function(){
      leave(users)
      deletebook(booksstruct)

    }, duration * 1000)

  //simulate editing a book 
  setTimeout(function(){
      edit(users)
      editbook(booksstruct)
    }, duration * 1000) 

  
}
// simulate adding a book in users
function enter(users){
  console.log('add book', users)
  var personRef = usersRef.child(users.name);
  personRef.update({'book-list': books[Math.floor(Math.random() * books.length)]});


}

// simulate adding a book in books
function addbook(booksstruct){
    console.log('add book', booksstruct)

var bookRef = booksRef.child(booksstruct.name);
  bookRef.update({'Author': authors[Math.floor(Math.random() * authors.length)]});
  bookRef.update({'Description': descriptions[Math.floor(Math.random() * descriptions.length)]});
  bookRef.update({'genre': genres[Math.floor(Math.random() * genres.length)]});
  bookRef.update({'addedMember': addedMembers[Math.floor(Math.random() * addedMembers.length)]});
  }

//simulate editing a book in users
function edit(users){
  console.log('edit book', users)
  var personRef = usersRef.child(users.name);

  personRef.update({'book-list': books[Math.floor(Math.random() * books.length)]});



}

//simulate editing a book in books
function editbook(booksstruct){
  console.log('edit book', booksstruct)
  
  var bookRef = booksRef.child(booksstruct.name);
  bookRef.update({'Author': authors[Math.floor(Math.random() * authors.length)]});
  bookRef.update({'Description': descriptions[Math.floor(Math.random() * descriptions.length)]});
  bookRef.update({'genre': genres[Math.floor(Math.random() * genres.length)]});
  bookRef.update({'addedMember': addedMembers[Math.floor(Math.random() * addedMembers.length)]});


}



   //simulate deleting a book in users
function leave(users){
  console.log('delete book', users)
  var personRef = usersRef.child(users.name);

  personRef.update({'book-list': ''});



} 

//simulate deleting a book in books
function deletebook(booksstruct){
  console.log('delete book', booksstruct)

  var bookRef = booksRef.child(booksstruct.name).remove();
    console.log('book that should get deleted', bookRef)



}

// run each second
setInterval(simulate, 3000)