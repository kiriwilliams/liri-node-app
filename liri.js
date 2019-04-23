//DECLARE REQUIRED CONSTANTS
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
require("dotenv").config();
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);


//GET COMMANDLINE ARGS
var command = process.argv[2];
var userQuery = process.argv.splice(3).join("+");;

//call runLiri
runLiri(command,userQuery);

//FUNCTION
//takes command and userQuery
function runLiri(command,userQuery){
    //check which command the user used
    switch (command) {

        //CONCERT
        case "concert-this":
            var bandName = userQuery;
           logCommand("\n COMMAND "+command+" "+userQuery+"\n ===");
            concertSearch(bandName);
            break;
        
        //SPOTIFY
        case "spotify-this-song":
    
            var song = "";
            if (userQuery) {
                song = userQuery;
            }
            else {
                song = "The+Sign";
            }
           logCommand("\n COMMAND "+command+" "+userQuery+"\n ===");
            spotifySearch(song);
            break;
    
        //MOVIE
        case "movie-this":
            var move = "";
            if (userQuery) {
                movie = userQuery;
            }
            else {
                movie = "Mr.+Nobody";
            }
           logCommand("\n COMMAND "+command+" "+userQuery);
            movieSearch(movie);
            break;
    
        //DO WHAT IT SAYS
        case "do-what-it-says":
            fs.readFile("./random.txt", "utf-8", function (err, data) {
                if (err) {
                    console.log(err);
                }
                var command = data.split(",")[0];
                var userQuery = data.split(",")[1];
                logCommand("DO WHAT IT SAYS");   
                runLiri(command,userQuery);
            });
            break;
    
        //DEFAULT (if they used an unknown command)
        default:
            console.log("LIRI");
            console.log("Valid commands:");
            console.log("-- concert-this");
            console.log("-- spotify-this-song");
            console.log("-- movie-this");
            console.log("-- do-what-it-says");
    
    }
}

//FUNCTION - SPOTIFY
//takes a string taken from the commandline
function spotifySearch(song) {

    //spotify npm's built in function
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        //take the first returned track 
        var firstHit = data.tracks.items[0];

        //create a string with desired information
        var trackInfo = "\n" + firstHit.name + "\n Appears on " + firstHit.album.name + " by " + firstHit.artists[0].name + "\n" + firstHit.preview_url;
        
        //send it to thelogInfo function
       logInfo(trackInfo+"\n");
       console.log(trackInfo);
    });

}

//FUNCTION - CONCERT
function concertSearch(bandName) {

    var location = "";
    var date = "";

    //run axios get to bandsintown api
    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp").then(function (response) {
        var concerts = response.data;
        //loop through all returned concerts
        concerts.forEach(function (concert) {
            name = concert.venue.name;

            location = concert.venue.city + ", " + concert.venue.region + "\n" + concert.venue.country;

            date = concert.datetime.split("T")[0].toString();
            date = moment(date).format("MM/DD/YYYY");

            //create a string with desired info
            var concertInfo = date + "\n" + name + "\n" + location + "\n";

            //send tologInfo function
           logInfo(concertInfo + "\n");
           console.log(concertInfo);
        });
    });
    //include a double break after all of the concerts have been added
   logInfo("\n \n");
}

//FUNCTION - MOVIE
function movieSearch(movie) {
    //make axios call to omdb
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            var movieInfo = "\n Title: " + response.data.Title + "\n Year: " + response.data.Year+"\n IMDB Rating: " + response.data.Ratings[0].Value+ "\n Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n Country of Production: " + response.data.Country + "\n Language: " + response.data.Language + " \n Plot: " + response.data.Plot + "\n Actors: " + response.data.Actors;
           
           logInfo(movieInfo);
           console.log(movieInfo);

        }
    );
}

//FUNCTION - WRITElogInfo
function logInfo(data){
    //adds data into log.txt
    data = data+"\n ========== \n \n \n"
    fs.appendFile("log.txt",data,function(err){
        if(err){
            console.log(err);
        }
    })
}

//FUNCTION - WRITE logCommand
function logCommand(data){
    //adds which command was selected into log.txt
    fs.appendFile("log.txt",data,function(err){
        if(err){
            console.log(err);
        }
    })
}