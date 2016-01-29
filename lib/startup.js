if (Meteor.isServer) {
	Meteor.startup(function () {
		// Code to run on server at startup
        Events._ensureIndex({createdAt: 1}, {expireAfterSeconds: 60*60*24});
	});
}
