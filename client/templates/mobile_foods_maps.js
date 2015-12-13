Template.mobileFoodsMaps.onRendered(function () {
  GoogleMaps.load();
});

Template.mobileFoodsMaps.helpers({
  mobileFoodsMapOptions: function () {
    var findClientLatitude = function() {
      return Geolocation.currentLocation().coords.latitude
    };
    var findClientLongitude = function() {
      return Geolocation.currentLocation().coords.longitude
    };

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

Template.mobileFoodsMaps.onCreated( function () {
  GoogleMaps.ready('mobileFoodsMap', function (map) {

    var markers = MobileFoods.find();
    // Set client marker at current location.
    var userMarker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });

    markers.forEach( function (marker) {
      var LatLng = new google.maps.LatLng(marker.latitude, marker.longitude);
      var content = "<strong>Vendor: </strong>" + marker.vendor +
        " <br> <strong>Info: </strong>" + marker.info +
        "<br> <strong>Address: </strong>" + "<a href='http://maps.google.com/?q=" + marker.address + "'>" + marker.address +
        "</a><br><strong>Hours: </strong>" + marker.startTime + "- " + marker.endTime +
        "<br><strong>Day(s) Open: </strong>" + marker.dayOfWeek +
        "<br><a href='https://www.google.com/maps/dir/" + Geolocation.currentLocation().coords.latitude + "," + Geolocation.currentLocation().coords.longitude + "/" + marker.address + "'><strong>GET DIRECTIONS</strong></a>"
      var icon = '/icon/food-truck-red.png'

      var mobileFoodMarker = new google.maps.Marker({
        position: LatLng,
        icon: icon,
        map: map.instance,
        content: content
      });
      var infowindow = null;
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      });

      google.maps.event.addListener(mobileFoodMarker, 'click', function () {
        infowindow.setContent(this.content);
        infowindow.open(map.instance, this);
      });
    });
  });
});











