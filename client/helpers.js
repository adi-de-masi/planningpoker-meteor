var usernameEntered = function () {
   return Session.get('username') !== undefined;
};
Template.registerHelper('usernameEntered', function () {
    return usernameEntered() ? 'invisible' : 'visible';
});
Template.registerHelper('voteVisible', function () {
    return usernameEntered() ? 'visible' : 'invisible';
});
Template.registerHelper('currentUser', function() {
  return Template.currentData().username;
});
Template.registerHelper('isChosen', function(username){
  var username = Template.currentData().username,
  roomId = Template.currentData().roomId;
  return VotesList.findOne({'roomId': roomId, 'username': username}) !== undefined;
});
