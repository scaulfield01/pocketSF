Template.foodScoresMaps.onRendered(function () {
  GoogleMaps.load();
});

Template.foodScoresMaps.helpers({
  foodScoresMapOptions: function () {
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


Template.foodScoresMaps.onCreated(function(){

  GoogleMaps.ready('foodScoresMap', function(map) {
    var markers = FoodScores.find();
    var userMarker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });

    markers.forEach(function (marker) {

      if (marker.insp_score >= 95) {
          var icon = '/icon/restaurant-green.png';
      } else if (marker.insp_score >= 90) {
          var icon = '/icon/restaurant-yellow.png';
      } else {
          var icon = '/icon/restaurant-red.png';
      }

      var LatLng = new google.maps.LatLng(marker.latitude, marker.longitude);

      var foodScoreMarker = new google.maps.Marker({
        position: LatLng,
        map: map.instance,
        icon: icon,
        content: "<strong>Name:</strong> " + marker.name + "<br><strong>Address:</strong> " + marker.address + "<br><strong>Risk Level:</strong> " + marker.risk_category + "<br><strong>Score:</strong> " + marker.insp_score + "<br><strong>Inspection Results:</strong> " + marker.insp_description.slice(0, 1) + "<br><a href='https://www.google.com/maps/dir/" + Geolocation.currentLocation().coords.latitude + "," + Geolocation.currentLocation().coords.longitude + "/" + marker.address + "'><strong>get directions</strong></a>"
      });

      var infowindow = null;
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      })
      google.maps.event.addListener(foodScoreMarker, 'click', function() {
        infowindow.setContent(this.content);
        infowindow.open(map.instance, this);
      });
    });
    markers = {}

  });
});







