require("dotenv").config();
var keys    = require('./keys');
var Spotify = require("node-spotify-api");
var utils   = require("./utils");

module.exports = {
    findSong: function (nodeArgs) {

        // identify the song
        var song = 'The Sign';  // default song if no song provided
        if (nodeArgs[3]) {
            // make song name into a string with split into +
            song = utils.buildName(nodeArgs);
        }
        // remove the + from the string and make it all lower case
        var rawSong = song.replace(/\+/g, ' ').toLowerCase();

        // setup spotify
        var spotify = new Spotify(keys.spotify);
        spotify
            .search({ type: 'track', query: rawSong })
            .then(function(response) {
                // if song not found
                if (response.tracks.items.length === 0) {
                    console.error('ERROR: ' + rawSong + " not found!")
                }
                // for every item returned
                for (var i = 0; i < response.tracks.items.length; i++) {
                    // if there is a match with the song title
                    if (response.tracks.items[i].name.toLowerCase() === rawSong) {
                        console.log( `
                        artist: ${response.tracks.items[i].artists[0].name} 
                        song: ${response.tracks.items[i].name}
                        link: ${response.tracks.items[i].external_urls.spotify}
                        album: ${response.tracks.items[i].album.name}
                        `
                        );
                    }
                }
            })
            .catch(function(e) {
                if (e.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(e.response.data);
                    console.log("---------------Status---------------");
                    console.log(e.response.status);
                    console.log("---------------Status---------------");
                    console.log(e.response.headers);
                  } else if (e.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(e.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", e.message);
                  }
                  console.log(e);
            });
    },  // end findSong method
}       // end module exports
