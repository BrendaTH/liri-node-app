module.exports = {


    buildName: function (nodeArgs) {
        var name = '';
        // Loop through all the words in the node argument
        // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {

            if (i > 3 && i < nodeArgs.length) {
                name = name + "+" + nodeArgs[i];
            } else {
                name += nodeArgs[i];

            }

        }
        return name;
    }


}