MovieLocations = new Mongo.Collection("movielocations")

if (Meteor.isServer) {
  Meteor.startup(function () {
        var apiUrl = 'https://data.sfgov.org/resource/yitu-d5am.json';
        var response = HTTP.get(apiUrl).data;
        var movieMarkers = [];

        // create array of movie markers
        for (var i = 0;  i < response.length;  i++) {
              var title = response[i].title;
              var releaseYear = response[i].release_year;
              var productionCompany = response[i].production_company;
              var location = response[i].locations + "san francisco";
              var director = response[i].director;
              if (response[i].fun_facts !== null ){
                var funFact = response[i].fun_facts
              }else{
                var funFact = "N/A"
              }
              var geo = new GeoCoder({httpAdapter: "https", apiKey: 'AIzaSyDC0JV8Vmg-PhWpOp7oKcRihywF2Ufk8DA'});
              var result = geo.geocode(location)[0]
              if (result !== undefined) {
                MovieLocations.insert({title: title, releaseYear: releaseYear, productionCompany: productionCompany, location: location, funFact: funFact, director: director, movieGeo: result})
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
