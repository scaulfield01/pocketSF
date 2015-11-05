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

        if (marker.releaseYear >= 2000) {
            var icon = '/icon/cinema-yellow.png';
        } else if (marker.releaseYear >= 1950) {
            var icon = '/icon/cinema-purple.png';
        } else {
            var icon = '/icon/cinema-brown.png';
        }

        var movieGeoObj = marker.movieGeo
        var LatLng = new google.maps.LatLng(movieGeoObj.latitude, movieGeoObj.longitude);

        var movieLocationMarker = new google.maps.Marker({

          position: LatLng,
          map: map.instance,
          icon: icon,
          content: "<strong> Movie Title: </strong> "+ marker.title +"<br>"+ "<strong>Year: </strong>"+ marker.releaseYear + "<br>" + "<strong>Studio: </strong>" + marker.productionCompany + "<br>" + "<strong>Director: </strong>" + marker.director + "<br>" + "<strong>Location: </strong>" + marker.location + "<br><strong>Fun Facts: </strong>" + marker.funFact + "<br>" + "<a href='http://www.rottentomatoes.com/search/?search=" + marker.title + "'" + ">" + "Additional Info" + "</a>"
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
  });
});





      // for (var i = 0 ; i <  res.length ;  i++) {

      //   var marker = res[i]
      //   // var filmGeocode = findGeoCode(marker.location)

      //   var LatLng = new google.maps.LatLng(33, 122)
      //   var movieMarker = new google.maps.Marker({
      //     position: LatLng,
      //     map: map.instance



