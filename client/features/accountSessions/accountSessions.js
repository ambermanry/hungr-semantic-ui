if(Meteor.isClient) {    
    var setupSessions = function () {
        var now = new Date();

        if(!Meteor.userId() && !Session.get('userType')) {
            Session.set('userType','guest');
        } else {
            // Sanity check on userTypes
            if(Session.get('userType') != 'registered') {
                delete Session.keys['userType'];
            }
        }
        Meteor.call('getDisplayName', function(error, result){
                                                        if(!error)
                                                            Session.set('displayName',result);
                                                    });
        Session.set('lastActivity', Session.get('currentActivity') || now);
        Session.set('currentActivity', now);
        
    };
    
    Template.accountSession.rendered = function () {
        setInterval(setupSessions,50);  
    };
    
    Template.accountSession.events({
        
    });
    
    Template.accountSession.helpers({
        'updateSession' : function () {
              
        },
        'newGuest' : function () {
            var newGuest = (Session.get('userType') == 'guest' && Session.get('newGuest')=='true');   
            if(newGuest) {
                delete Session.keys['newGuest'];   
            }
            return newGuest;
        }
    });
    
    Template.statusMessage.events({
        'click .message .close' : function (event) {
            $(event.target).closest('.message').transition('fade');
        },
    });
    
    Template.statusMessage.helpers({
        'displayName' : function () {
            return Session.get('displayName');
        }
    });
    
}