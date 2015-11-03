if (Meteor.isServer) {
  Meteor.methods({

    'getMoviesData': function () {
        var apiUrl = 'https://data.sfgov.org/resource/yitu-d5am.json';
        var response = HTTP.get(apiUrl).data;

        var movieMarkers = [];
        for (var i = 0;  i < response.length;  i++) {

              var movieMarker = {};
              var movieTitle = response[i].title
              movieMarker.title = movieTitle;
              movieMarker.location = response[i].locations;
              movieMarkers.push(movieMarker)
        };
        return movieMarkers;
    }
  });
}

  // "title" : "180",
  // "actor_1" : "Siddarth",
  // "locations" : "Mason & California Streets (Nob Hill)",
  // "release_year" : "2011",
  // "production_company" : "SPI Cinemas",
  // "actor_2" : "Nithya Menon",
  // "writer" : "Umarji Anuradha, Jayendra, Aarthi Sriram, & Suba ",
  // "director" : "Jayendra",
  // "actor_3" : "Priya Anand"