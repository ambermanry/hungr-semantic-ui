// Define a collection to hold our suggestions
Events = new Mongo.Collection("events");
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
