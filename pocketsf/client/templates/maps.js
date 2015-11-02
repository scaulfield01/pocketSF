Template.maps.onRendered(function() {
  GoogleMaps.load();
  // Session.set("latitude", "Hey")
});

Template.maps.helpers({

  formRender: function(){
    if (Session.get("destinationRender")){
      return true;
    } else {
      return false;
    }
  },

  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    var findClientLatitude = function() {
      return Geolocation.currentLocation().coords.latitude};

    var findClientLongitude = function() {
      return Geolocation.currentLocation().coords.longitude};

    if (GoogleMaps.loaded()) {

      // create directions route


      // initialize map
      return {
        // if session renderDesitination == true
        // center : new gooogle map lat ling(destination input from form)
        //else this thing here ....
        center: new google.maps.LatLng(findClientLatitude(), findClientLongitude()),
        zoom: 16
      };

    }
  }

});


Template.maps.onCreated(function() {
Meteor.call('findGeoCode', function(err, res) {
  console.log(res);
});

Meteor.call('getBikeData', function(err,res){

    GoogleMaps.ready('exampleMap', function(map) {

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
            var marker = markers[i]
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(this.content);
              infowindow.open(map.instance, this);
            });
          };

           // google.maps.event.addListener(marker, 'click', function(){
           //    infowindow.setContent(this.html);
           //    infowindow.open(map.instance, this)
           // })

      var userMarker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'

      });
      // https://maps.googleapis.com/maps/api/directions/output?parameters




      // var bikeRackMarkers = new google.maps.Marker({
      //   position: myLatLng,
      //   map: map.instance
      // });
    });
  });
});


Template.maps.events({
  "submit .address": function(e){
    e.preventDefault();
      var text = e.target.destination.value;
      Session.set('userDestination', text)
  }
})




