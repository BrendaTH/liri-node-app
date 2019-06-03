require("dotenv").config();
var keys    = require('./keys');
var Spotify = require("node-spotify-api");
var utils   = require("./utils");

module.exports = {
    findSong: function (nodeArgs) {

        // identify the song
        var song = 'The+Sign';  // default song if no song provided
        if (nodeArgs[3]) {
            song = utils.buildName(nodeArgs);
        }
        var rawSong = song.replace(/\+/g, ' ').toLowerCase();
        console.log('the song is: ' + rawSong);

        // setup spotify
        var spotify = new Spotify(keys.spotify);
        spotify
            .search({ type: 'track', query: song })
            .then(function(response) {
                // if song not found
                if (response.tracks.items.length === 0) {
                    console.log(rawSong + " not found!")
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
            .catch(function(err) {
                console.error("error returned from spotify");
                console.error(err);
            });
    },  // end findSong method
}       // end module exports
