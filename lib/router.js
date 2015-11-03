Router.configure({
  layoutTemplate: 'layout'
})

Router.route('/', function () {
  this.render('home');
});

Router.route('/art', function () {
  this.render('art');
});


Router.route('/mobileFoods', function () {
  this.render('mobileFoods');
});

Router.route('/mobileFoodsMap', function () {
  this.render('mobileFoodsMap');
});

Router.route('/mobileFoodsDestinations', function () {
  this.render('mobileFoodsDestinations');
});

Router.route('/artdest', function () {
  this.render('artDest');
});

Router.route('/artmap', function () {
  this.render('artmap');
});


Router.route('/bikes', function () {
  this.render('bikes');
});

Router.route('/maps', function () {
  this.render('maps');
});

Router.route('/destinations', function() {
  this.render('destinations');
})
