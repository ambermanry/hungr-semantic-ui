if(Meteor.isClient) {
    // Events
    Template.navbar.events({
        "click a[name='logout']" : function (event) {
            event.preventDefault();
            
            console.log(Meteor.userId());
            
            Meteor.logout();
        },
        'click #account' : function (event) {
            $('#account').dropdown({
                transition : 'drop', 
            });
        }
    });
    
    // Helpers
    Template.navbar.helpers({
        
    });
}