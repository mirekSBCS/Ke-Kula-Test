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

var map;
var lat = 0;
var long = 0;
var current_location;

function initialize(){
  firebase.initializeApp(config);
  $('.modal').modal();
  $("#submitButton").click(saveData);
  findlocation();
}

  function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat:lat, lng:long}
        });
  }

  function saveData(){
    var CurrentUsername = localStorage.getItem("username");
    var UpdateLocation = false;
    var ReplaceKey;

    firebase.database().ref('Entry').once('value', function(snapshot){
      var entries = snapshot.val();
      for(var i in entries){
        var username = entries[i].username;
        if (CurrentUsername == username){
          UpdateLocation = true;
          ReplaceKey = i;
          break;
        }
      }

    var entry = {
      username: CurrentUsername,
      lat: lat,
      long: long,
    }

    var newEntryKey = firebase.database().ref().child('Entry').push().key;
    var updates = {};
    if(UpdateLocation = false){
      updates['/Entry/' + newEntryKey] = entry;
      firebase.database().ref().update(updates).then(function(){
          window.location.replace('./index.html');
      });
    } else{
      firebase.database().ref('/Entry/' + ReplaceKey).update({
        lat: lat,
        long: long
      }).then(function(){
        window.location.replace('./index.html');
      });
    }

  });
}

  function findEntriesNearMe() {
    console.log('finding entries near me');
    // $('#story').empty();
    firebase.database().ref('Entry').once('value', function(snapshot){
      var entry = snapshot.val();

      for(var i in entry){
        var lat = entry[i].lat;
        var long = entry[i].long;
        var description = entry[i].username;
        var location = {lat : lat, lng : long};
        // this is where we send the entry location to the haersine formula to
        // be compared against the current location of the user.

        var contentString = '<div id="content">'+
           '<div id="siteNotice">'+
           '<h1>'+description+'</h1>'+
           '</div>'+
           '</div>';

       var infowindow = new google.maps.InfoWindow({
         content: contentString
       });

       var marker = new google.maps.Marker({
         position: location,
         map: map,
         title: description,
       });

       marker.addListener('click', function() {
         infowindow.open(map, marker);
       });
      }
    });
  }

//=====all of this is geolocation
  function findlocation(){
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    function success(pos) {
      var crd = pos.coords;
      lat = crd.latitude;
      long = crd.longitude;
      current_location = {lat, long};
      initMap();
      findEntriesNearMe();
    };
    navigator.geolocation.watchPosition(success, error, options);
  }

})();
