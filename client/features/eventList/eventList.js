Template.eventList.events({
    "click .icon.delete": function (event) {
        event.preventDefault();
        Events.remove(event.target.getAttribute("data-id"));
    },
    "click .ui.button.join": function (event) {
        var eventId = event.target.getAttribute("data-id");
        var newParticipant = prompt("Who are you?");
        if(newParticipant != null) {
            var participants = Events.find({_id: eventId}).fetch()[0].participants;
            participants.push(newParticipant);
            Events.update(eventId, {$set :{participants : participants}});
        }
    }
});