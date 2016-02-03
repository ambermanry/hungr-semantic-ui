if(Meteor.isClient) {
    // Events
    Template.navbar.events({
        "click a[name='logout']" : function (event) {
            event.preventDefault();            
            Meteor.logout();
        },
        'click #account' : function (event) {
            $('#account').dropdown({
                transition : 'drop', 
            });
        },
        'click .header.item' : function () {
            Router.go('home');
        },
        'keyup [name="displayName"]' : function (event) {
            if(event.which == 27 || event.which == 13) {
                $(event.target).blur();   
            }

            var displayName = $(event.target).val();
            Session.set('displayName', displayName);
        }
    });
    
    
    // Helpers
    Template.navbar.helpers({
        
    });
}