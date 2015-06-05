Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
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
    subscriptions: function () {
      var username = this.params.username,
        roomId = this.params.roomId;

      if(username.length >4) {
        username = username.substring(0,3);
      }

      return Meteor.subscribe("room", username, roomId);
    },

    data: function () {
      var username = this.params.username,
        roomId = this.params.roomId;

      if(username.length >4) {
        username = username.substring(0,3);
      }

      return {
        roomId: roomId,
        username: username,
        players: Teams.find({roomId: roomId}).participants,
        votes: Votes.find({roomId: roomId})
      };
    }

  });


