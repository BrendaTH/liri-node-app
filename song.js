require("dotenv").config();
var keys    = require('./keys');
var Spotify = require("node-spotify-api");
var utils   = require("./utils");

module.exports = {
    findSong: function (nodeArgs) {
        // identify the song
        var song = '';
        if (!nodeArgs[3]) {
            song = 'The Sign';
        } else {
            song = utils.buildName(nodeArgs);
        }
        console.log('the song is: ' + song);

        // setup spotify
        var spotify = new Spotify(keys.spotify);
        spotify
            .search({ type: 'track', query: song })
            .then(function(response) {
                // console.log(response);
                // console.log(response.tracks.items[0]);

                for (var i = 0; i < response.tracks.items.length; i++) {
                    console.log( `
                        artist: ${response.tracks.items[i].artists[0].name} 
                        song: ${response.tracks.items[i].name}
                        link: ${response.tracks.items[i].external_urls.spotify}
                        album: ${response.tracks.items[i].album.name}
                        `
                    );
                }
            })
            .catch(function(err) {
                console.error("error returned from spotify");
                console.error(err);
            });
    },  // end findSong method
}       // end module exports
