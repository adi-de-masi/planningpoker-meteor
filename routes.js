Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('enter');
});

Router.route('/:roomId', function () {
  this.render('room', {
    data: function () {
      return {roomId: this.params.roomId};
    }
  });
});

Router.route('/:roomId/:username', function () {

  var username = this.params.username,
    roomId = this.params.roomId,
    user;

  user = PlayersList.findOne({name: username});

  if (user === undefined) {
    userId = PlayersList.insert({roomId: roomId, name: username});
  } else {
    userId = user._id;
  }

  Meteor.subscribe("client", userId);

  this.render('voting', {
    data: function () {
      return {roomId: roomId, username: username, players: PlayersList.find({roomId: this.params.roomId})};
    }
  });
});
