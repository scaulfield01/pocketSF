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

    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(findClientLatitude(), findClientLongitude()),
        zoom: 16
      }
    }
  }
});

Template.mobileFoodsMaps.onCreated(function(){

    GoogleMaps.ready('mobileFoodsMap', function(map) {

      Meteor.call('getMobileFoodData', function(err, res){

        var markers = [];
        for (var i = 0 ; i <  res.length ;  i++) {
          var marker = res[i]

          var LatLng = new google.maps.LatLng(marker.latitude, marker.longitude)

          var mobileFoodMarker = new google.maps.Marker({
            position: LatLng,
            map: map.instance,
            content: "Vendor: " + marker.vendor + " <br> Info: " + marker.info + "<br> Address: " + "<a href='http://maps.google.com/?q=" + marker.address + "'>" + marker.address + "</a><br>Hours: " + marker.startTime + "- " + marker.endTime + "<br>Day(s) Open: " + marker.dayOfWeek + "<br><a href='https://www.google.com/maps/dir/" + Geolocation.currentLocation().coords.latitude + "," + Geolocation.currentLocation().coords.longitude + "/" + marker.address + "'>get directions</a>"
          });

          var infowindow = null;
          infowindow = new google.maps.InfoWindow({
          content: "loading..."
          })

          markers.push(mobileFoodMarker);
        };
        for (var i = 0; i < markers.length; i++) {
          // add click listeners to all markers
          var marker = markers[i]

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(this.content);
            infowindow.open(map.instance, this);
          });
        };

        var userMarker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

    })
  });
});











