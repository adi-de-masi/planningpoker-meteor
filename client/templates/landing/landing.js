Template.landing.helpers({
  newRoom: function(){
    return new Mongo.ObjectID().toHexString();
  }
});