var map;
var infowindow;

jQuery(document).ready(function(){

    var whoButton = $('#who_button');
    var whereButton = $('#where_button');
    var whatButton = $('#what_button');
    var goButton = $('#go_button');

    var what = $('#What');
    var where = $('#Where');
    var who = $('#Who');


    showSection(where);
    setActive(whereButton);
    
    whereButton.on('click', function(){
        showSection(where);
        setActive(this);
    });
    
    whatButton.on('click', function(){
        showSection(what);
        setActive(this);
    });
        
    whoButton.on('click', function(){
        showSection(who);
        setActive(this);
    });

    goButton.on('click', function(){
        var foodType= $(this).closest('section').find('fieldset').children(':radio:checked').val();



        showSection(where);
        setActive(whereButton);

    });

initMap();


});



function setActive(button){
    $('nav').find('button').css('background-color', 'lightgrey');
    $(button).css('background-color', 'palegreen');
}

function showSection(section){
    $('section').hide();
    section.show();
}


function initMap() {
    var pyrmont = {lat: -33.867, lng: 151.195};
    var map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont, //<-------- !!
        zoom: 18
    });
    infowindow = new google.maps.InfoWindow();


    // Try HTML5 geolocation.
    /*if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }*/

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: pyrmont, //<----- !!
        radius: 500,
        types: ['restaurant']
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            var restaurant = $('<p>'+results[i].name+'</p>');
            $('#Who').append(restaurant);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
/*
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}


*/



