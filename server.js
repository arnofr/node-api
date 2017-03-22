// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api! please post on /api/logon' });
});

// on routes that end in /logon
// ----------------------------------------------------
router.route('/logon').post(function(req, res) {
		res.json({ message: 'Trying to Log In with Username: '+req.body.username });
	});

	router.route('/log').post(function(req, res) {
		try {
			JSON.parse(req.body);
			res.json(req.body);
		} catch (e) {
			console.log("not JSON")
			res.json(req.body);
		}






// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
