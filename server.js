var express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
var Twitter = require('twitter');
const hbs = require('hbs');

/*
hbs.registerHelper('for', function(from, to, block){
	var accum = '';

	for(var i = from; i < to; i++)
		accum += block.fn(i);

	return accum;
});
*/

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

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

app.post('/', function(req, res){
	console.log(req.body.search);
	var twats = [];
	client.get('search/tweets', {q: req.body.search}, function(error, tweets, response) {

	   tweets.statuses.forEach(function(tweet) {
	   	//console.log("tweet: ", JSON.stringify(tweet))
	   	var twat = {
	   		'uname': tweet.user.screen_name,
	   		'id': tweet.id_str,
	   		'text': tweet.text
	   	};

	   	 twats.push(twat);
	   	
	   });

	   console.log(twats);

	    res.render('index.hbs', {data: twats});


	});
});


app.post('/fav', function(req, res){
	var id = req.body.twitid.trim();
	var uname = req.body.uname;
	client.post('favorites/create', {id}, function(err, response){
        // If the favorite fails, log the error message
        if(err){

          console.log(err[0].message);
        }
        // If the favorite is successful, log the url of the tweet
        else{
        	var send = 'Favourited: '+'https://twitter.com/'+uname+'/status/'+id;
          res.render('index.hbs', {fav: send});
        }
      });
});

app.post('/retweet', function(req, res){
	var id = req.body.twitid.trim();
	var uname = req.body.uname;
	client.post('statuses/retweet', {id}, function(err, response){
        // If the favorite fails, log the error message
        if(err){

          console.log(err[0].message);
        }
        // If the favorite is successful, log the url of the tweet
        else{
          var send = 'Retweeted: '+'https://twitter.com/'+uname+'/status/'+id;
          res.render('index.hbs', {retweet: send});
        }
      });
});




console.log('SimpleRTAppAPI server started on: ' + port);