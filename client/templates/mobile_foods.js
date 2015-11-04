Template.mobileFoods.events({
  "submit .address": function(e){
    console.log('hi')
    e.preventDefault();
    var text = e.target.destination.value;
    console.log(text)
    Meteor.call('findGeoCode', text, function(err, res) {
      Session.set("userLat", res[0].latitude)
      Session.set("userLng", res[0].longitude)
      Router.go('/mobileFoodsDestinations')
    });
  }
})
