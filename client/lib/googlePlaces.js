
$(document).ready(function () {
    //TODO:  This is a hack, sorry
    Meteor.setTimeout(function() {
        var autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('place')),{types: ['establishment','geocode'] }
        );
    }, 100);

});