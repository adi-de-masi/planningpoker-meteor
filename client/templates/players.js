
Template.players.helpers({
  'players': function () {
    return PlayersList.find();
  },
  'features': function () {
    return FeaturesList.find();
  }
});
