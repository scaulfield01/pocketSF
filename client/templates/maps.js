Template.maps.onRendered(function() {
  GoogleMaps.load();
});

Template.maps.helpers({
  formRender: function(){
    if (Session.get("destinationRender")){
      return true;
    } else {
      return false;
    }
  },
  destinationMapOptions: function() {
    // Make sure the maps API has loaded
    var findClientLatitude = function() {
    return Geolocation.currentLocation().coords.latitude};
    var findClientLongitude = function() {
    return Geolocation.currentLocation().coords.longitude};
    var renderChoice = function () {
    return Session.get("destinationRender")
    }

    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(findClientLatitude(), findClientLongitude()),
        zoom: 16
      }
    };
  }
});


Template.maps.onCreated(function() {

  // retreive array of SF bike-rack objects
  Meteor.call('getBikeData', function(err,res){

    GoogleMaps.ready('exampleMap', function(map) {
      // create array of markers
      var markers = []
      for (var i = 0 ; i <  res.length ;  i++) {
        var marker = res[i]
        var LatLng = new google.maps.LatLng(marker.latitude, marker.longitude)

        var bikeParkingMarker = new google.maps.Marker({
          position: LatLng,
          map: map.instance,
          content: "Name: " + marker.name + " <br> Spaces: " + marker.spaces + "<br> Address: " + "<a href='http://maps.google.com/?q=" + marker.address + "'>" + marker.address + "</a><br>" + "<a href='https://www.google.com/maps/dir/" + Geolocation.currentLocation().coords.latitude + "," + Geolocation.currentLocation().coords.longitude + "/" + marker.address + "'>get directions</a>"
        });

        var infowindow = null;
        infowindow = new google.maps.InfoWindow({
        content: "loading..."
        })

        markers.push(bikeParkingMarker)
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

Template.maps.events({
  "submit .address": function(e){
    e.preventDefault();
    var text = e.target.destination.value;
    // Session.set('userDestination', text);
    Meteor.call('findGeoCode', text, function(err, res) {
      Session.set("userLat", res[0].latitude)
      Session.set("userLng", res[0].longitude)
    })
  }
});





// directions code --save

      // var directionsService = new google.maps.DirectionsService;
      // var directionsDisplay = new google.maps.DirectionsRenderer;
      // directionsDisplay.setMap(map.instance);

      // directionsService.route({
      //   origin: {lat: 37.77, lng: -122.447},
      //   destination: "125 San Anselmo ave"+", San Francisco, CA",
      //   travelMode: google.maps.TravelMode.DRIVING
      // }, function(response, status) {
      //   if (status == google.maps.DirectionsStatus.OK) {
      //     console.log(response)
      //     directionsDisplay.setDirections(response);
      //   } else {
      //     window.alert('Directions request failed due to ' + status);
      //   }
      // });

       //  var infowindow = new google.maps.InfoWindow({
       //  content: "Name: " + res[i].name + " <br> Spaces: " + res[i].spaces
       // })
         // content: "Name: " + res[i].name + " <br> Spaces: " + res[i].spaces
        // });