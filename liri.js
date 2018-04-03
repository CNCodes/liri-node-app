
require('dotenv').config();

var keys = require('./keys.js');
var fs = require('fs');
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userInput1 = process.argv[2];
var userInput2 = process.argv[3];

function getTweets() {
    var params = {screen_name: 'SomeGuy21212', 
                  count: 20};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          for(var i = 0; i<tweets.length; i++)
        console.log(tweets[i].created_at, tweets[i].text);
      }
    }); 
}

function getSpotify() {
  if(userInput2 === undefined){
    userInput2 = 'The Sign Ace';
  } 
  spotify.search({ type: 'track', query: userInput2, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    
  console.log("-----------------");
  console.log("Album name is " + data.tracks.items[0].album.name)
  console.log("-----------------");
  console.log("Artist name is " + data.tracks.items[0].artists[0].name);
  console.log("-----------------");
  console.log("Song name is " + data.tracks.items[0].name);
  console.log("-----------------");
  if(data.tracks.items[0].preview_url === null){
    console.log('Sorry, no preivew available')
    console.log("-----------------");
  } else {
    console.log("Here's a preview " + data.tracks.items[0].preview_url);
    console.log("-----------------");
  }
  });
}

function getMovie() {
  if(userInput2 === undefined) {
    userInput2 = "Mr. Nobody"
  } 
  request("http://www.omdbapi.com/?t=" + userInput2 + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

  if (!error && response.statusCode === 200) {

   // console.log(JSON.parse(body));
    console.log('-------------');
    console.log("Title: " + JSON.parse(body).Title);
    console.log('-------------');
    console.log("Release Date: " + JSON.parse(body).Released);
    console.log('-------------');
    console.log("IMDB Rating:  " + JSON.parse(body).imdbRating);
    console.log('-------------');
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log('-------------');
    console.log("Country: " + JSON.parse(body).Country);
    console.log('-------------');
    console.log("Language: " + JSON.parse(body).Language);
    console.log('-------------');
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log('-------------');
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log('-------------');
  }
});
}

function getWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data){
    if(error){
      console.log(error)
    }
    var dataSplit = data.split(',');
    userInput1 = dataSplit[0];
    userInput2 = dataSplit[1];
    playGame();
  })
}

function playGame() {

  if (userInput1 === "my-tweets") {
    getTweets();
  } else if (userInput1 === "spotify-this-song") {
    getSpotify();
  } else if (userInput1 === "movie-this") {
    getMovie();
  } else if (userInput1 === "do-what-it-says"){
    getWhatItSays();
  }

}


    
playGame();
