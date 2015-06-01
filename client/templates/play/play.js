Template.results.helpers({
  displayResults: function () {
    var retVal = PlayersList.find({roomId: this.roomId}).count() <= VotesList.find({roomId: this.roomId}).count();
    return retVal ? 'visible' : 'invisible';
  }

});

Template.rounds.helpers({
    'rounds': function () {
        var roomId = Template.parentData(0).roomId;
        return RoundsList.find({room: roomId});
    }
});

Template.card.events({
  'click': function (e, template) {
      var existingVote, points = template.data.value,
      currentUser = Template.parentData(1).username,
      currentRoom = Template.parentData(1).roomId,
      currentRound = TeamsList.findOne({room: currentRoom}).round,
      currentTeam;

      Session.set({'choice': points});

      existingVote = VotesList.findOne({room: currentRoom, round: currentRound, username: currentUser});
      if (typeof existingVote === 'undefined') {
        VotesList.insert({room:currentRoom, round:0, username:currentUser, points:points});
        currentTeam = TeamsList.findOne({room: currentRoom});
        TeamsList.update(currentTeam._id, {$set: {voteCount: currentTeam.voteCount + 1, points: points}});
      }
      else {
        VotesList.update(existingVote._id, {$set: {points: points}});
      }
  }
});
Template.card.helpers({
  'isSelected': function () {
    return Session.get('choice') === this.value;
  }
});
Template.vote.helpers({
  'fibonaccis': function () {
    return [{value: 1},
      {value: 3},
      {value: 5},
      {value: 8},
      {value: 13},
      {value: 21}];
  },
  'choice': function () {
    return Session.get('choice');
  }
});
