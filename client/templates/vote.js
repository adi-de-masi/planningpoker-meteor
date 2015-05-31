Template.card.events({
  'click': function (e,template) {
      var existingVote, points = template.data.value,
      currentUser = Session.get('username');
      Session.set({'choice': points});
      existingVote = VotesList.findOne({username: currentUser});
      if (typeof existingVote === 'undefined') {
        VotesList.insert({username:currentUser, points:points});
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
