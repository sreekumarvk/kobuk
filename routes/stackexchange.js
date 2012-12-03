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
        for (var i in jsobj.items){
            var rank = jsobj.items[i].rank;
            var subject = jsobj.items[i].name;

            console.log("++++++ rank: " + rank + ", subject: " + subject + ". ++++++");


        }

        // construct badge-subject-json
        var badge_subject_json = [];
        for (var i in jsobj.items){
            var rank = jsobj.items[i].rank;
            var subject = jsobj.items[i].name;

            console.log("++++++ rank: " + rank + ", subject: " + subject + ". ++++++");

            badge_subject_json.push({rank: rank, subject: subject});

            // console.log("type of returned construct: " + typeof badge_subject_json);
        }

        // test badge-subject-json
        // status: success
        console.log("&&&&&" + badge_subject_json.length);
        for (var j in badge_subject_json){
            console.log("%%% badge was: " + badge_subject_json[j].rank + " in subject: " + badge_subject_json[j].subject + "%%%%");
        }

        // construct return-json
        var ret_json = [];
        ret_json.push({username: user_name, reputation: reputation, acceptrate: accept_rate, expertise: badge_subject_json});

        // test return-json
        // status: success
        console.log("stringifid json": JSON.stringify(ret_json);
        console.log("$$$$$" + ret_json.length);
        for (var k in ret_json){
            console.log("^^^^ User : " + ret_json[k].username + " has a reputation score of: " + ret_json[k].reputation + " and an acceptance rate of: " + ret_json[k].acceptrate + "^^^^");

            var subjectjson = ret_json[k].expertise;
            console.log("^^^^" + subjectjson.length);
            for (var l in subjectjson){
                console.log("^^^^ badge was: " + subjectjson[l].rank + " in subject: " + subjectjson[l].subject + "^^^^");
            }
        }

        // return to client
        console.log(jsobj.items[0].user.display_name);
        res.render("stackexchange", {'title' : "Stackexchange Badges", 'stackexchange': ret_json});
    });
}

module.exports = {
    reputations: reputations
};