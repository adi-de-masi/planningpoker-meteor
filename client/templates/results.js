Template.results.helpers({
  votes:function(){
    return VotesList.find();
  },
  displayResults: function(){
    var retVal = PlayersList.find().count() === VotesList.find().count();
    return retVal?'visible':'invisible';
  }

});