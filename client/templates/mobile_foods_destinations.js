Template.mobileFoodsDestinations.onRendered(function() {
  GoogleMaps.load();
});

Template.mobileFoodsDestinations.helpers({
  foodsDestinationsMapOptions: function () {
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
  },
  userDestination: function(){
    return Session.get("userDest");
  }
});

Template.mobileFoodsDestinations.onCreated(function() {

  Meteor.call('getMobileFoodData', function(err,res){
    GoogleMaps.ready('foodsDestinationsMap', function(map) {

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



      var markers = []
      for (var i = 0 ; i <  res.length ;  i++) {
        var marker = res[i]
        var content = "Vendor: " + marker.vendor + " <br> Info: " + marker.info + "<br> Address: " + "<a href='http://maps.google.com/?q=" + marker.address + "'>" + marker.address + "</a><br>Hours: " + marker.startTime + "- " + marker.endTime + "<br>Day(s) Open: " + marker.dayOfWeek + "<br><a href='https://www.google.com/maps/dir/" + destLat() + ", " + destLng() + "/" + marker.address + "'><strong>get directions</strong></a>"
        var LatLng = new google.maps.LatLng(marker.latitude, marker.longitude)
        var foodDestinationMarker = new google.maps.Marker({
          position: LatLng,
          map: map.instance,
          content: content
        });

        var infowindow = null;
        infowindow = new google.maps.InfoWindow({
        content: "loading..."
        })

        markers.push(foodDestinationMarker)
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
