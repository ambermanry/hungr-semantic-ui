if(Meteor.isClient){
	Template.lunchroom.helpers({
    		'events' : function () {
                var start = new Date();
                start.setHours(0,0,0,0);
                var end = new Date();
                end.setHours(23,59,59,999);
                return Events.find({"createdAt":{ "$gte":start, "$lt":end}},{sort: {startTime: 1}});
        		//return Events.find({}, {sort: {startTime: 1}});
    	}
	});
}
