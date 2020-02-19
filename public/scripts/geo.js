'use strict';

function initMap() {
  const $mapContainer = document.getElementById('map');
  const $inputLatitude = document.querySelector('input[name="latitude"]');
  const $inputLongitude = document.querySelector('input[name="longitude"]');

  if ($mapContainer) {
    const map = new window.google.maps.Map($mapContainer, {
      center: {
        lat: 38.696024,
        lng: -9.1712558
      },
      zoom: 13.04,
      mapTypeId: 'roadmap'
    });

    //variable with coordinates
    let coordinates = {
      lat: 38.7290507,
      lng: -9.1443353
    };

    //new class for marker
    const marker = new window.google.maps.Marker({
      position: coordinates,
      map
    });
  }
}
