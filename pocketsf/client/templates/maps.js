
Template.maps.onRendered(function() {
  GoogleMaps.load();
});

  Template.maps.helpers({
    exampleMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(-37.8136, 144.9631),
          zoom: 8
        };
      }
    }
  });
  Template.maps.onCreated(function() {
    GoogleMaps.ready('exampleMap', function(map) {
      console.log(map)
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
    });
  });

