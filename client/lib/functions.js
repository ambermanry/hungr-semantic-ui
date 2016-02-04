//client side functions
//Get the time
timeToDate= function(time) {
    var d = new Date(),
        month = d.getMonth()+1,
        year = d.getFullYear(),
        day = d.getDate();
    var parts = time.split(':');
    if (parts.length === 2){
        var hours = +parts[0];
        var minAM = parts[1].split(' ');
        if (minAM.length === 2) {
            var mins = minAM[0];
            if (minAM[1] === 'PM') hours += 12;
            return new Date(year, month, day, hours, mins);
        }
    }
    return new Date('x');
};

dateToTime = function(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
};

//findAndRemove from a json array based on 2 properties
findAndRemove = function(array, prop1, value1, prop2, value2) {
    array.forEach(function(result, index) {
        if(result[prop1] === value1 && result[prop2].toString() === value2) {
            //Remove from array
            array.splice(index, 1);
        }
    });
};

//Create new Guest Record and save id in localstorage
createGuest = function(displayName) {
    var id;
    var guest = {
        displayName: displayName,
        events: []
    };

    Guests.insert(guest, function(error,docInserted) {
        console.log("in guest insert cb");
        //TODO figure out whay Session and localStorage is out of scope!
        //Session.set("guestId", docInserted);
        window.localStorage.setItem("guestId", docInserted);
    });

};

addEventToGuest = function(eventId, guestId) {
    var currentEvents = Guests.find({_id: guestId}).fetch()[0].events;
    var newEvents = currentEvents.push(eventId);
    Guests.update(guestId, {$set :{events : newEvents}});
};

insertEvent = function (event,displayName) {
    //create guest record
    createGuest(displayName);

    Events.insert(event, function(error,docInserted) {
        var guestId = localStorage.get("guestId");
        addEventToGuest(docInserted,guestId);
    });
};

hasGuestChangedName = function() {
    if (Session.get("userType")=="guest" && Session.get("hasChangedDisplay")==true) {
        return true;
    } else return false;
}

getDisplayName = function() {
    if (Session.get("userType")=="guest" && (typeof localStorage.getItem("guestId") !== undefined)) {
        var guestId = localStorage.getItem("guestId");
        return Guests.find({_id: guestId}).fetch()[0].displayName;
    } //else if guest and localstorage is not set
    else  {
        return Session.get("displayName");
    }
}

showDisplayNameModal = function(action,event) {
    $('.modal[name="displayNameModal"]').modal({
        onDeny : function () {
            console.log("cancel");
            $('.modal[name="displayNameModal"]').modal('hide');
        },
        onApprove : function () {
            console.log("yes, entered user name:" + $("#newDisplayName").val());
            var newParticipant = $("#newDisplayName").val();
            // create new event
            // = [prompt("Who are you?")];

            Session.set("displayName", newParticipant);
            Session.set("hasChangedDisplay",true);
            switch($(this).data("method")) {
                case 'createEvent' :
                    event.participants = [newParticipant];
                    insertEvent(event,newParticipant);
                    break;
                case 'joinEvent':
                    break;
                case 'comment':
                    break;
            };

            $('.modal[name="displayNameModal"]').modal('hide');
        }
    })
    .modal('show');
}