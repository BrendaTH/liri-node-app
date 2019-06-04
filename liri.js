var concert = require("./concert");
var song    = require("./song");
var movie   = require("./movie");
var fs      = require("fs");


var liri = {
    processRequest: function(argsArray) {
        // process cmds
        var liriCommand = argsArray[2];
        switch (liriCommand) {
            case 'concert-this':
                concert.findArtist(argsArray);
                break;
            case 'spotify-this-song':
                song.findSong(argsArray);
                break;
            case 'movie-this':
                movie.findMovie(argsArray);
                break;
            default:
                    console.error('ERROR: This command is not supported');
                    break;
        }
    },

    readFile: function() {

        fs.readFile("random.txt", "utf8", function(error, data) {
            // If the code experiences any errors it will log the error to the console.
            if (error) {
              return console.error(error);
            }

            // We will then print the contents of data
            console.log("the file read: " + data);

            // split the command and the request by commas (to make it more readable)
            var dataArr = data.split(",");

            // no recursiveness here
            if (dataArr[0] === 'do-what-it-says') {
                return console.error("ERROR: cannot recursively call a command");
            }

            //****************************************** */
            // Make data read from the file look just like the process argv parameters
            // there is a cmd and a request in the file
            // ie spotify-this-song is the cmd
            //    'I want it that way' is the request
            //****************************************** */
            // the request part comes in with double quotes
            // strip them here
            dataArr[1] = dataArr[1].replace(/\"/g, "");
            // convert the request part to an array
            var requestArray = dataArr[1].split(" ");
            // get rid of the request in data array
            dataArr.pop();
            // push that request array we just made back onto datarray
            for (var i = 0; i < requestArray.length; i++) {
                dataArr.push(requestArray[i]);
            }
            // prepend two parms at the beginning to make it look like argv
            dataArr.unshift("0", "0");
            console.log(dataArr);
            liri.processRequest(dataArr);
        });
    },

} // end liri object

var nodeArgv = process.argv;

if (nodeArgv[2] === 'do-what-it-says') {
    liri.readFile();

} else {
    liri.processRequest(nodeArgv);
}
