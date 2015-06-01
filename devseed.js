if(Meteor.isServer) {
	console.log('server devseed');

	var currentTeam = TeamsList.find();
	currentTeam.observe({
		changed: function(team) {
			console.log('changed');
			var votes,
				results = [];
            console.log(team);
			//Increment round and set votes to 0 if all participants have voted
			if(team.participantCount !== 0 && team.participantCount === team.voteCount) {
				votes = VotesList.find({room: team.room});
				for(var i=0; i<votes.length; i++) {
					results.push({
						username: votes[i].username,
						points: votes[i].points
					});
				}

				RoundsList.insert({
					room: team.room,
					round: team.round,
					results: results
				});

				TeamsList.update(team._id, {$set: {round: team.round++, voteCount: 0}});
			}
		}
	});
}
