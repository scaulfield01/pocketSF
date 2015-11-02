Router.route('/', function () {
  this.render('home');
});

Router.route('/bikes', function () {
  this.render('bikes');
});

Router.route('/maps', function () {
  this.render('maps');
});

// Router.route('/bikeaddress', function() {
//   this.render('bikeaddress');
// })
