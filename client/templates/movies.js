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

    GoogleMaps.ready('moviesMap', function(map) {
      var markers = MovieLocations.find();
      var userMarker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      });
      markers.forEach(function(marker) {
        debugger
        var LatLng = new google.maps.LatLng(marker.movieGeo.latitude, marker.movieGeo.longitude);
        debugger
        var movieLocationMarker = new google.maps.Marker({
          position: LatLng,
          map: map.instance,
          content: "<strong>Movie Title</strong> + "
        });
      });

        var infowindow = null;
        infowindow = new google.maps.InfoWindow({
          content: "loading..."
        })
        google.maps.event.addListener(movieLocationMarker, 'click', function() {
          infowindow.setContent(this.content);
          infowindow.open(map.instance, this);
  });
});
      // for (var i = 0 ; i <  res.length ;  i++) {

      //   var marker = res[i]
      //   // var filmGeocode = findGeoCode(marker.location)

      //   var LatLng = new google.maps.LatLng(33, 122)
      //   var movieMarker = new google.maps.Marker({
      //     position: LatLng,
      //     map: map.instance



