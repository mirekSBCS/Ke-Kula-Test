(function(){

  var config = {
  apiKey: "AIzaSyAN9n8AOJwT9KgXvovdVZCU_GpGQEdT8oU",
  authDomain: "elkharttest.firebaseapp.com",
  databaseURL: "https://elkharttest.firebaseio.com",
  projectId: "elkharttest",
  storageBucket: "elkharttest.appspot.com",
  messagingSenderId: "595572675109"
};

  $(document).ready(initialize);

  function initialize(){
    firebase.initializeApp(config);
    loadData();
  }

  function loadData(){
    var entryKey = sessionStorage.entryKey;
    if(!entryKey){
      window.location.replace('./index.html');
    }
      firebase.database().ref('Students').once('value', function(snapshot){
        var allStudents = snapshot.val();
          var students = allStudents[entryKey];
          if(students){
            for (i in students){
              studentName = students[i].name;
              studentPoints = students[i].points;
              $(".studentsDiv").append(
              '<div class="row">'+
              '<input type="text" class="name" value="'+studentName+'">'+
              '<input type="number" class="points" value="'+studentPoints+'">'+
              '</div>');
            }
          }else{
            $(".studentsDiv").append('<div class="row">'+
            '<input type="text" class="name" value="Enter Student Name">'+
            '<input type="number" class="points" value="0">'+
            '</div>');
          }
            firebase.database().ref('Rewards').once('value', function(snapshot){
              var allRewards = snapshot.val();
                var rewards = allRewards[entryKey];
                if(rewards){
                  for (i in rewards){
                    rewardName = rewards[i].name;
                    rewardPoints = rewards[i].points;
                    rewardCost = rewards[i].cost;
                    $(".rewardsDiv").append(
                    '<div class="row">'+
                    '<input type="text" class="name" value="'+rewardName+'">'+
                    '<input type="number" class="points" value="'+rewardPoints+'">'+
                    '<input type="number" class="rewardsCost" value="'+rewardCost+'">'+
                    '</div>');
                  }
                }else{
                  $(".rewardsDiv").append(
                  '<div class="row">'+
                  '<input type="text" class="rewardsName" value="Enter Reward Name">'+
                  '<input type="number" class="rewardsPoints" value="0">'+
                  '<input type="number" class="rewardsCost" placeholder="Enter Reward Cost">'+
                  '</div>');
                }
                $("body").append('<button id="submitButton">Submit</button>');
                $("#submitButton").click(saveData);
                $("#addStudent").on('click', function(){
                  $(".studentsDiv").append(
                  '<div class="row">'+
                  '<input type="text" class="name" value="Enter Student Name">'+
                  '<input type="number" class="points" value="0">'+
                  '</div>')});
                $("#addReward").on('click', function(){
                  $(".rewardsDiv").append(
                  '<div class="row">'+
                  '<input type="text" class="rewardsName" value="Enter Reward Name">'+
                  '<input type="number" class="rewardsPoints" value="0">'+
                  '<input type="number" class="rewardsCost" placeholder="Enter Reward Cost">'+
                  '</div>')});
              });
          });
      }

  function saveData(){
    var studentNames = $(".name");
    var studentPoints = $(".points");
    var rewardsNames = $(".rewardsName");
    var rewardsPoints = $(".rewardsPoints");
    var rewardsCosts = $(".rewardsCost");

    var entryKey = sessionStorage.entryKey;

    var updates = {};

    for(var i = 0; i < studentPoints.length; i++){
      var entry = {
        name: $(studentNames[i]).val(),
        points: $(studentPoints[i]).val()
      }
      updates['/Students/'+entryKey+'/Student'+(i+1)] = entry;
    }

    for (var i = 0; i < rewardsPoints.length; i++){
      var entry = {
        name: $(rewardsNames[i]).val(),
        points: $(rewardsPoints[i]).val(),
        cost: $(rewardsCosts[i]).val()
      }
      updates['/Rewards/'+entryKey+'/Reward'+(i + 1)] = entry;
    }

    firebase.database().ref().update(updates).then(function(){
      window.location.replace("./dashboard.html");
    });
  }


})();
