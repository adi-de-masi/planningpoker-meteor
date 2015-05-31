Template.players.events({
    'submit #players': function (e) {
        e.preventDefault();
        var username = e.target.username.value;
        PlayersList.insert({name: username});
        Session.set({username: username});
    },
    'submit #features': function (e) {
        e.preventDefault();
        FeaturesList.insert({name: e.target.feature.value});
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
