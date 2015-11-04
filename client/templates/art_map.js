Template.artmap.onRendered(function() {
  GoogleMaps.load();
});

Template.artmap.helpers({
  artMapOptions: function() {
    var findClientLatitude = function() {
    return Geolocation.currentLocation().coords.latitude};
    var findClientLongitude = function() {
    return Geolocation.currentLocation().coords.longitude};

    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(findClientLatitude(), findClientLongitude()),
        zoom: 16
      }
    };
  }
});


Template.artmap.onCreated(function() {

  Meteor.call('getArtData', function(err,res){
    var arts = res

    GoogleMaps.ready('artMaps', function(map) {

      var markers = []

      for (var i = 0 ; i <  arts.length ;  i++) {

        var marker = res[i]
        var content = "Title: " + marker.title + "<br> Artist: " + marker.artist + "<br> Created: " + marker.created + "<br> Description:" + marker.description + "<br><a href='https://www.google.com/maps/dir/" + Geolocation.currentLocation().coords.latitude + "," + Geolocation.currentLocation().coords.longitude + "/" + marker.location[1] + ", " + marker.location[0] + "'>get directions</a>"
        var LatLng = new google.maps.LatLng(marker.location[1], marker.location[0])

        var artMarker = new google.maps.Marker({
          position: LatLng,
          map: map.instance,
          content: content

        });

        var infowindow = null;
        infowindow = new google.maps.InfoWindow({
        content: "loading..."
        })

        markers.push(artMarker)
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
