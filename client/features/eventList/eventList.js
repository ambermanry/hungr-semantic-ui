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
    "click .icon.add.user": function (event) {
        //join an event
        var eventId = event.target.getAttribute("data-id");
        var newParticipant = prompt("Who are you?");
        if(newParticipant != null) {
            var participants = Events.find({_id: eventId}).fetch()[0].participants;
            participants.push(newParticipant);
            Events.update(eventId, {$set :{participants : participants}});
            //add comment to Event
            var joinDate = new Date();
            var comments = Events.find({_id: eventId}).fetch()[0].comments;
            var newComment = {user: newParticipant, date: dateToTime(joinDate), canModify: false, message: newParticipant + " joined at: " + dateToTime(joinDate)};
            comments.push(newComment);
            Events.update(eventId, {$set :{comments : comments}});
            //add event to user object
        }

    },
    "click [name='addComment']": function (event) {
        event.preventDefault();
        var eventId = event.target.getAttribute("data-event-id");

        if ($(".newcomment, #" + eventId).val()!==null && $(".newcomment, #" + eventId).val()!=="") {
            //add comment to Event
            var joinDate = new Date();
            var comments = Events.find({_id: eventId}).fetch()[0].comments;
            var newComment = {user: Session.getDisplayName, date: dateToTime(joinDate), canModify: true, message: $(".newcomment, #" + eventId).val()};
            comments.push(newComment);
            Events.update(eventId, {$set :{comments : comments}});
            //clear textarea
            $(".newcomment, #" + eventId).val("");
        }
    }

});

Template.eventList.rendered = function () {
    $('.ui.accordion').accordion();
};