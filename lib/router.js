Router.route('/', function () {
  this.render('home');
});

Router.route('/art', function () {
  this.render('art');
});

Router.route('/artdest', function () {
  this.render('artDest');
});

Router.route('/artmap', function () {
  this.render('artmap');
});


Router.route('/tba', function () {
  this.render('tba');
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
