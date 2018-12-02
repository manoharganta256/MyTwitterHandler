var express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var tweetRequestRoutes = require('./api/routes/tweetRequestRoutes');
tweetRequestRoutes(app);
var postedTweetRoutes = require('./api/routes/postedTweetRoutes');
postedTweetRoutes(app);

app.listen(port);

app.get('/', function (req, res) {
    res.render('index.hbs')
});

console.log('SimpleRTAppAPI server started on: ' + port);