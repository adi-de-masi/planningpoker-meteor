Meteor.publish("room", function (username, roomId) {

  PlayersList.upsert({username:username, roomId:roomId}, {$set:{username:username, roomId:roomId}});

  this.onStop(function () {
    PlayersList.remove({username:username, roomId:roomId});
  });
});
