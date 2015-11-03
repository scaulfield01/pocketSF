Template.foodScoresMaps.onRendered(function () {

  GoogleMaps.load();
});

Template.foodScoresMaps.helpers({
  foodScoresMapOptions: function () {
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


Template.foodScoresMaps.onCreated(function(){
  Meteor.call('getFoodScoresData');
  GoogleMaps.ready('foodScoresMap', function(map) {

    var markers = FoodScores.find();

    var userMarker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });


    markers.forEach(function (marker) {
      var LatLng = new google.maps.LatLng(marker.latitude, marker.longitude);
      var foodScoreMarker = new google.maps.Marker({
        position: LatLng,
        map: map.instance,
        content: "<strong>Name:</strong> " + marker.name + "<br><strong>Address:</strong> " + marker.address + "<br><strong>Risk Level:</strong> " + marker.risk_category + "<br><strong>Score:</strong> " + marker.insp_score + "<br><strong>Inspection Results:</strong> " + marker.insp_description
      });

      var infowindow = null;
      infowindow = new google.maps.InfoWindow({
        content: "loading..."
      })
      google.maps.event.addListener(foodScoreMarker, 'click', function() {
        infowindow.setContent(this.content);
        infowindow.open(map.instance, this);
      });
    });


    // for (var i = 0; i < foodScoreMarkers.length; i++) {
    //   // add click listeners to all markers
    //   console.log(foodScoreMarkers[1])
    //   var marker = foodScoreMarkers[i];

    //   google.maps.event.addListener(marker, 'click', function() {
    //     infowindow.setContent(this.content);
    //     infowindow.open(map.instance, this);
    //   });
    // };

  });
});

      // var foodScoreRecords = FoodScores.find().count()



        // for (var i = 0 ; i < foodScoreRecords;  i++) {
        //   var marker = res[i]

        //   var LatLng = new google.maps.LatLng(marker.latitude, marker.longitude)

        //   var mobileFoodMarker = new google.maps.Marker({
        //     position: LatLng,
        //     map: map.instance,
        //     content: "Vendor: " + marker.vendor + " <br> Info: " + marker.info + "<br> Address: " + "<a href='http://maps.google.com/?q=" + marker.address + "'>" + marker.address + "</a><br>Hours: " + marker.startTime + "- " + marker.endTime + "<br>Day(s) Open: " + marker.dayOfWeek + "<br><a href='https://www.google.com/maps/dir/" + Geolocation.currentLocation().coords.latitude + "," + Geolocation.currentLocation().coords.longitude + "/" + marker.address + "'>get directions</a>"
        //   });

        //   var infowindow = null;
        //   infowindow = new google.maps.InfoWindow({
        //   content: "loading..."
        //   })

        //   markers.push(mobileFoodMarker);
        // };
        // for (var i = 0; i < markers.length; i++) {
        //   // add click listeners to all markers
        //   var marker = markers[i]

        //   google.maps.event.addListener(marker, 'click', function() {
        //     infowindow.setContent(this.content);
        //     infowindow.open(map.instance, this);
        //   });
        // };

        // var userMarker = new google.maps.Marker({
        // position: map.options.center,
        // map: map.instance,
        // icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        // });







