mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lybWFkIiwiYSI6ImNraXFnNGFiNjFjaWIzOG84aGpvd2xtOGIifQ.7CC9ym81Xt2gfUcxbB2Lkg';
// mapboxgl.accessToken = mapToken;
var currentLatitude;
var currentLongitude;

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-122.4, 47.6], // starting position
    zoom: 9 // starting zoom
});



map.on('click', function (e) {
    //create lat and lng attributes to the mapLocation method
    window.mapLocation = {   
        lat : e.lngLat.wrap().lat,
        lng : e.lngLat.wrap().lng
    }; 



    // console.log(e.lngLat.wrap().lat)
    // console.log(e.lngLat.wrap().lng)
    console.log(parent);
    document.getElementById('info').innerHTML =
    // e.point is the x, y coordinates of the mousemove event relative
    // to the top-left corner of the map
    JSON.stringify(e.point) +
    '<br />' +
    // e.lngLat is the longitude, latitude geographical position of the event
    JSON.stringify(e.lngLat.wrap());
});