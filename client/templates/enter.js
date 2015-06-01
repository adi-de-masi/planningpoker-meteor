Template.enter.helpers({
  randomLinks: function(){
    return new Mongo.ObjectID().toHexString();
  }
});