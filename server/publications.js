Meteor.publish("client", function(userId) {
  this._session.socket.on("close", Meteor.bindEnvironment(function() {
    PlayersList.remove(userId);
  }));
});
