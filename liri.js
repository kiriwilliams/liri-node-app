const axios = require("axios");

require("dotenv").config();
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var userQuery = process.argv[3];
if(process.argv.length > 4){
    for (var i = 4; i < process.argv.length; i++){
        userQuery += "+"+process.argv[i];
    }
}
switch (command){
    case "concert-this":
        var bandName = userQuery;
        var venue = "";
        var location ="";
        var date = "";
        axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp").then(function(response){
            var concerts = response.data;
            concerts.forEach(function(concert){
                name = concert.venue.name;
                console.log(name);
                location = concert.venue.city + ", " + concert.venue.region + " " + concert.venue.country;
                console.log(location);
                console.log(" ");
            })
            // console.log(response.data);
        });


        break;

    case  "spotify-this-song":

    case "movie-this":

    case "do-what-it-says":

    default:
        console.log("LIRI");
        console.log("Valid commands:");
        console.log("-- concert-this");
        console.log("-- spotify-this-song");
        console.log("-- movie-this");
        console.log("-- do-what-it-says");

}