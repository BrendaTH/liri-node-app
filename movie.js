var utils   = require("./utils");
var axios   = require("axios");

module.exports = {
    findMovie: function (nodeArgs) {
        // identify the movie
        var movie = 'Mr.+Nobody';
        if (nodeArgs[3]) {
            movie = utils.buildName(nodeArgs);
        }

        var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

        axios.get(queryUrl).then(
            function(response) {
                if (response.data.Error) {
                    console.log("The movie: " + movie + " " + response.data.Error);
                } else {
                    console.log( `
                    Title: ${response.data.Title} 
                    Year: ${response.data.Year}
                    IMDB Rating: ${response.data.Ratings[0].Value}
                    Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
                    Country: ${response.data.Country}
                    Language: ${response.data.Language}
                    Plot: ${response.data.Plot}
                    Actors: ${response.data.Actors}
                    `
                    );
                }
            })
            .catch(function(error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
              console.log(error.config);
            });

    }  // end findMovie method
} // end module exports