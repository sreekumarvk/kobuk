var http = require("http"),
    zlib = require("zlib");

function getGzipped(url, callback) {
//    callback(null, JSON.stringify({'items':[{reputations_count:10}]}));
//    return;
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

var reputations = function(req, res) {
    // initialize
    var apikey = 'vd)IDQrxymScSe9QQ*blKw((';
    var userid = 22656;
    var apiurl = 'http://api.stackexchange.com/2.1/users/' + userid + '/badges?key=' + apikey + '&order=desc&sort=rank&site=stackoverflow';

    // decompress
    getGzipped(apiurl, function(err, data) {
        if (err){
            console.log("Error returned by badge api: " + err);
        }

        // convert to json object
        var jsobj = JSON.parse(data);

        // get user info from returned json
        var user_name = jsobj.items[0].user.display_name;
        var reputation = jsobj.items[0].user.reputation;
        var accept_rate = jsobj.items[0].user.accept_rate;

        console.log("****** username: " + user_name + ", reputation: " + reputation + ", accept_rate: " + accept_rate + ". ******");

        // get expertise
        // for (var i in jsobj){
        //     var rank = jsobj.items[i].rank;
        //     var subject = jsobj.items[i].rank;

        //     console.log("++++++ rank: " + rank + ", subject: " + subject + ". ++++++");
        // }

        // construct return json


        // return to client
        console.log(jsobj.items[0].user.display_name);
        res.render("stackexchange", {'title' : "Stackexchange Badges", 'stackexchange': jsobj});
    });
}

module.exports = {
    reputations: reputations
};