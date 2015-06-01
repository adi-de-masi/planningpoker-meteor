if(Meteor.isServer) {
	var currentTeam = TeamsList.find();
	currentTeam.observe({
		changed: function(team) {
			var votes,
				results = [];
			//Increment round and set votes to 0 if all participants have voted
			if(team.participantCount !== 0 && team.participantCount === team.voteCount) {
                console.log('haeeee');
				votes = VotesList.find({room: team.room});
                votes.forEach(function (item) {
                    var newRecord = {
						username: item.username,
						points: item.points
					};
                    console.log('inserting vote: ', newRecord);
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
