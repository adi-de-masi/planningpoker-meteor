Meteor.publish("room", function (username, roomId) {
  var existingTeam = TeamsList.findOne({room: roomId}),
      participants = [];
  participants.push(username);
  if (typeof(existingTeam) === 'undefined') {
    TeamsList.insert({room: roomId, round:0, participants: participants, voteCount:0});
  }
  else {
    if (existingTeam.participants.lastIndexOf(username) < 0) {
      existingTeam.participants.push(username);
      TeamsList.update(existingTeam._id, {$set: {participants: existingTeam.participants}});
    }
  }
    
  this.onStop(function () {
    var existingTeam = TeamsList.findOne({room: roomId}), participants = existingTeam.participants;
    participants.pop(username);
    TeamsList.update(existingTeam._id, {$set: {participants: participants}});
  });
});
