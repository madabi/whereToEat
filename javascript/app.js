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
    var map;
    var pyrmont;
    var service;

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
        console.log(foodType);
        showSection(where);
        setActive(whereButton);
        if(document.getElementById('it').checked) {
            initMap('italienisch');
        } else if (document.getElementById('ch').checked) {
            initMap('chinesisch');
        } else if(document.getElementById('in').checked) {
            initMap('indisch');
        } else {
            initMap('');
        }
    });

    initMap('');

});

function setActive(button){
    $('nav').find('button').css('background-color', 'lightgrey');
    $(button).css('background-color', 'palegreen');
}

function showSection(section){
    $('section').hide();
    section.show();
}

function initMap(foodtype) {
    pyrmont = {lat: -33.867, lng: 151.195};
    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont, //<-------- !!
        zoom: 15
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
    service = new google.maps.places.PlacesService(map);
    console.log(foodtype);
    if (foodtype === 'chinesisch'){
        searchFor('chinese');
    } else if (foodtype === 'italienisch') {
        searchFor('italian');
    } else if (foodtype === 'indisch') {
        searchFor('indian');
    } else{
        displayDefault();
    }
    console.log("nachher");

}

function displayDefault(){
        service.nearbySearch({
        location: pyrmont, //<----- !!
        radius: 300,
        types: ['restaurant']
    }, callback);
}

function searchFor(foodtype){
        service.nearbySearch({
        location: pyrmont, //<----- !!
        radius: 300,
        types: ['restaurant'],
        keyword: foodtype
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



