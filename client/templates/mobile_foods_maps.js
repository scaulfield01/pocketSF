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
        zoom: 17,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        streetViewControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        }
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
          var content = "<strong>Vendor: </strong>" + marker.vendor + " <br> <strong>Info: </strong>" + marker.info + "<br> <strong>Address: </strong>" + "<a href='http://maps.google.com/?q=" + marker.address + "'>" + marker.address + "</a><br><strong>Hours: </strong>" + marker.startTime + "- " + marker.endTime + "<br><strong>Day(s) Open: </strong>" + marker.dayOfWeek + "<br><a href='https://www.google.com/maps/dir/" + Geolocation.currentLocation().coords.latitude + "," + Geolocation.currentLocation().coords.longitude + "/" + marker.address + "'><strong>GET DIRECTIONS</strong></a>"
          var icon = '/icon/food-truck-red.png'
          var LatLng = new google.maps.LatLng(marker.latitude, marker.longitude)

          var mobileFoodMarker = new google.maps.Marker({
            position: LatLng,
            icon: icon,
            map: map.instance,
            content: content
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











