MobileFoods = new Mongo.Collection("mobilefoods");

if (Meteor.isServer) {
  Meteor.startup( function () {
    var apiUrl = 'https://data.sfgov.org/resource/jjew-r69b.json';
    var response = HTTP.get(apiUrl).data;

    for (var i = 0;  i < response.length;  i++) {
      var responseLat = response[i].latitude,
          responseLng = response[i].longitude,
          responseDayofWeek = response[i].dayofweekstr,
          responseAddress = response[i].location,
          responseStartTime = response[i].starttime,
          responseEndTime = response[i].endtime,
          responseApplicant = response[i].applicant,
          responseInfo = response[i].optionaltext

      MobileFoods.insert({
        latitude: responseLat,
        longitude: responseLng,
        address: responseAddress,
        start_time: responseStartTime,
        end_time: responseEndTime,
        applicant: responseApplicant,
        info: responseInfo
      });
    };
  });
};
