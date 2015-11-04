if (Meteor.isServer) {
  Meteor.methods({
    'findGeoCode': function (e){
      console.log(e)
       var userDestination = e;

       var geo = new GeoCoder({httpAdapter: "https", apiKey: Meteor.settings.googleapikey});
       var result = geo.geocode(userDestination);
       return result
     },
    'getBikeData': function () {
      // Construct the API URL
        var apiUrl = 'https://data.sfgov.org/resource/w969-5mn4.json';
        // query the API
        var response = HTTP.get(apiUrl).data;
        var bikeMarkers = [];

        // create array of bike marker objects
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
    }
  });
}
