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
        var newParticipant = Session.get("displayName");

        if (Session.get("userType")=="guest" && (!Session.get("hasChangedDisplay") || typeof Session.get("hasChangedDisplay")=="undefined")) {
            newParticipant= prompt("Who are you?");
        }
        if(newParticipant != null) {
            var participants = Events.find({_id: eventId}).fetch()[0].participants;
            participants.push(newParticipant);
            Events.update(eventId, {$set :{participants : participants}});
            //add comment to Event
            var joinDate = new Date();
            var comments = Events.find({_id: eventId}).fetch()[0].comments;
            var newComment = {user: newParticipant, date: joinDate, displayDate: dateToTime(joinDate), canModify: false, message: newParticipant + " joined at: " + dateToTime(joinDate)};
            comments.push(newComment);
            Events.update(eventId, {$set :{comments : comments}});
            //add event to user object
            if (Session.get("userType")=="guest" && (!Session.get("hasChangedDisplay") || typeof Session.get("hasChangedDisplay")=="undefined")) {
                Session.set("displayName", newParticipant);
                Session.set("hasChangedDisplay", true);
            }
        }

    },
    "click [name='addComment']": function (event) {
        event.preventDefault();
        var eventId = event.target.getAttribute("data-event-id");

        if ($(".newcomment, #" + eventId).val()!==null && $(".newcomment, #" + eventId).val()!=="") {
            //add comment to Event
            var commentDate = new Date();
            var comments = Events.find({_id: eventId}).fetch()[0].comments;
            var newParticipant;
            if (Session.get("userType")=="guest" && (!Session.get("hasChangedDisplay") || typeof Session.get("hasChangedDisplay")=="undefined")) {
                newParticipant = prompt("Who are you?");
                Session.set("displayName", newParticipant);
                Session.set("hasChangedDisplay", true);
            } else {
                newParticipant = Session.get("displayName");
            }
            var newComment = {user: newParticipant, date: commentDate, displayDate: dateToTime(commentDate), canModify: true, message: $(".newcomment, #" + eventId).val()};
            comments.push(newComment);
            Events.update(eventId, {$set :{comments : comments}});
            //clear textarea
            $(".newcomment, #" + eventId).val("");

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