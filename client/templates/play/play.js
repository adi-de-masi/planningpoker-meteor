// reusable methods
var getRound = function (roomId) {
    return Rounds.findOne({room: roomId}, {sort: {round: -1}});
};
var getRounds = function (roomId) {
  return Rounds.find({room: roomId}, {sort: {round: -1}, limit: 1});
};

var getActualPlayers = function (roomId) {
    var team = Teams.findOne({room: roomId}),
        votes,
        result = [];
    if (typeof team !== 'undefined') {
        votes = Votes.find({room: roomId, round: team.round}).fetch();
        for (var i = 0; i < votes.length; i++) {
            result.push(votes[i].username);
        }
    }
    return result;
};

var getVote = function (username) {
    var roundRecord = getRound(Template.parentData(0).roomId),
      round;
    if(typeof roundRecord === 'undefined') {
      round = 0;
    }
    else {
      round = roundRecord.round + 1;
    }

    return Votes.findOne({room: Template.parentData(0).roomId, round: round, username: username});
};
    
        

// rounds template
Template.rounds.helpers({
    'rounds': function () {
        return getRounds(this.roomId);
    }
});

// card template
Template.card.events({
  'click': function (e, template) {
    var existingVote, points = template.data.value,

      currentUser = template.data.currentUser,
      currentRoom = template.data.currentRoom,
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
Template.availableCards.helpers({
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
    var currentRound = getRound(this.roomId);
    if (typeof(currentRound) === 'undefined') {
        return 0;
    } else {
        return currentRound.round + 1;
    }
  }
});

// players template
Template.players.helpers({
  'players': function () {
      var team = Teams.findOne({room: this.roomId});
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
        round = Teams.findOne({room: this.roomId}).round;
        vote = Votes.findOne({room: this.roomId, round: round, username: this.username});
        if (typeof vote !== 'undefined') {
            return true;
        }
        else return false;
    },
    'points': function () {
        var vote = getVote(this.username);
        if (typeof vote === 'undefined') {
            return undefined;
        }
        else return vote.points;
    },
    'isMyCard': function() {
        return this.username === Template.parentData(3).username;
    }
});
Template.play.helpers({
  'currentRound': function () {
    var currentRound = getRound(Template.parentData(1).roomId);
    if (typeof(currentRound) === 'undefined') {
        return 0;
    } else {
        return currentRound.round + 1;
    }
  }
});
