Template.results.helpers({
  votes:function(){
    return VotesList.find();
  },
  allVotesSubmitted: function(){
    var retVal = PlayersList.find().count() === VotesList.find().count();
    console.log(retVal);
    return retVal?'visible':'invisible';
  }

});