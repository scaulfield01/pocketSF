MovieLocations = new Mongo.Collection("movielocations")

if (Meteor.isServer) {
  Meteor.startup(function () {
        var apiUrl = 'https://data.sfgov.org/resource/yitu-d5am.json';
        var response = HTTP.get(apiUrl).data;
        var movieMarkers = [];

        // create array of movie markers
        for (var i = 0;  i < 4;  i++) {
              var title = response[i].title;
              var releaseYear = response[i].release_year;
              var productionCompany = response[i].production_company;
              var location = response[i].locations + "san francisco";
              var director = response[i].director;
              var geo = new GeoCoder({httpAdapter: "https", apiKey: 'AIzaSyDiZpIGfFmr5it0fqN2YIbUQWk5hXG_kxE'});
              var result = geo.geocode(location)[0]
              if (result !== undefined) {
                MovieLocations.insert({title: title, release_year: releaseYear, production_company: productionCompany, location: location, director: director, movieGeo: result})
                console.log("Insert successful!")
              }
        };
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
