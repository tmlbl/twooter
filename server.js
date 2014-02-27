var express = require('express.io'),
    jade = require('jade'),
    _ = require('underscore'),
    Twit = require('twit'),
    twoot = require('./app/scripts/twoot.js'),
    app = express().http().io();

/* Configuration */
app.configure(function () {
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/app/views');
  app.use(express.bodyParser());
  app.use('/public', express.static(__dirname + '/public'));
});

/* Create a Twit */
var T = new Twit({
  consumer_key: 'G7M6S8a3QDtp4tjnyrbwFg',
  consumer_secret: 'P8QXScg2mchNwju2zdYC3EcgFH14TCM0R90weRvZp0',
  access_token: '1085740004-AsfRkg4MR1XgumUQVZNTe1rxpkxDKfgfmmWgCvk',
  access_token_secret: 'o2pAyKnBn8kaJFUd1L29y9twXmCji7aYAE7HNNmDIFDDs'
});

/* Index controller */
app.get('/', function (req, res) {
  res.render('index');
});

app.io.route('handle', function (req) {
  console.log('Received handle: ' + req.data.handle);
  var stream = T.get('statuses/user_timeline', { screen_name: req.data.handle }, function (err, reply) {
    req.io.emit('twoots', twoot.parse(reply));
  });
});

/* Listen */
var port = process.env.PORT || 5000;
app.listen(port, function () {
        console.log('Listening on ' + port);
});