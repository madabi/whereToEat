var map;

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
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 18
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
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
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}



