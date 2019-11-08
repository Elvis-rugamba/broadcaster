//Location Map
function locationMap() {
    // The location
    const center = {lat:  -1.8964, lng: 30.0569};

    const mapProp= {
        panControl: true,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_CENTER
        },
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true,
        center: center,
        zoom: 14
    };
    // The map, centered at Location
    const map = new google.maps.Map(
        document.querySelector('.location-map'), mapProp);

    // The marker, positioned at Location
    const marker = new google.maps.Marker({
        position: center,
        map: map,
        animation: google.maps.Animation.DROP
    });

    const infoWindow = new google.maps.InfoWindow({
        content: 'Latitude: ' + map.lat() +
        '<br>Longitude: ' + map.lng()
    });

    google.maps.event.addListerner(marker, 'mouseover', function () {
        infoWindow.open(map, marker);
    });
}
// End Location Map