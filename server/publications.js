Meteor.publish("room", function (username, roomId) {
  var existingTeam = Teams.findOne({room: roomId}),
      participants = [];
  
  participants.push(username);
  if (typeof(existingTeam) === 'undefined') {
    Teams.insert({room: roomId, round:0, participants: participants, voteCount:0});
  }
  else {
    if (existingTeam.participants.lastIndexOf(username) < 0) {
      existingTeam.participants.push(username);
      Teams.update(existingTeam._id, {$set: {participants: existingTeam.participants}});
    }
  }
    
  this.onStop(function () {
    var existingTeam = Teams.findOne({room: roomId}), participants = existingTeam.participants;
    var userIndex = participants.indexOf(username);
    if(userIndex != -1) {
      participants.splice(userIndex, 1);
    }

    Teams.update(existingTeam._id, {$set: {participants: participants}});
  });
});
