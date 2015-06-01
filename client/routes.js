Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('landing');
});

Router.route('/:roomId', function () {

  var roomId = this.params.roomId;

  this.render('join', {
    data: function () {
      return {roomId: roomId};
    }
  });
});

Router.route('/:roomId/:username', function () {

  var username = this.params.username,
    roomId = this.params.roomId,
    user = PlayersList.findOne({name: username}),
    userId = (user === undefined) ? PlayersList.insert({roomId: roomId, name: username}) : user._id;

  Meteor.subscribe("client", userId);

  this.render('play', {
    data: function () {
      return {
        roomId: roomId,
        username: username,
        players: PlayersList.find({roomId: roomId}),
        votes: VotesList.find({roomId: roomId})
      };
    }
  });
});
