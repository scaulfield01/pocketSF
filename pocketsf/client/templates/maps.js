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
        zoom: 17
      };
    }
  }
});


Template.maps.onCreated(function() {
  GoogleMaps.ready('exampleMap', function(map) {
    console.log(map)
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});

Meteor.call('getBikeData', function(err,res){
  console.log(res);
});