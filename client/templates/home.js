Template.players.events({
    'submit #players': function (e) {
        e.preventDefault();
        var username = e.target.username.value,
          user = PlayersList.find({name:username}).fetch();

        if(user.length===0){
          PlayersList.insert({name: username});
        }

        Session.set({username: username});
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
