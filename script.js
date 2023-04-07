var map;
var geocoder;
var infowindow;
var marker;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 21.0278, lng: 105.8342},
        zoom: 8
    });
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });

    if (geogetmap == 'yes') {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                placeMarker(pos);
            }, function() {
                handleLocationError(true, infowindow, map.getCenter());
            });
        } else {
            handleLocationError(false, infowindow, map.getCenter());
        }
    }
}

function placeMarker(location) {
    if (marker) {
        marker.setPosition(location);
    } else {
        marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true
        });
    }
    geocoder.geocode({'location': location}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
                document.getElementById("address").value = results[0].formatted_address;
                document.getElementById("lat").value = location.lat();
                document.getElementById("lng").value = location.lng();
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });

    google.maps.event.addListener(marker, 'dragend', function(event) {
        geocoder.geocode({'location': event.latLng}, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, marker);
                    document.getElementById("address").value = results[0].formatted_address;
                    document.getElementById("lat").value = event.latLng.lat();
                    document.getElementById("lng").value = event.latLng.lng();
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    });
}

function handleLocationError(browserHasGeolocation, infowindow, pos) {
    infowindow.setPosition(pos);
    infowindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infowindow.open(map);
}

function savemap() {
  var lat = document.getElementById("latitude").innerHTML;
  var lng = document.getElementById("longitude").innerHTML;
  var xhttp;
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert("Location saved!");
    }
  };
  xhttp.open("POST", "savemap.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("lat=" + lat + "&lng=" + lng);
}
