Template.artDest.onRendered(function() {
  GoogleMaps.load();
});

Template.artDest.helpers({
  artDestMapOptions: function () {
    var destLat = function() {
      if(Session.get("userLat")) {
        return Session.get("userLat");
      }
    };

    var destLng = function() {
      if(Session.get("userLng")) {
        return Session.get("userLng");
      }
    };

    if (GoogleMaps.loaded()) {
      if (Session.get("userLat") && Session.get("userLng")) {
         return {
            center: new google.maps.LatLng(destLat(), destLng()),
            zoom: 16
         }
       }
    }

  }
});

Template.artDest.onCreated(function() {

  Meteor.call('getArtData', function(err,res){
    GoogleMaps.ready('artDestMap', function(map) {

      var markers = []
      for (var i = 0 ; i <  res.length ;  i++) {
        var marker = res[i]
        var LatLng = new google.maps.LatLng(marker.location[1], marker.location[0])
        var artMarker = new google.maps.Marker({
          position: LatLng,
          map: map.instance,
          content: "Title: " + marker.title + "<br> Artist: " + marker.artist + "<br> Created: " + marker.created + "<br> Description:" + marker.description + "<br><a href='https://www.google.com/maps/dir/" + Geolocation.currentLocation().coords.latitude + "," + Geolocation.currentLocation().coords.longitude + "/" + marker.address + "'>get directions</a>"
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

