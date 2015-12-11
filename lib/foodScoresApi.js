FoodScores = new Mongo.Collection("foodscores");

if (Meteor.isServer) {
  Meteor.startup(function () {
    var apiUrl = 'https://data.sfgov.org/resource/7bjp-f3sp.json';
    var response = HTTP.get(apiUrl).data;

    for (var i = 0; i < response.length; i++) {
      var resName = response[i].business_name,
          resName = response[i].business_name,
          resLat = response[i].business_latitude,
          resLng = response[i].business_longitude,
          resAddress = response[i].business_address,
          resRiskCat = response[i].risk_category,
          resInspectScore = response[i].inspection_score,
          resDescript = [response[i].violation_description]

      if (FoodScores.find({name: resName}).count() > 0){
        FoodScores.update({
          name: resName},
          { $push: { insp_description: resDescript}
        });
      } else {
        FoodScores.insert({
          name: resName,
          latitude: resLat,
          longitude: resLng,
          address: resAddress,
          risk_category: resRiskCat,
          insp_score: resInspectScore,
          insp_description: resDescript
        });
      }
    };
  });

};
