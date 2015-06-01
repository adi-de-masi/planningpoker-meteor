Template.results.helpers({
  displayResults: function(){
    var retVal = PlayersList.find({roomId:this.roomId}).count() === VotesList.find({roomId:this.roomId}).count();
    return retVal?'visible':'invisible';
  }

});