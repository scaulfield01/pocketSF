FoodScores = new Mongo.Collection("foodscores");

if (Meteor.isServer) {
  Meteor.methods({
    'getFoodScoresData': function () {
      var apiUrl = 'https://data.sfgov.org/resource/7bjp-f3sp.json';
      var response = HTTP.get(apiUrl).data
      var foodScoreMarkers = [];

      for (var i = 0; i < response.length; i++) {

        var resName = response[i].business_name;

        var resName = response[i].business_name;
        var resLat = response[i].business_latitude;
        var resLng = response[i].business_longitude;
        var resAddress = response[i].business_address;
        var resRiskCat = response[i].risk_category;
        var resInspectScore = response[i].inspection_score;
        var resDescript = [response[i].violation_description];

        if (FoodScores.find({name: resName}).count() > 0){
          //add resDescript to that record, append to description field

          FoodScores.update({name: resName}, { $push: { insp_description: resDescript}})

        } else {

          FoodScores.insert({name: resName, latitude: resLat, longitude: resLng, address: resAddress, risk_category: resRiskCat, insp_score: resInspectScore, insp_description: resDescript})
        }
      };

        // foodScoreMarker.name = resName;
        // foodScoreMarker.latitude = resLat;
        // foodScoreMarker.longitude = resLng;
        // foodScoreMarker.address = resAddress;
        // foodScoreMarker.risk_category = resRiskCat;
        // foodScoreMarker.inspect_score = resInspectScore;
        // foodScoreMarker.description = resDescript;
    }
  });
};
