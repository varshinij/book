var _ = require('lodash')
var random_name = require('node-random-name');
//var random_book = require('node-random-book');
var Firebase = require('firebase');

var ref = new Firebase('https://critiquetogether.firebaseio.com');
var usersRef = ref.child("messages");


var messageID = ["4567","34378","54393","28459"]
var message = ["This is great book.I loved it!","I have read half the book and its very interesting","Does the main character die in the end?Very curious!!","The book is so interesting and gripping till the end."]
var timeStamp = ["10:20 PM","11:45 AM","1:00 PM","6:32 AM"]
var senderUsername = ["Chris","Yadira","Varshini","Roger"]


// simualate adding a book
function simulate(){



  var messages = {
    msgID: messageID[Math.floor(Math.random() * messageID.length)],
    msg: message[Math.floor(Math.random() * message.length)],
    tmstmp: timeStamp[Math.floor(Math.random() * timeStamp.length)],
    sdrusrnm: senderUsername[Math.floor(Math.random() * senderUsername.length)]
  }


  var duration = 8*Math.random()
  // simulate adding a book
  sendmsg(messages)

   //simulate deleting a book
  setTimeout(function(){
      
    }, duration * 1000)



  
}

function sendmsg(messages){
  console.log('send message', messages)
  var messageRef = usersRef.child(messages.msgID);
  messageRef.update({'msgID': messageID[Math.floor(Math.random() * messageID.length)]});
  messageRef.update({'msg': message[Math.floor(Math.random() * message.length)]});
  messageRef.update({'tmstmp': timeStamp[Math.floor(Math.random() * timeStamp.length)]});
  messageRef.update({'sdrusrnm': senderUsername[Math.floor(Math.random() * senderUsername.length)]});

}

// run each second
setInterval(simulate, 3000)