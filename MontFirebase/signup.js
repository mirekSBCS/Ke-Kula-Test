(function(){

  var config = {
    apiKey: "AIzaSyCmpE-W0hm6F8udYneGzt9t5G7r7S_j1x0",
    authDomain: "montessoritest-c8f45.firebaseapp.com",
    databaseURL: "https://montessoritest-c8f45.firebaseio.com",
    projectId: "montessoritest-c8f45",
    storageBucket: "montessoritest-c8f45.appspot.com",
    messagingSenderId: "848559662010"
  };

$(document).ready(initialize);

function initialize(){
  firebase.initializeApp(config);
  $("#submitButton").click(saveData);
}

function saveData(){
  var usernameTaken = false;

  var fname = $("#first_name").val();
  var lname = $("#last_name").val();
  var company = $("#company").val();
  var enteredUsername = $("#username").val();
  var password = $("#password").val();
  var email = $("#email_inline").val();

  var entry = {
    first_name: fname,
    last_name: lname,
    company: company,
    username: enteredUsername,
    password: password,
    email: email
  }

  firebase.database().ref('Entry').once('value', function(snapshot){
    var entries = snapshot.val();
    for(var i in entries){
      var username = entries[i].username;

      if(enteredUsername == username){
        alert('Username is already taken!');
        usernameTaken = true;
        break;
      }
    }

    if(usernameTaken == false){
      var newEntryKey = firebase.database().ref().child('Entry').push().key;
      var updates = {};
      updates['/Entry/' + newEntryKey] = entry;
      firebase.database().ref().update(updates).then(function(){
          localStorage.setItem("username", enteredUsername);
          window.location.replace('./index.html');
      });
    }
  });
}

})();
