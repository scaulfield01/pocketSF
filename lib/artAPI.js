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

// cession_id
// accession_id
// artist
// artist
// created_at
// created_at
// credit_line
// credit_line
// display_dimensions
// display_dimensions
// geometry
// geometry
// location_description
// location_description
// medium
// medium
// source
// source
// title
// title
// Location 1
// location_1