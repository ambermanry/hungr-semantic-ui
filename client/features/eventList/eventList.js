Template.eventList.events({
    "click .icon.delete": function (event) {
        event.preventDefault();
        $('.modal[name="deleteModal"]').modal({
            onDeny : function () {
                console.log("no don't delete");
                $('.modal[name="deleteModal"]').modal('hide');
//                return false;
            },
            onApprove : function () {
                console.log("yes, delete");
                Events.remove(event.target.getAttribute("data-id"));
                $('.modal[name="deleteModal"]').modal('hide');
//                return false;
            }

        })
        .modal('show');

    },
    "click .icon.users": function (event) {
        var eventId = event.target.getAttribute("data-id");
        var newParticipant = prompt("Who are you?");
        if(newParticipant != null) {
            var participants = Events.find({_id: eventId}).fetch()[0].participants;
            participants.push(newParticipant);
            Events.update(eventId, {$set :{participants : participants}});
        }
        var joinDate = new Date();
        var comments = Events.find({_id: eventId}).fetch()[0].comments;
        var newComment = {user: newParticipant, date: joinDate, message: newParticipant + " joined at: " + joinDate.getHours() + ":" + joinDate.getMinutes()};
        comments.push(newComment);
        Events.update(eventId, {$set :{comments : comments}});
    }
});

Template.eventList.rendered = function () {
    $('.ui.accordion').accordion();
};