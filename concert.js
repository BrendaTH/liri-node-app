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
                for (var eachVenue = 0; eachVenue < response.data.length; eachVenue++) {
                    console.log( `
                        venue: ${response.data[eachVenue].venue.name}
                        location: ${response.data[eachVenue].venue.city} ${response.data[eachVenue].venue.region}
                        date: ${moment(response.data[eachVenue].datetime).format('MM/DD/YYYY')}
                        `
                    );
                }
            })
            .catch(function(error) {
                console.error(error);
            });

    }, // end findArtist method
}  // end module exports
