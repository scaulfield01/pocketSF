Router.route('/', function () {
  this.render('home');
});

Router.route('/art', function () {
  this.render('art');
});

Router.route('/mobileFoods', function () {
  this.render('mobileFoods');
});

Router.route('/mobileFoodsMaps', function () {
  this.render('mobileFoodsMaps');
});

Router.route('/mobileFoodsDestinations', function () {
  this.render('mobileFoodsDestinations');
});

Router.route('/bikes', function () {
  this.render('bikes');
});

Router.route('/bikeMaps', function () {
  this.render('bikeMaps');
});

Router.route('/bikeDestinations', function() {
  this.render('bikeDestinations');
})
