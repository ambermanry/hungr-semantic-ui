Template.newEvent.onRendered(function() {
    //create time picker
    $('#startTime').lolliclock({autoclose:true});
    $('#endTime').lolliclock({autoclose:true});
});

Template.newEvent.events({
    'click .submit': function(event){
        event.preventDefault();
        console.log("startTime:" + timeToDate($("#startTime").val()));
        Events.insert({
            place: $("#place").val(),
            startTime: timeToDate($("#startTime").val()),
            startTimeDisplay: $("#startTime").val(),
            endTime: $("#endTime").val(),
            notes: $("#notes").val(),
            createdAt: new Date(),
            participants : [prompt("Who are you?")]
        });
    }
});

//$('.ui.form')
//    .form({
//        fields: {
//            startTime     : 'empty',
//            endTime   : 'empty',
//            place : 'empty'
//        }
//    })
//;

//$('.ui.form')
//    .form({
//        on: 'blur',
//        fields: {
//            startTime: {
//                identifier  : 'startTime',
//                rules: [
//                    {
//                        type   : 'empty',
//                        prompt : 'Please enter start time'
//                    }
//                ]
//            },
//            endTime: {
//                identifier  : 'endTime',
//                rules: [
//                    {
//                        type   : 'empty',
//                        prompt : 'Please enter an end time'
//                    }
//                ]
//            },
//            place: {
//                identifier  : 'place',
//                rules: [
//                    {
//                        type   : 'empty',
//                        prompt : 'Please enter a location'
//                    }
//                ]
//            }
//        }
//    })
//;