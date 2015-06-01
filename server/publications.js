Meteor.publish("room", function (username, roomId) {

  PlayersList.upsert({username:username, roomId:roomId}, {$set:{username:username, roomId:roomId}});
  var existingTeam = TeamsList.findOne({room: roomId});
  if (typeof(existingTeam) === 'undefined') {
    TeamsList.insert({room: roomId, round:0, participantCount:1, voteCount:0});
  } else {
    TeamsList.update(existingTeam._id, {$set: {participantCount: existingTeam.participantCount + 1}});
  }
    
  this.onStop(function () {
    var existingTeam = TeamsList.findOne({room: roomId});
    PlayersList.remove({username:username, roomId:roomId});
    TeamsList.update(existingTeam._id, {$set: {participantCount: existingTeam.participantCount - 1}});
  });
});
