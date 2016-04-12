var map;

jQuery(document).ready(function(){

    var whoButton = $('#who_button');
    var whereButton = $('#where_button');
    var whatButton = $('#what_button');
    var goButton = $('#go_button');

    var what = $('#What');
    var where = $('#Where');
    var who = $('#Who');


    $(what).hide();
    $(who).hide();
    
    whereButton.on('click', function(){
        what.hide();
        who.hide();
        where.show();
        setActive(this);
    });
    
    whatButton.on('click', function(){
        what.show();
        who.hide();
        where.hide();
        setActive(this);
    });
        
    whoButton.on('click', function(){
        what.hide();
        who.show();
        where.hide();
        setActive(this);
    });

    goButton.on('click', function(){
        what.hide();
        where.show();
        who.hide();
        setActive(whereButton);
    });

initMap();


});

function setActive(button){
    $('nav').find('button').css('background-color', 'lightgrey');
    $(button).css('background-color', 'palegreen');
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



