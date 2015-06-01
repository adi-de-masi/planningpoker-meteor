Template.join.events({
  'submit #login': function (e, template) {
    var username = e.target.username.value;

    e.preventDefault();
	TeamsList.insert({room: template.data.roomId, round:0, participantCount:0, voteCount:0});
    Router.go('/' + template.data.roomId + '/' + username);
  }
});
