Template.powwow.onRendered(function() {
    //this.$('.datetimepicker').datetimepicker();
    $('#start-time').lolliclock({autoclose:true});
    $('#end-time').lolliclock({autoclose:true});
});