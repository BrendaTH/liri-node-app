require("dotenv").config();
var concert = require("./concert.js");
var song    = require("./song.js");
// var movie   = require("./movie.js");

// get a managable reference to the args
var nodeArgs = process.argv;
// isolate which command
var liriCommand = nodeArgs[2];
switch (liriCommand) {
    case 'concert-this':
        concert.findArtist(nodeArgs);
        break;
    case 'spotify-this-song':
        song.findSong(nodeArgs);
        break;
    // case 'movie-this':
        // movie.findMovie(nodeArgs);
    default:
            console.error('ERROR: This command is not supported');
            break;
}