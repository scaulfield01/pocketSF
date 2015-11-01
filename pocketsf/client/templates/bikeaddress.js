Template.bikeaddress.events ({
  "submit .address": function(e) {
    e.preventDefault();
    var destination = e.target.destination.value;
    console.log(destination)

    console.log(google.maps.Geocoder(destination))
  }
});

Template.bikeaddress.onRendered(function() {
  GoogleMaps.load();

  // Session.set("latitude", "Hey")
});