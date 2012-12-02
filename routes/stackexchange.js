var http = require("http"),
    zlib = require("zlib");

function getGzipped(url, callback) {
    // buffer to store the streamed decompression
    var buffer = [];

    http.get(url, function(res) {
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createGunzip();            
        res.pipe(gunzip);

        gunzip.on('data', function(data) {
            // decompression chunk ready, add it to the buffer
            buffer.push(data.toString())

        }).on("end", function() {
            // response and decompression complete, join the buffer and return
            callback(null, buffer.join("")); 

        }).on("error", function(e) {
            callback(e);
        })
    }).on('error', function(e) {
        callback(e)
    });
}

exports.reputation = function(req, res) {
    getGzipped('http://api.stackexchange.com/2.1/users/22656/reputation?site=stackoverflow', function(err, data) {
        //console.log(data);
        response.render("stackexchange", data);                
    });

}

