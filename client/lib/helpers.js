if(Meteor.isClient){
	Template.lunchroom.helpers({
    		'events' : function () {
        		return Events.find({}, {sort: {startTime: 1}});
    	}
	});
}
