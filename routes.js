Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('enter');
});

Router.route('/:roomId', function () {
  this.render('room', {
    data: function () { return {roomId: this.params.roomId}; }
  });
});

Router.route('/:roomId/:username', function () {
  this.render('voting', {
    data: function () { return {roomId: this.params.roomId, username:this.params.username}; }
  });
});
