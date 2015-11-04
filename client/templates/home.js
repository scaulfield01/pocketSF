Template.home.onRendered(function () {
  Meteor.call('getFoodScoresData');
});
