////////////////////////////////////////////////////////////////

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
 
function onDragEnd(e) {
    console.log(e)
    marker.setLngLat(e.target.getLngLat());

    var lngLat = marker.getLngLat();
    window.mapLocation = {   
        lat : lngLat.lat,
        lng : lngLat.lng
    }; 
    // console.log("new coords", lngLat)
    coordinates.style.display = 'block';
    coordinates.innerHTML =
    'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
}
 
marker.on('dragend', onDragEnd);

