Template.card.events({
  'click': function (e,template) {
      var existingVote, points = template.data.value,
      currentUser = Session.get('username'),
      currentRoom = Session.get('currentRoom'),
      currentRound = TeamsList.findOne({room: currentRoom}).round,
      currentTeam;

      Session.set({'choice': points});

      //TODO: round room from teamslist
      existingVote = VotesList.findOne({room:currentRoom, round:0, username: currentUser});
      if (typeof existingVote === 'undefined') {
        debugger;
        VotesList.insert({room:currentRoom, round:0, username:currentUser, points:points});
        currentTeam = TeamsList.findOne({room: currentRoom});
        TeamsList.update(currentTeam._id, {$set: {voteCount: currentTeam.voteCount + 1}});
      }
      else {
        VotesList.update(existingVote._id, {$set: {points: points}});
      }

  }
});
Template.card.helpers({
    'isSelected': function() {
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
