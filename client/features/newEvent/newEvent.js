Template.newEvent.onRendered(function() {
    //create time picker
    $('#startTime').lolliclock({autoclose:true});
    $('#endTime').lolliclock({autoclose:true});
});

Template.newEvent.events({
    'click .submit': function (event) {
        event.preventDefault();
        var formValidationRules = {
            on: 'blur',
            fields: {
                startTime: {
                    identifier: 'startTime',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Please enter start time'
                        }
                    ]
                },
                endTime: {
                    identifier: 'endTime',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Please enter an end time'
                        }
                    ]
                },
                place: {
                    identifier: 'place',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Please enter a location'
                        }
                    ]
                }
            }
        }
        var formSettings = {
            onSuccess : function (event) {

            }
        };

        $("form[name='newEventForm']").form(formValidationRules, formSettings);
        $("form[name='newEventForm']").submit();
    }
});

Template.newEvent.rendered = function () {
    $(document)
        .on("submit", "form[name='newEventForm']", function (event) {
            event.preventDefault();
            var joinDate = new Date();
            var newParticipant = getDisplayName();
            var newComment = {user: newParticipant, date: joinDate, displayDate: dateToTime(joinDate), canModify: false, message: newParticipant + " created event at: " + dateToTime(joinDate)};

            var event ={
                place: $("#place").val(),
                startTime: timeToDate($("#startTime").val()),
                startTimeDisplay: $("#startTime").val(),
                endTime: timeToDate($("#endTime").val()),
                endTimeDisplay: $("#endTime").val(),
                notes: $("#notes").val(),
                createdAt: joinDate,
                participants : [newParticipant],
                comments: [newComment]
            };

            if (getDisplayName()=="Guest") {
                showDisplayNameModal(event);
            }
            else {
                insertEvent(event,newParticipant);
            }

            //clear form
            $("#place").val("");
            $("#startTime").val("");
            $("#endTime").val("");
            $("#notes").val("");





    });
};
