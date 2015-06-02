// reusable methods
var getRound = function () {
    return Teams.findOne({room: Template.parentData(1).roomId}).round;
};
var getRounds = function () {
  var roomId = Template.parentData(0).roomId;
  return Rounds.find({room: roomId}, {sort: {round: -1}});
};
var getActualPlayers = function () {
    var team = Teams.findOne({room: Template.parentData(1).roomId}),
        votes,
        result = [];
    if (typeof team !== 'undefined') {
        votes = Votes.find({room: Template.parentData(1).roomId, round: team.round}).fetch();
        for (var i = 0; i < votes.length; i++) {
            result.push(votes[i].username);
        }
    }
    return result;
};

var getMissingPlayers = function () {
    var team = Teams.findOne({room: Template.parentData(1).roomId}), expectedPlayers, actualPlayers;
    if (typeof(team) !== 'undefined') {
        expectedPlayers = team.participants;
    } else {
        expectedPlayers = [];
    }
    actualPlayers = getActualPlayers();
    var missing = expectedPlayers.filter(function(i, val) {
      return actualPlayers.indexOf(i) < 0;
    });
    return missing;
};
var getVote = function (username) {
    return Votes.findOne({room: Template.parentData(1).roomId, round: getRound(), username: username});
};
    
        

// rounds template
Template.rounds.helpers({
    'rounds': function () {
        return getRounds();
    }
});

// card template
Template.card.events({
  'click': function (e, template) {
    var existingVote, points = template.data.value,
      currentUser = Template.parentData(1).username,
      currentRoom = Template.parentData(1).roomId,
      currentRound = Teams.findOne({room: currentRoom}).round,
      currentTeam, missingPlayers;

    Session.set({'choice': points});
    existingVote = Votes.findOne({room: currentRoom, round: currentRound, username: currentUser});
    if (typeof existingVote === 'undefined') {
      Votes.insert({room: currentRoom, round: currentRound, username: currentUser, points: points});
      currentTeam = Teams.findOne({room: currentRoom});
      Teams.update(currentTeam._id, {$set: {voteCount: currentTeam.voteCount + 1, points: points}});
    }
    else {
      Votes.update(existingVote._id, {$set: {points: points}});
    }
  }
});
Template.card.helpers({
  'isSelected': function () {
    return Session.get('choice') === this.value;
  }
});

// vote template
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
  'waiting': function () {
    var waiting = Session.get('missingPlayers');
    if (typeof waiting === 'undefined') return true;
    return waiting.length > 0;
  },
  'missingPlayers': function () {
    var missingPlayers = Session.get('missingPlayers');
    if (typeof missingPlayers === 'undefined') {
        missingPlayers = getMissingPlayers();
    }
    return missingPlayers;
  }
});

// players template
Template.players.helpers({
  'players': function () {
      var team = Teams.findOne({room: Template.parentData(1).roomId});
      if (typeof team !== 'undefined' && team.participants) {
          return team.participants;
      }
      else {
          return [];
      }
  }
});
Template.player.helpers({
    'hasChosen': function () {
        var round, vote;
        round = getRound();
        vote = getVote(this.toString());
        if (typeof vote !== 'undefined') {
            return true;
        }
        else return false;
    },
    'points': function () {
        vote = getVote(this.toString());
        if (typeof vote === 'undefined') {
            return undefined;
        }
        else return vote.points;
    }
});
Template.play.helpers({
  'currentRound': function () {
    var currentRound = getRounds().fetch()[0];
    if (typeof(currentRound) === 'undefined') {
        return 0;
    } else {
        return currentRound.round + 1;
    }
  }
});
