Template.powwow.onRendered(function() {
    //this.$('.datetimepicker').datetimepicker();
    $('#pick-a-time').lolliclock({autoclose:true});
});

Template.hello.events({
    'click button': function () {
        // increment the counter when button is clicked
        Session.set('counter', Session.get('counter') + 1);
    }
});