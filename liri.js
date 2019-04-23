const axios = require("axios");
const fs = require("fs");

const moment = require("moment");
require("dotenv").config();
const Spotify = require("node-spotify-api");

const keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var userQuery = process.argv[3];

if (process.argv.length > 4) {
    for (var i = 4; i < process.argv.length; i++) {
        userQuery += "+" + process.argv[i];
    }
}
runLiri(command,userQuery);

function runLiri(command,userQuery){
    switch (command) {
        case "concert-this":
            var bandName = userQuery;
            concertSearch(bandName);
            break;
    
        case "spotify-this-song":
    
            var song = "";
            if (userQuery) {
                song = userQuery;
                console.log(song);
            }
            else {
                song = "The+Sign";
            }
            spotifySearch(song);
            break;
    
        case "movie-this":
            var move = "";
            if (userQuery) {
                movie = userQuery;
            }
            else {
                movie = "Mr.+Nobody";
            }
            movieSearch(movie);
            break;
    
        case "do-what-it-says":
            fs.readFile("./random.txt", "utf-8", function (err, data) {
                if (err) {
                    console.log(err);
                }
                var command = data.split(",")[0];
                var userQuery = data.split(",")[1];
                runLiri(command,userQuery);
                
    
            });
    
        default:
            console.log("LIRI");
            console.log("Valid commands:");
            console.log("-- concert-this");
            console.log("-- spotify-this-song");
            console.log("-- movie-this");
            console.log("-- do-what-it-says");
    
    }
}

function spotifySearch(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var firstHit = data.tracks.items[0];
        console.log(firstHit);

        console.log("\n" + firstHit.name);
        console.log("Appears on " + firstHit.album.name + " by " + firstHit.artists[0].name);
        console.log(firstHit.preview_url);

    });

    // spotify.request('https://api.spotify.com/v1/search?q=name:"'+song+'"&type=track')
    //     .then(function(data){
    //         console.log(data);
    //     })
    //     .catch(function(err){
    //         console.error('Error occurred: ' + err);
    //     })
}

function concertSearch(bandName) {

    var location = "";
    var date = "";
    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp").then(function (response) {
        var concerts = response.data;
        concerts.forEach(function (concert) {
            name = concert.venue.name;

            location = concert.venue.city + ", " + concert.venue.region + "\n" + concert.venue.country;

            date = concert.datetime.split("T")[0].toString();
            date = moment(date).format("MM/DD/YYYY");

            console.log(date + "\n" + name + "\n" + location + "\n");
        });
    });
}
function movieSearch(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log(response.data);
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country of Production: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    );
}