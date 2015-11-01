if (Meteor.isServer) {
  Meteor.methods({
    // The method expects a valid IPv4 address
    'getBikeData': function () {
      // console.log('Method.getBikeData');
      // Construct the API URL
      var apiUrl = 'https://data.sfgov.org/resource/w969-5mn4.json';
      // query the API
      var response = HTTP.get(apiUrl).data;
      // return response;

// iterate through the response
// assign each properties to new objects
// puth these new objects into array
// return the array
  var bikeMarkers =[]

// input is response


    for (var i = 0;  i < response.length;  i++) {

          var bikeMarker = {};
          var responseLat = response[i].latitude.latitude;
          var responseLong = response[i].latitude.longitude;
          var responseName = response[i].street_name;
          var responseSpaces = response[i].spaces;
          var responseAddress = response[i].yr_inst;
          bikeMarker.latitude = responseLat;
          bikeMarker.longitude = responseLong;
          bikeMarker.name = responseName;
          bikeMarker.spaces = responseSpaces;
          bikeMarker.address = responseAddress;
          bikeMarkers.push(bikeMarker)
    };
      return bikeMarkers;
    },
    'pathGoogleMapsDirection': function () {

      // var origin = 37.75087429, -122.42019976)
      // var destination = (37.75402900, -122.41897400)
      // console.log("hi")

      var path = "https://maps.googleapis.com/maps/api/directions?key=AIzaSyD0g7OPjleD0G_TBWIgjmdJc71J9dwREEU&origin=new+york&destination=baltimore"
      var response = HTTP.get(path);
      return response
  }

  });
}

// if (Meteor.isClient) {

//   Meteor.methods({
//     'findClientLocation': function() {
//       // Make sure the maps API has loaded
//       var latitude =  Geolocation.currentLocation().coords.latitude;

//       var longitude = Geolocation.currentLocation().coords.longitude;

//       return latitude + ", " +  longitude

//     };
//   })

// };