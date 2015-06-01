Template.room.events({
  'submit #login': function (e, template) {
    var username = e.target.username.value;

    e.preventDefault();

    Router.go('/' + template.data.roomId + '/' + username);
  }
});