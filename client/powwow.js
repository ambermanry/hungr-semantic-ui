Template.powwow.onRendered(function() {
    //this.$('.datetimepicker').datetimepicker();
    $('#startTime').lolliclock({autoclose:true});
    $('#endTime').lolliclock({autoclose:true});
});