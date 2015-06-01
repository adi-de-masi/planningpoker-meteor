var getRounds = function () {
  var roomId = Template.parentData(0).roomId;
  return RoundsList.find({room: roomId}, {sort: {round: -1}});
};

Template.results.helpers({
  displayResults: function () {
    var retVal = PlayersList.find({roomId: this.roomId}).count() <= VotesList.find({roomId: this.roomId}).count();
    return retVal ? 'visible' : 'invisible';
  }

});

Template.rounds.helpers({
    'rounds': function () {
        return getRounds();
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
        VotesList.insert({room:currentRoom, round:currentRound, username:currentUser, points:points});
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

var getMissingPlayers = function () {
    return VotesList.find({room: Template.parentData(0).roomId, round: Session.get('currentRound'), points: undefined}).fetch();
};
Template.vote.helpers({
  'fibonaccis': function () {
    return [{value: 1},
      {value: 3},
      {value: 5},
      {value: 8},
      {value: 13},
      {value: 21}];
  },
  'choiceMade': function () {
    return Session.get('choice') !== undefined;
  },
  'choice': function () {
    return Session.get('choice');
  },
  'currentRound': function () {
    var currentRound = getRounds().fetch()[0];
    if (typeof(currentRound) === 'undefined') {
        return 0;
    } else {
        return currentRound.round + 1;
    }
  },
  'waiting': function () {
    return getMissingPlayers().length > 0;
  },
  'missingPlayers': function () {
    return getMissingPlayers();
  }
});
