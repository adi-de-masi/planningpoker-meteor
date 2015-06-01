var currentTeam = TeamsList.find();
if(Meteor.isServer) {
	currentTeam.observe({
		changed: function(team) {
			var votes,
				results = [];
			//Increment round and set votes to 0 if all participants have voted
			if(team.participantCount !== 0 && team.participantCount === team.voteCount) {
				votes = VotesList.find({room: team.room, round: team.round});
                votes.forEach(function (item) {
                    var newRecord = {
						username: item.username,
						points: item.points
					};
					results.push(newRecord);
                });
				RoundsList.insert({
					room: team.room,
					round: team.round,
					results: results
				});

				TeamsList.update(team._id, {$set: {round: team.round + 1, voteCount: 0}});
			}
		}
	});
}
if(Meteor.isClient) {
	currentTeam.observe({
		changed: function(team) {
			if(team.participantCount !== 0 && team.participantCount === team.voteCount) {
                Session.set('choice', undefined);
            }
        }
    });
}
