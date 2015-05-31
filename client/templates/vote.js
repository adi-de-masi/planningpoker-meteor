Template.vote.events({
  'submit #vote': function (e) {

    var form = e.target,
      currentUser = Session.get('username'),
      points = form.points.value;

    e.preventDefault();

    VotesList.insert({username:currentUser, points:points});
  }
});