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
        zoom: 7
      };
    }
  }
});


Template.maps.onCreated(function() {

Meteor.call('getBikeData', function(err,res){

    GoogleMaps.ready('exampleMap', function(map) {
      var myLatLng = new google.maps.LatLng(res.latitude, res.longitude);
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
      var bikeRackMarkers = new google.maps.Marker({
        position: myLatLng,
        map: map.instance
      });
    });
  });
});




