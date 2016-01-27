GoogleMaps.init({
    'key': 'AIzaSyBIaUQmTt_4jtu8zFDI2n4bDz3aBKzwx-0', //optional
    'language': 'en',  //optional
    'libraries': 'places'
});

window.onload = function() {
    var autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('place')),{types: ['establishment','geocode'] }
    );
};