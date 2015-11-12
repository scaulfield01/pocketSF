Template.bikeMaps.onRendered(function() {
  GoogleMaps.load();
});

Template.bikeMaps.helpers({

  nearbyMapOptions: function() {
    // Make sure the maps API has loaded
    var findClientLatitude = function() {
    return Geolocation.currentLocation().coords.latitude};
    var findClientLongitude = function() {
    return Geolocation.currentLocation().coords.longitude}

    var clientDistance = function() {
      return Math.sqrt(Math.pow(Geolocation.currentLocation().coords.latitude - 37.7833, 2) + Math.pow(Geolocation.currentLocation().coords.longitude - 122.4167, 2))
    }

    var findBounds = function() {
      return Math.sqrt(Math.pow(37.7833 - 37.7833, 2) + Math.pow(122.4167 - 122.4167, 2))
    }

    console.log(clientDistance())
    console.log(findBounds())


    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(findClientLatitude(), findClientLongitude()),
        zoom: 17,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        streetViewControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        }
      }
    };
  }
});


Template.bikeMaps.onCreated(function() {

  // retreive array of SF bike-rack objects
  GoogleMaps.ready('exampleMap', function(map) {
    Meteor.call('getBikeData', function(err, res){
      // create array of markers
      var markers = [];
      var icon = '/icon/bicycle-parking-teal.png'
      for (var i = 0 ; i <  res.length ;  i++) {
        var marker = res[i]
        var LatLng = new google.maps.LatLng(marker.latitude, marker.longitude)
        var bikeParkingMarker = new google.maps.Marker({
          position: LatLng,
          map: map.instance,
          content: "<strong>Name:</strong> " + marker.name + " <br> <strong>Spaces: </strong>" + marker.spaces + "<br> <strong>Address: </strong>" + "<a href='http://maps.google.com/?q=" + marker.address + "'>" + marker.address + "</a><br>" + "<a href='https://www.google.com/maps/dir/" + Geolocation.currentLocation().coords.latitude + "," + Geolocation.currentLocation().coords.longitude + "/" + marker.address + "'><strong>GET DIRECTIONS</strong></a>",
          icon: icon
        });

        var infowindow = null;
        infowindow = new google.maps.InfoWindow({
        content: "loading..."
        })

        markers.push(bikeParkingMarker)
      };

      for (var i = 0; i < markers.length; i++) {
        // add click listeners to all markers
        var marker = markers[i]

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(this.content);
          infowindow.open(map.instance, this);
        });
      };

      // create marker at client's location
      var userMarker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      });

    });
  });
});


// directions code --save

      // var directionsService = new google.maps.DirectionsService;
      // var directionsDisplay = new google.maps.DirectionsRenderer;
      // directionsDisplay.setMap(map.instance);

      // directionsService.route({
      //   origin: {lat: 37.77, lng: -122.447},
      //   destination: "125 San Anselmo ave"+", San Francisco, CA",
      //   travelMode: google.maps.TravelMode.DRIVING
      // }, function(response, status) {
      //   if (status == google.maps.DirectionsStatus.OK) {
      //     console.log(response)
      //     directionsDisplay.setDirections(response);
      //   } else {
      //     window.alert('Directions request failed due to ' + status);
      //   }
      // });

       //  var infowindow = new google.maps.InfoWindow({
       //  content: "Name: " + res[i].name + " <br> Spaces: " + res[i].spaces
       // })
         // content: "Name: " + res[i].name + " <br> Spaces: " + res[i].spaces
        // });
