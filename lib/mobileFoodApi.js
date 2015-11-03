if (Meteor.isServer) {
  Meteor.methods({
    'getMobileFoodData': function () {
      var apiUrl = 'https://data.sfgov.org/resource/jjew-r69b.json';
      var response = HTTP.get(apiUrl).data;
      var mobileFoodMarkers = [];

      for (var i = 0;  i < response.length;  i++) {
        var mobileFoodMarker = {};
        var responseLat = response[i].latitude;
        var responseLng = response[i].longitude;
        var responseDayofWeek = response[i].dayofweekstr;
        var responseAddress = response[i].location;
        var responseStartTime = response[i].starttime;
        var responseEndTime = response[i].endtime;
        var responseApplicant = response[i].applicant;
        var responseInfo = response[i].optionaltext;

        mobileFoodMarker.latitude = responseLat;
        mobileFoodMarker.longitude = responseLng;
        mobileFoodMarker.dayOfWeek = responseDayofWeek;
        mobileFoodMarker.address = responseAddress;
        mobileFoodMarker.startTime = responseStartTime;
        mobileFoodMarker.endTime = responseEndTime;
        mobileFoodMarker.vendor =responseApplicant;
        mobileFoodMarker.info = responseInfo;

        mobileFoodMarkers.push(mobileFoodMarker);
      };
      return mobileFoodMarkers;
    }
  });
};
