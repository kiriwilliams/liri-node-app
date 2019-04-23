# liri-node-app

 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

 ## Installation

 LIRI's dependencies can be installed from the included package.json. You will need to supply your own Spotify API keys in an .env file in the format below.

 ```
 SPOTIFY_ID=<your-spotify-id>
 SPOTIFY_SECRET=<your-secret-id>
 ```
 These keys are accessed in `keys.js` through a process.env call.

 ## Usage

 LIRI runs in the command line using node. There are four functions available.
 
 ### concert-this
  Takes the name of an artist and returns upcoming concerts including date, venue, and location.
  ```
 node liri.js concert-this <artist>
 ```



 ### spotify-this-song
 Takes the name of a song and returns title, album, artist, and preview url.
 ```
 node liri.js spotify-this-song <song>
 ```
 __Issues with Spotify:__ 
 1. The spotify api does not always return a preview url
 2. Spotify's search algorithm is fuzzy and does not return exact matches; "The Sign" will return "Sign of the Times."

 ### movie-this
```
node liri.js movie-this <movie>
```
 ### do-what-it-says
 ```
 node liri.js do-what-it-says
 ```