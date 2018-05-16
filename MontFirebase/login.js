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
    $("#submitButton").click(login);
  }

  function login(){
    var enteredUsername = $('#username').val();
    var enteredPassword = $('#password').val();

    firebase.database().ref('Entry').once('value', function(snapshot){
      var entries = snapshot.val();
      for(var i in entries){
        var username = entries[i].username;
        var password = entries[i].password;
        if((enteredUsername == username) && (enteredPassword == password)){
          localStorage.setItem("username", username);
          window.location.replace('./index.html');
        }
      }
    });
  }
})();
