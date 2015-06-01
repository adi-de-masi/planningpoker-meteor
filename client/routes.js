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

Router.route('/:roomId/:username',
  {
    template: "play",
    subscriptions: function() {
      var username = this.params.username,
        roomId = this.params.roomId;
      return Meteor.subscribe("room", username, roomId);
    },

    data: function () {
      var username = this.params.username,
        roomId = this.params.roomId;
      return {
        roomId: roomId,
        username: username,
        players: PlayersList.find({roomId: roomId}),
        votes: VotesList.find({roomId: roomId})
      };
    }

  });


