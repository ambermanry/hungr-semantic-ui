// This code only runs on the client
Template.body.helpers({
    events: function () {
        return Events.find({}, {sort: {startTime: 1}});
    }
});