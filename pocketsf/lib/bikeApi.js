if (Meteor.isServer) {
  Meteor.methods({
    // The method expects a valid IPv4 address
    'getBikeData': function () {
      console.log('Method.getBikeData');
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
          bikeMarker.latitude = responseLat;
          bikeMarker.longitude = responseLong;
          bikeMarker.name = responseName;
          bikeMarker.spaces = responseSpaces;
          bikeMarkers.push(bikeMarker)
    };
      return bikeMarkers;
    }

  });
}