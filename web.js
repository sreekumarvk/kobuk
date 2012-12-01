var express = require('express');
var dashboard = require('./routes/dashboard');

var app = module.exports = express.createServer(express.logger());

var port = process.env.PORT || 5000;

app.listen(port, function() {
	console.log("Listening on " + port);
});
});

app.get('/dashboard',dashboard.home);
app.get('/dashboard/:id',dashboard.user);