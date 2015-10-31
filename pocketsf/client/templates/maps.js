Template.maps.onRendered(function() {
  GoogleMaps.load();
});

Template.maps.helpers({

  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    var findClientLatitude = function() {
      return Geolocation.currentLocation().coords.latitude};

    var findClientLongitude = function() {
      return Geolocation.currentLocation().coords.longitude};

    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(findClientLatitude(), findClientLongitude()),
        zoom: 14
      };
    }
  }
});


Template.maps.onCreated(function() {

Meteor.call('getBikeData', function(err,res){

    GoogleMaps.ready('exampleMap', function(map) {

      for (var i = 0 ; i <  res.length;  i++) {
        var LatLng = new google.maps.LatLng(res[i].latitude, res[i].longitude)

       var bikeRackMarkers = new google.maps.Marker({
          position: LatLng,
          map: map.instance

        });
      };

      var userMarker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
      //


      // var bikeRackMarkers = new google.maps.Marker({
      //   position: myLatLng,
      //   map: map.instance
      // });
    });
  });
});




