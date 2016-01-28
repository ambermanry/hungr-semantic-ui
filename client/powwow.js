Template.powwow.onRendered(function() {
    //create time picker
    $('#startTime').lolliclock({autoclose:true});
    $('#endTime').lolliclock({autoclose:true});
});

Template.powwow.events({
    'click .submit': function(event){
        event.preventDefault();
        console.log("submit clicked");
        Suggestions.insert({
            place: $("#place").val(),
            startTime: $("#startTime").val(),
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