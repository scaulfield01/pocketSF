Template.bikeMaps.onRendered(function() {
  GoogleMaps.load();
});

Template.bikeMaps.helpers({

  nearbyMapOptions: function() {
    // Make sure the maps API has loaded
    var findClientLatitude = function() {
    return Geolocation.currentLocation().coords.latitude};
    // return 38.898748}
    var findClientLongitude = function() {
    return Geolocation.currentLocation().coords.longitude}
    // return -77.037684}

    var clientDistance = function() {
      return Math.sqrt(Math.pow(findClientLatitude() - 37.7833, 2) + Math.pow(findClientLongitude() - 122.4167, 2))
    }

    var findBounds = function() {
      return Math.sqrt(Math.pow(37.701267 - 37.7833, 2) + Math.pow(-122.443305 - 122.4167, 2))
    }

    console.log(clientDistance())
    console.log(findBounds())


    if (GoogleMaps.loaded()) {
      if (clientDistance() > findBounds()) {
        console.log("Inside the bounds")
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
    } else {
      console.log("Outside the bounds")
              return {
        center: new google.maps.LatLng(37.7833, -122.4167),
        zoom: 13,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        streetViewControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        }
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
