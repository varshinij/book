---
layout: layout.hbs
---

# Specification

# Data

Our app uses the following structure for the database backend:

<<<<<<< HEAD
* userDetails
  * username
    * status
    * book-list

* books
  * name
    * author
    * description
    * addedMember
    * genre

* discussion
  * bookName
    * username
    * messageID

* messages
  * messageID
    * message
    * timeStamp
    * senderUsername
    
=======
* foo
  * bar
    * ss
    * xx
  * messages
>>>>>>> origin/master

# Actions

The major actions of our app are:
<<<<<<< HEAD
* Book Actions
* Sending a Message
* ChatRoom Actions


## Action: Book Actions

### case: Add a book "Famous Five"

``` javascript
// given
books is
{
  '-The Firm': {
    'author': 'John',
    'description': 'This is a great book.',
    'addedMember': 'Kavya',
    'genre': 'Fiction'
  }
}

userDetails is
{
  '-Kavya': {
    'status': 'typing',
    'book-list': 'The Firm'
  }
}

discussion is
{
  '-The Firm': {
    'username': 'Kavya,Varshini,Yadira',
    'messageID': '1234567'
  }
}


// when
add_a_book(name='Famous Five',author = 'Enid Blyton',description = 'A great children's novel',addedMember = 'Kavya',genre = 'Children's literature')

// then
books is
{
  '-The Firm': {
    'author': 'John',
    'description': 'This is a great book.',
    'addedMember': 'Kavya',
    'genre': 'Fiction'
  },

  '-Famous Five': {
    'author': 'Enid Blyton',
    'description': 'A great children's novel',
    'addedMember': 'Kavya',
    'genre': 'Children's literature'
  }
}

userDetails is
{
  '-Kavya': {
    'status': 'typing',
    'book-list': 'The Firm','Famous Five'
  }
}

discussion is
{
  '-The Firm': {
    'username': 'Kavya,Varshini,Yadira',
    'messageID': '1234567'
  },

  '-Famous Five': {
    'username': 'Kavya',
    'messageID': '2468'
  }
}
```

### case: delete the book "The Firm"

``` javascript
// given
books is
{
  '-The Firm': {
    'author': 'John',
    'description': 'This is a great book.',
    'addedMember': 'Kavya',
    'genre': 'Fiction'
  },
  '-Famous Five': {
    'author': 'Enid Blyton',
    'description': 'A great children's novel',
    'addedMember': 'Kavya',
    'genre': 'Children's literature'
  }
}

userDetails is
{
  '-Kavya': {
    'status': 'typing',
    'book-list': 'The Firm','Famous Five'
  }
}

discussion is
{
  '-The Firm': {
    'username': 'Kavya,Varshini,Yadira',
    'messageID': '1234567'
  },

  '-Famous Five': {
    'username': 'Kavya',
    'messageID': '2468'
  }
}


// when
delete_a_book(name='The Firm')

// then
books is
{

  '-Famous Five': {
    'author': 'Enid Blyton',
    'description': 'A great children's novel',
    'addedMember': 'Kavya',
    'genre': 'Children's literature'
  }
}

userDetails is
{
  '-Kavya': {
    'status': 'typing',
    'book-list':'Famous Five'
  }
}

discussion is
{
  '-Famous Five': {
    'username': 'Kavya',
    'messageID': '2468'
  }
}
```


### case: Edit the book "The Firm" by replacing the Author name to "John Grisham" and description to "A classic court room book."

