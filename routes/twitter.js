var twitter = require("ntwitter");

var twit = new twitter({
   consumer_key:"DePUMqNclK8noq4UqaRpg",
   consumer_secret:"dfC3Ym6oqOgeamWeUfDmFlmFkeXxitnpFRDhSc8C9wQ",
   access_token_key:"5975202-GbZr1YjwgfEvGMFPz4ZhHD0qlyZqTStWJVbIqBZYlw",
   access_token_secret:"ocDW2rf3R7sLppeyvy9buB4jKyVjd1ePTutYozPoQ"
});

var getTwitter = function(screen_name, callback) {
    callback(null, [{"screen_name" : screen_name, "followers_count" : screen_name.length}]);
    return;

    twit.verifyCredentials(function(err, data) {
        if(err) {
            console.error("error authenticating." + err);
            callback(err);
            return;
        }
        console.log('verified ' + JSON.stringify(data));

        twit.showUser(screen_name, function(err, data) {
            if(err) {
                console.error("showUser error " + err);
                callback(err);
                return false;
            }

            console.log('showUser reply ' + JSON.stringify(data));

            callback(null, data);
        })
    });
}

var lookup = function(req, res) {
    var name = req.params.screen_name;


    getTwitter(req.params.screen_name, function(err, data) {
        if(err) {
            console.error("lookup REPLY" + JSON.stringify(err));
            return;
        }

        var showLayout = !req.isXMLHttpRequest;
        res.render('twitter', {
            'layout': showLayout,
            'title' : 'Twitter User Details',
            'data': data[0]});
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

module.exports = {
  lookup: lookup,
  getTwitter: getTwitter
};