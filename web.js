//Version
var express = require('express');
var dashboard = require('./routes/dashboard');
var twitter = require('./routes/twitter');


var app = module.exports = express.createServer(express.logger());

var port = process.env.PORT || 5000;


app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'your secret here' }));
    app.use(require('stylus').middleware({ src: __dirname + '/static' }));
    app.use(app.router);
    app.use(express.static(__dirname + '/static'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.session({ secret: "very secret" }));
});


app.listen(port, function() {
	console.log("Listening on " + port);
});

app.get('/',dashboard.home);
app.get('/:id',dashboard.user);
app.get('/dashboard',dashboard.home);
app.get('/dashboard/:id',dashboard.user);

app.get('/twitter/connect', twitter.connect);
app.get('/twitter/lookup/:screen_name', twitter.lookup);

app.get('/')

app.dynamicHelpers({
    session: function(req, res){
        return req.session;
    }
});


console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
