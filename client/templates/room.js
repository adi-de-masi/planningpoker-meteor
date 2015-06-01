Template.room.events({
  'submit #login': function (e) {
    e.preventDefault();
    var userId;
    var username = e.target.username.value,
      user = PlayersList.findOne({name: username});

    if (user === undefined) {
      userId = PlayersList.insert({name: username});
    } else {
      userId = user._id;
    }

    Meteor.subscribe("client", userId);
    Router.go('/' + template.data.roomId + '/' + username);
  }
});