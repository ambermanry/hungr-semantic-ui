if(Meteor.isClient) {
    Template.guestMessage.rendered = function() {
        Meteor.call('getDisplayName', function (error, result){
            Session.set('userType','guest');
            Session.set('displayName',result);
        });
    };
    
    Template.guestMessage.events({
        'click .message .close' : function (event) {
            $(event.target).closest('.message').transition('fade');
        }
    });
    
    Template.guestMessage.helpers({
        guestName : function () {
            return Session.get('displayName');
        },
    });
}