if(Meteor.isServer) {
    Meteor.methods({
        'getDisplayName':function () {
            var name = "";
            if(Meteor.user()) {
                var user = Meteor.user().profile;
                var settings = user.settings;
                if(settings.display.display) {
                    name = user.profile.name.display;
                } else {
                    if(settings.display.first) 
                        name += user.name.first + " ";
                    if(settings.display.last)
                        name += user.name.last;
                }
                console.log(name);
                return name;
            } else {
                return 'Homer J. Simpson';
            }
        }
    });
}