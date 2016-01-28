if(Meteor.isClient){
    Template.loginMessage.rendered = function() {
        Meteor.call('getDisplayName', function (error, result){
            Session.set('userType', 'registered');
            Session.set('displayName',result);
        });
    };
    
    Template.loginMessage.events({
        'click .message .close' : function (event) {
            $(event.target).closest('.message').transition('fade');
        }
    });
    
    Template.loginMessage.helpers({
        'displayName' : function () {
            return Session.get('displayName');
        }
    });
    
}