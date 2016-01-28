// Define a collection to hold our suggestions
Suggestions = new Mongo.Collection("suggestions");
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
