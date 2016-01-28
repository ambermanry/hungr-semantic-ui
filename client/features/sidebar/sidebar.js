if(Meteor.isClient) {
    Template.navbar.events({
        'click .header.item' : function () {
            $('#sidebar')
                .sidebar('toggle');
        },
    });
}