``` javascript
// given
books is
{
  '-The Firm': {
    'author': 'John',
    'description': 'This is a great book.',
    'addedMember': 'Kavya',
    'genre': 'Fiction'
  },
  '-Famous Five': {
    'author': 'Enid Blyton',
    'description': 'A great children's novel',
    'addedMember': 'Kavya',
    'genre': 'Children's literature'
  }
}

userDetails is
{
  '-Kavya': {
    'status': 'typing',
    'book-list': 'The Firm','Famous Five'
  }
}

discussion is
{
  '-The Firm': {
    'username': 'Kavya,Varshini,Yadira',
    'messageID': '1234567'
  },

  '-Famous Five': {
    'username': 'Kavya',
    'messageID': '2468'
  }
}


// when
edit_a_book(author='John Grisham',description="A classic court room book.")

// then
books is
{
  '-The Firm': {
    'author': 'John Grisham',
    'description': 'A classic court room book.',
    'addedMember': 'Kavya',
    'genre': 'Fiction'
  },

  '-Famous Five': {
    'author': 'Enid Blyton',
    'description': 'A great children's novel',
    'addedMember': 'Kavya',
    'genre': 'Children's literature'
  }
}

userDetails is
{
  '-Kavya': {
    'status': 'typing',
    'book-list':'The Firm','Famous Five'
  }
}

discussion is
{
  '-The Firm': {
    'username': 'Kavya,Varshini,Yadira',
    'messageID': '1234567'
  },

  '-Famous Five': {
    'username': 'Kavya',
    'messageID': '2468'
  }
}
```

## Action: Sending a message 

### case: send a message "I agree." as Yadira at 10:20 AM

``` javascript
// given



messages is
{
  '-5687': {
    'message': 'Love this book!',
    'timeStamp': '8:40 PM',
    'senderUsername':'Kavya'
  }
}


// when
send_a_message(messageID='13579',message='I agree.',timeStamp='10:20 AM',senderUsername='Yadira')

// then



messages is
{
  '-13579': {
    'message': 'I agree.',
    'timeStamp': '10:20 AM',
    'senderUsername':'Yadira'
  }
}
```

## Action: Chatroom Actions

### case: Join a Chatroom  for "The Firm"

``` javascript
// given

userDetails is
{
  '-Varshini': {
    'status': 'online',
    'book-list': 'The Firm'
  }
  '-Yadira': {
    'status': 'online',
    'book-list': 'Fountain Head'
  }

}


// when
join_a_chatroom(name='Yadira',status='online')

// then


userDetails is
{
  '-Varshini': {
    'status': 'online',
    'book-list': 'The Firm'
  }

  '-Yadira': {
    'status': 'online',
    'book-list': 'Fountain Head','The Firm'
  }
}



```
### case: Leave a Chatroom  for "The Firm" as Yadira

``` javascript
// given

userDetails is
{
  '-Varshini': {
    'status': 'online',
    'book-list': 'The Firm'
  }

}



// when
join_a_chatroom(name='Yadira')

// then


userDetails is
{
  '-Varshini': {
    'status': 'online',
    'book-list': 'The Firm'
  }

  '-Yadira': {
    'status': 'online',
    'book-list': ''
  }
}



```
=======
* (TODO: action name)
* (TODO: action name)
* (TODO: action name)
* (TODO: action name)
* (TODO: action name)

## Action: (TODO: name)

(TODO: cases)

## Action: (TODO: name)

(TODO: cases)

## Action: (TODO: name)

(TODO: cases)

## Action: (TODO: name)

(TODO: cases)




(remove the example below before submission)

## Action: Post A Message (Example)

### case: post a message 'd'

``` javascript
// given
foo.bar.messages is
{
  '-cadsace': 'a',
  '-cadsacf': 'b',
  '-cadsacg': 'c'
}

// when
post_a_message(text = 'd')

// then
foo.bar.messages should be
{
  '-cadsace': 'a',
  '-cadsacf': 'b',
  '-cadsacg': 'c',
  '-cadsach': 'd',
}
```

### case: delete a message

``` javascript
// given
foo.bar.messages is
{
  '-cadsace': 'a',
  '-cadsacf': 'b',
  '-cadsacg': 'c'
}

// when
delete_a_message(id = '-cadsacg')

// then
foo.bar.messages should be
{
  '-cadsace': 'a',
  '-cadsacf': 'b'
}
```
>>>>>>> origin/master
