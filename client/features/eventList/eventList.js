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
        var newParticipant = getDisplayName();
        var event = Events.find({_id: eventId}).fetch()[0];

        if (getDisplayName()=="Guest") {
            showDisplayNameModal("joinEvent",event);
            Session.set("displayName", newParticipant);
            Session.set("hasChangedDisplay", true);
        }
        else {
            joinEvent(eventId,newParticipant);
        }

    },
    "click [name='addComment']": function (event) {
        event.preventDefault();
        var eventId = event.target.getAttribute("data-event-id");

        if ($("textarea[data-event-id='" + eventId + "']").val() !== "") {
            //add comment to Event
            var commentDate = new Date();
            var comments = Events.find({_id: eventId}).fetch()[0].comments;
            var newParticipant;
            if (!hasGuestChangedName()) {
                newParticipant = prompt("Who are you?");
                Session.set("displayName", newParticipant);
                Session.set("hasChangedDisplay", true);
                createGuest(newParticipant);
            } else {
                newParticipant = getDisplayName();
            }
            var newComment = {user: newParticipant, date: commentDate, displayDate: dateToTime(commentDate), canModify: true, message: $("textarea[data-event-id='" + eventId + "']").val()};
            comments.push(newComment);
            Events.update(eventId, {$set :{comments : comments}});
            //clear textarea
            $("textarea[data-event-id='" + eventId + "']").val("");

        }
    },
    //delete comment
    "click [name='deleteComment']": function (event) {
        event.preventDefault();
        //grab event id from the Comments header
        var eventId = $(event.target).closest(".comments").data("event-id");
        var user = event.target.getAttribute("data-user");
        var date = event.target.getAttribute("data-date");
        var comments = Events.find({_id: eventId}).fetch()[0].comments;
        findAndRemove(comments, "user", user, "date", date);
        Events.update(eventId, {$set :{comments : comments}});

    }

});

Template.eventList.rendered = function () {
    $('.ui.accordion').accordion();
    $('.button')
        .popup({
            inline: true
        })
    ;
    $('.popup')
        .popup({
            inline: true
        })
    ;
};