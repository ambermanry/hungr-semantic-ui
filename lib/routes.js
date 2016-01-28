var OnBeforeActions;

OnBeforeActions = {
    loginRequired : function (pause) {
        if(!Meteor.userId()){
            this.render('home');
            return pause();
        }
    }
};

Router.configure({
    layoutTemplate : 'layoutTemplate'
});

/*Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only : ['profile','lunchroom','lunchroomDisplay'],
});*/

Router.route('/', {
    name : 'home',
    template : 'home',
    fastRender: true,
});

Router.route('/profile', {
    name : 'profile',
    template : 'profile',
    fastRender : true,
    waitOn : function () {
        // Subscriptions here
    }
});

Router.route('/lunchroom', {
    name : 'lunchroom',
    template : 'lunchroom',
    fastRender : true,
    waitOn : function () {
        // Subscriptions here   
    }
});


Router.route('/lunchroom/:_id', {
    name : 'lunchroomDisplay',
    template : 'lunchroomDisplay',
    data : function () {
        var room = this.params._id;
        return Lunchrooms.findOne({_id : room});
    },
    fastRender : true,
    waitOn : function () {
        // Subscriptions here   
    }
});