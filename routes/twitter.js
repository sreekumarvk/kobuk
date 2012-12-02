var twitter = require("ntwitter");

var twit = new twitter({
   consumer_key:"DePUMqNclK8noq4UqaRpg",
   consumer_secret:"dfC3Ym6oqOgeamWeUfDmFlmFkeXxitnpFRDhSc8C9wQ",
   access_token_key:"5975202-GbZr1YjwgfEvGMFPz4ZhHD0qlyZqTStWJVbIqBZYlw",
   access_token_secret:"ocDW2rf3R7sLppeyvy9buB4jKyVjd1ePTutYozPoQ"
});


exports.lookup = function(req, res) {
    var name = req.params.screen_name;

    twit.verifyCredentials(function(err, reply) {
        if(err) {
            console.error("error authenticating." + err);
        }
        console.log('verified ' + JSON.stringify(reply));
    });

    twit.showUser(req.params.screen_name, function(err, data) {
        if(err) {
            console.error("error getting reply." + err);
            return;
        }
        var view_data = {
            "timeline": JSON.stringify(data)
        }
        console.log('received reply ' + view_data);
        res.send(view_data);
    });

//    .getHomeTimeline('', function(err, data) {
//        if(err) {
//            console.error("error getting reply." + err);
//            return;
//        }
//        var view_data = {
//            "timeline": JSON.stringify(data)
//        }
//        console.log('received reply ' + view_data);
//        res.send(view_data);
//
//    });

};