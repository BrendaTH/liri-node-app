var axios  = require("axios");
var moment = require("moment");
var utils  = require("./utils");

module.exports = {
    findArtist: function (nodeArgs) {
        if (!nodeArgs[3]) {
            console.error('ERROR: an artist or band is required');
            return;
        }
        // identify the artist
        var artist = utils.buildName(nodeArgs);
        console.log('the artist is: ' + artist);

        var queryUrl =  "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        console.log("query URL for concert this is: " + queryUrl);

        axios.get(queryUrl).then(
            function(response) {
                // handle the case where artist not found
                if (!response || !response.data || !response.data[0] || !response.data[0].venue) {
                    console.log('ERROR: there was a problem with the artist');
                    return console.error(response.data);
                }
                for (var eachVenue = 0; eachVenue < response.data.length; eachVenue++) {
                    console.log( `
                        venue: ${response.data[eachVenue].venue.name}
                        location: ${response.data[eachVenue].venue.city} ${response.data[eachVenue].venue.region}
                        date: ${moment(response.data[eachVenue].datetime).format('MM/DD/YYYY')}
                        `
                        );
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
                    // error.request is an object that comes back with details pertaining to the error that occurred.
                    console.log(e.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", e.message);
                  }
                console.error(`catch(${e})`);
            });

    }, // end findArtist method
}  // end module exports
