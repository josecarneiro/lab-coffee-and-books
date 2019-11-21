'use strict';

//initmap function (callback function from google)
function initMap() {
    const $mapContainer = document.getElementById('map');
    if ($mapContainer) {
        const map = new window.google.maps.Map($mapContainer, {
            center: {
                lat: 38.696024,
                lng: -9.1712558
            },
            zoom: 13.04,
            //disableDefaultUI: true,  --> wil remove all the arrows, lines
            //disableDefaultUI: true
            mapTypeId: 'roadmap'
        });


        //variable with coordinates
        const coordinates = {
            lat: 38.7290507,
            lng: -9.1443353
        };


        //new class for marker
        const marker = new window.google.maps.Marker({
            position: coordinates,
            map
        });


        const $inputLatitude = document.querySelector('input[name="latitude"]');
        const $inputLongitude = document.querySelector('input[name="longitude"]');

        let placedMarker;
        //when the user clicks on the map, we save its position and place it in a marker
        map.addListener('click', event => {
            const position = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            };

            $inputLatitude.value = position.lat;
            $inputLongitude.value = position.lng;

            if (placedMarker) {
                placedMarker.setMap(null);
            }

            placedMarker = new window.google.maps.Marker({
                position,
                map
            });
        });
    };
};