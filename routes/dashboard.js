var twitter = require('./twitter');

// exports.home = function(request,response) {
//  response.send('This is dashboard');
// }

exports.home = function(request,response) {
	var data = {
		title : "QontaQt.me",
		id : request.params.id

	};
  response.render("dashboard", data);
}


exports.user = function(request,response) {
    var data = {
        title : "Profile",
        id : request.params.id,
        profiletype: "Developer", //Hardcoded for now
        services: 1 //One service to start with
    };
    response.render("user", data);
}
