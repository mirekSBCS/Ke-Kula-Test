(function(){

  var config = {
  apiKey: "AIzaSyAN9n8AOJwT9KgXvovdVZCU_GpGQEdT8oU",
  authDomain: "elkharttest.firebaseapp.com",
  databaseURL: "https://elkharttest.firebaseio.com",
  projectId: "elkharttest",
  storageBucket: "elkharttest.appspot.com",
  messagingSenderId: "595572675109"
};

  // var studentCount = 1;

  $(document).ready(initialize);

  function initialize(){
    firebase.initializeApp(config);
    $("#submitButton").click(saveData);
  }

  function saveData(){
    var username = $("#username").val(); //get username and password
    var password = $("#password").val();
    // var students = $(".student"); //get all student input elements

    //object used for teacher entry in firebase
    var teacherEntry = {
        username: username,
        password: password
      }

    //get ID
    var entryKey = firebase.database().ref().child('Teachers').push().key;

    //set up object to be pushed
    var updates = {};
    //set up teacher data in the right structure
    updates['/Teachers/' + entryKey] = teacherEntry;

    //store in firebase
    firebase.database().ref().update(updates).then(function(){
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("entryKey", entryKey);
      window.location.replace('./dashboard.html'); //load next page
    });
  }

})();
