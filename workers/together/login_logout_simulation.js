var _ = require('lodash')
var random_name = require('node-random-name');
var Firebase = require('firebase');

var ref = new Firebase('https://critiquetogether.firebaseio.com');
var usersRef = ref.child("users");

var userNames = ["Varshini", "Yadira", "Roger", "Novak", "Chris"];
var books = ["The Firm","Famous Five","Harry Potter","Fountain Head","Dead Lock"]
var status = ["online", "offline"]

// simualate a random person entering, staying for a duration, and leaving
function simulate(){

  // generate a random person with a random name,
  // random location, and random duration
  //var name = random_name();

  //var duration = 10 + 30 * Math.random();
  //var lat = city_location.lat + radius * (Math.random() - 0.5) * 2;
  //var lon = city_location.lon + radius * (Math.random() - 0.5) * 2;

  // Max - Min + 1 since decimal is blocked off + Min Val
  /*var price = Math.floor(Math.random() * (1000 - 20 + 1)) + 20; // Int ranges between 20 and 1000
  var rating = ratings[Math.floor(Math.random() * (8 - 0 + 1))];
  var specialty = specialties[Math.floor(Math.random() * (7 - 0 + 1))];
  var type = types[Math.floor(Math.random() * (1 - 0 + 1))];*/
  
  var person = {
    name: userNames[Math.floor(Math.random() * userNames.length)],
    status: status[Math.floor(Math.random() * status.length)]
    
  }


  var duration = 8*Math.random()
  // simulate this person entering
  enter(person)

  setTimeout(function(){
      leave(person)
    }, duration * 1000)

  console.log(usersRef);
}

function enter(person){
  console.log('enter', person)
  var personRef = usersRef.child(person.name);


  personRef.set({status: 'online'});


}

function leave(person){
  console.log('leave', person)
  var personRef = usersRef.child(person.name);

  personRef.set({status: 'offline'});
}

// run each second
setInterval(simulate, 3000)