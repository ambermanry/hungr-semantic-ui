//client side functions
//Get the time
timeToDate= function(time) {
    var d = new Date(),
        month = d.getMonth()+1,
        year = d.getFullYear(),
        day = d.getDate();
    var parts = time.split(':');
    if (parts.length === 2){
        var hours = +parts[0];
        var minAM = parts[1].split(' ');
        if (minAM.length === 2) {
            var mins = minAM[0];
            if (minAM[1] === 'PM') hours += 12;
            return new Date(year, month, day, hours, mins);
        }
    }
    return new Date('x');
};