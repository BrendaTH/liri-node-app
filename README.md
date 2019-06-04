## REPO Name: liri-node-app
### LIRI Bot

### OVERVIEW and OPERATION
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, 
LIRI is a Language Interpretation and Recognition Interface. 
LIRI will be a command line node app that takes in parameters and gives you back data.
LIRI supports four commands:
1. movie-this
2. concert-this
3. spotify-this-song
4. do-what-it-says

### movie-this
**summary** Uses the axios package to retrieve info from the OMDB API on a particular movie.
**syntax:** node liri.js movie-this <movie name>
**return values:**
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
If <movie-name> is not provided 'Mr. Nobody' is substituted for the movie name

### concert-this
**summary:** Searches the Bands in Town Artist Events API for touring info on an artist
**syntax:** node liri.js concert-this <artist>
**return values:**
   * Name of the venue
   * Venue location
   * Date of the Event (use moment to format this as "MM/DD/YYYY")
If <artist> is not provided, this message is shown 'ERROR: an artist or band is required'

### spotify-this-song
**summary:** Use the node-spotify-api package to retrieve song information from the Spotify API
**syntax:** node liri.js spotify-this-song <song name here>
**return values:**
   * Artist(s)
   * The song's name
   * A preview link of the song from Spotify
   * The album that the song is from
If <song name> is not provided, 'The Sign' from Ace of Base is substituted.

### do-what-it-says
**summary:** Using the fs Node package, LIRI will take the text inside of random.txt and 
then use it to call one of LIRI's commands. Examples of what might be in random.txt are:
   * spotify-this-song,"I Want it That Way"
   * concert-this,"My Girl"
   * movie-this,"Wizard Of OZ"
**syntax:** node liri.js do-what-it-says
**return values:** See the other 3 commands for return values

Find a recording of LIRI bot running at [ScreenRecodingHW10.mov](ScreenRecordingHW10.mov)