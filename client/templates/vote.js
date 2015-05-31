Template.card.events({
  'submit #vote': function (e) {

    var form = e.target,
      currentUser = Session.get('username'),
      points = form.points.value;

    e.preventDefault();

    VotesList.insert({username:currentUser, points:points});
  },
  'click': function (e,template) {
      Session.set({'choice': template.data.value});
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
