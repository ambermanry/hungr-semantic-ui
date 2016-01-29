Template.eventList.events({
    "click .icon.delete": function (event) {
        event.preventDefault();
        Events.remove(event.target.getAttribute("data-id"));
    }
});