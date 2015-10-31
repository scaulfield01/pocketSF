if (Meteor.isServer) {
  Meteor.methods({
    // The method expects a valid IPv4 address
    'getBikeData': function () {
      console.log('Method.getBikeData');
      // Construct the API URL
      var apiUrl = 'https://data.sfgov.org/resource/w969-5mn4.json';
      // query the API
      var response = HTTP.get(apiUrl).data;
      return response;
    }
  });
}