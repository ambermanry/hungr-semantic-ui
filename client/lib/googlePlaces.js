
window.onload = function() {
    var autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('place')),{types: ['establishment','geocode'] }
    );
};