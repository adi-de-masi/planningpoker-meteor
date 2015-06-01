Template.players.events({
    'submit #players': function (e) {
        e.preventDefault();
        var userId;
        var username = e.target.username.value,
          user = PlayersList.findOne({name:username});

        if(user===undefined){
          userId = PlayersList.insert({name: username});
        }else{
          userId = user._id;
        }

        Meteor.subscribe("client", userId);
        Session.setPersistent({username: username});
    }
});
Template.players.helpers({
    'players': function () {
        return PlayersList.find();
    },
    'features': function () {
        return FeaturesList.find();
    }
});
