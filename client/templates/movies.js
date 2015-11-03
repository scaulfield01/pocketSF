Template.moviesMap.onRendered(function() {
  GoogleMaps.load();
});

Template.moviesMap.helpers({

  moviesMapOptions: function() {
    // Make sure the maps API has loaded
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
    Meteor.call('getMoviesData', function(err, res){
      console.log(res)
      debugger
      var markers = []
      for (var i = 0 ; i <  res.length ;  i++) {
        var marker = res[i]
        var LatLng = new google.maps.LatLng(marker.latitude, marker.longitude)

        var moviesMarker = new google.maps.Marker({
          position: LatLng,
          map: map.instance
        });

        var infowindow = null;
        infowindow = new google.maps.InfoWindow({
        content: "loading..."
        })

        markers.push(moviesMarker)
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

