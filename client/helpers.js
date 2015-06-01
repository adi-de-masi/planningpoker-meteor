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
