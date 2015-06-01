Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('enter');
});

Router.route('/:roomId', function () {
  this.render('room', {
    data: function () { return {}; }
  });
});
