if (Meteor.isServer) {
  Meteor.methods({
  'getArtData' : function () {
    var apiUrl = 'https://data.sfgov.org/resource/zfw6-95su.json';
    var response = HTTP.get(apiUrl).data;
    var artMarkers = [];

    for (var i = 1;  i < response.length;  i++){
      var artMarker = {};
      var artResponse = response[i];
      artMarker.title = artResponse.title;
      artMarker.artist = artResponse.artist;
      artMarker.created = artResponse.created_at;
      var obj = JSON.parse(artResponse.geometry);
      artMarker.location = obj.coordinates;
      artMarker.description = artResponse.location_description;
      artMarker.medium = artResponse.medium;
      artMarkers.push(artMarker);
    }
    return artMarkers;
    }
  })
}

