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
      var bikeMarker = {};

      var responseLat = response[0].latitude.latitude;
      var responseLong = response[0].latitude.longitude;
      var responseName = response[0].street_name;
      var responseSpaces = response[0].spaces;
      bikeMarker.latitude = responseLat;
      bikeMarker.longitude = responseLong;
      bikeMarker.name = responseName;
      bikeMarker.spaces = responseSpaces;

      return bikeMarker;
    }

  });
}