Template.moviesMap.onRendered(function() {
  GoogleMaps.load();
});


Template.moviesMap.helpers({
  moviesMapOptions: function() {
    var findClientLatitude = function() {
    return Geolocation.currentLocation().coords.latitude};
    var findClientLongitude = function() {
    return Geolocation.currentLocation().coords.longitude}

    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(findClientLatitude(), findClientLongitude()),
        zoom: 16
      }
    };
  }
});

Template.moviesMap.onCreated(function() {

  Meteor.call('getMoviesData', function(err,res){
   debugger
    GoogleMaps.ready('moviesMap', function(map) {

      var markers = []
      for (var i = 0 ; i <  res.length ;  i++) {
        var marker = res[i]
        // var LatLng = new google.maps.LatLng(marker.latitude, marker.longitude)
        var movieMarker = new google.maps.Marker({
          position: LatLng,
          map: map.instance,
        });

      var userMarker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      });

    };
  });
});
});


