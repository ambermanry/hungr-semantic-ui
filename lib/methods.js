if(Meteor.isServer) {
    Meteor.methods({
        'getDisplayName':function () {
            var name = "Guest";
            if(Meteor.user()) {
                name = "";
                var user = Meteor.user().profile;
                var settings = user.settings;
                if(settings.display.display) {
                    name = user.name.display;
                } else {
                    if(settings.display.first) 
                        name += user.name.first + " ";
                    if(settings.display.last)
                        name += user.name.last;
                }
            } 
            return name;
        }
    });
}