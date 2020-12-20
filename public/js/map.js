// mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lybWFkIiwiYSI6ImNraXFnNGFiNjFjaWIzOG84aGpvd2xtOGIifQ.7CC9ym81Xt2gfUcxbB2Lkg';

// var map = new mapboxgl.Map({
//     container: 'map', // container id
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: [-122.4, 47.6], // starting position
//     zoom: 9 // starting zoom
// });

// map.on('click', function (e) {
//     //create lat and lng attributes to the mapLocation method
//     window.mapLocation = {   
//         lat : e.lngLat.wrap().lat,
//         lng : e.lngLat.wrap().lng
//     }; 
//     // console.log(e.lngLat.wrap().lat)
//     // console.log(e.lngLat.wrap().lng)    
//     document.getElementById('info').innerHTML =
//     // e.point is the x, y coordinates of the mousemove event relative
//     // to the top-left corner of the map
//     JSON.stringify(e.point) +
//     '<br />' +
//     // e.lngLat is the longitude, latitude geographical position of the event
//     JSON.stringify(e.lngLat.wrap());
// });

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lybWFkIiwiYSI6ImNraXFnNGFiNjFjaWIzOG84aGpvd2xtOGIifQ.7CC9ym81Xt2gfUcxbB2Lkg';
var coordinates = document.getElementById('coordinates');
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-122.4, 47.6],
    zoom: 8
});
 
var marker = new mapboxgl.Marker({
    draggable: true
})
.setLngLat([-122.4, 47.6])
.addTo(map);
 
function onDragEnd() {
    var lngLat = marker.getLngLat();

    window.mapLocation = {   
        lat : lngLat.lat,
        lng : lngLat.lng
    }; 
    console.log("windowMapLocation", window.mapLocation)

    coordinates.style.display = 'block';
    coordinates.innerHTML =
    'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
}
 
marker.on('dragend', onDragEnd);