Meteor.publish("client", function(userId) {
  this.onStop(function(){
    PlayersList.remove(userId);
  });
});
