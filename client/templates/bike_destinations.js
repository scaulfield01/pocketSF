Template.bikeDestinations.onRendered(function() {
  GoogleMaps.load();
});

Template.bikeDestinations.helpers({
  destinationsMapOptions: function () {
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

Template.bikeDestinations.onCreated(function() {

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

  Meteor.call('getBikeData', function(err,res){
    GoogleMaps.ready('destinationsMap', function(map) {
      var icon = '/icon/bicycle-parking-teal.png'
      var markers = []
      for (var i = 0 ; i <  res.length ;  i++) {
        var marker = res[i]
        var LatLng = new google.maps.LatLng(marker.latitude, marker.longitude)
        var bikeParkingMarker = new google.maps.Marker({
          position: LatLng,
          map: map.instance,
          content: "<strong>Name:</strong> " + marker.name + " <br><strong> Spaces:</strong> " + marker.spaces + "<br> <strong>Address: </strong><a href='http://maps.google.com/?q=" + marker.address + " San Francisco, CA"+ "'>" + marker.address + " San Francisco, CA" + "</a><br><a href='https://www.google.com/maps/dir/" + destLat() + ", " + destLng() + "/" + marker.address + "'><strong>Get Directions<strong></a>",
          icon: icon
          // content: "Name: " + marker.name + " <br> Spaces: " + marker.spaces + "<br> Address: " + "<a href='http://maps.google.com/?q=" + marker.address + " San Francisco, CA"+ "'>" + marker.address + " San Francisco, CA" + "</a>"
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


//Clear cookies after render
