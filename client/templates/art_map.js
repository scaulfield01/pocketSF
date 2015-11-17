Template.artmap.onRendered(function() {
  GoogleMaps.load();
});

Template.artmap.helpers({
  artMapOptions: function() {
    var findClientLatitude = function() {
    return Geolocation.currentLocation().coords.latitude};
    var findClientLongitude = function() {
    return Geolocation.currentLocation().coords.longitude};

    var clientDistance = function() {
      return Math.sqrt(Math.pow(findClientLatitude() - 37.7833, 2) + Math.pow(findClientLongitude() - 122.4167, 2))
    }

    var findBounds = function() {
      return Math.sqrt(Math.pow(37.701267 - 37.7833, 2) + Math.pow(-122.443305 - 122.4167, 2))
    }


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



Template.artmap.onCreated(function() {

  GoogleMaps.ready('artMaps', function(map) {
    Meteor.call('getArtData', function(err,res){
      var arts = res


      var markers = []

      for (var i = 0 ; i <  arts.length ;  i++) {
        var icon = '/icon/public-art-red.png'
        var marker = res[i]
        var content = "<strong>Title: </strong>" + marker.title + "<br> <strong>Artist: </strong>" + marker.artist + "<br> <strong>Created: </strong>" + marker.created + "<br> <strong>Description:</strong>" + marker.description + "<br><a href='https://www.google.com/maps/dir/" + Geolocation.currentLocation().coords.latitude + "," + Geolocation.currentLocation().coords.longitude + "/" + marker.location[1] + ", " + marker.location[0] + "'><strong>GET DIRECTIONS</strong></a>"
        var LatLng = new google.maps.LatLng(marker.location[1], marker.location[0])

        var artMarker = new google.maps.Marker({
          position: LatLng,
          map: map.instance,
          content: content,
          icon: icon
        });

        var infowindow = null;
        infowindow = new google.maps.InfoWindow({
        content: "loading..."
        })

        markers.push(artMarker)
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
