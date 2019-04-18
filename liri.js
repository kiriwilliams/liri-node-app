const axios = require("axios");

const moment = require("moment");
require("dotenv").config();
const Spotify = require("node-spotify-api");

const keys = require("./keys.js");

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
               
                location = concert.venue.city + ", " + concert.venue.region + "\n" + concert.venue.country;

                date = concert.datetime.split("T")[0].toString();
                date = moment(date).format("MM/DD/YYYY");
               
                console.log(date + "\n" + name + "\n" + location + "\n");
            });
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