// exports.home = function(request,response) {
//  response.send('This is dashboard');
// }

exports.home = function(request,response) {
	var data = {
		title : "Q.me",
		id : request.params.id

	};
  response.render("dashboard", data);
}


exports.user = function(request,response) {
    var data = {
        title : "Profile",
        id : request.params.id
    };
    response.render("user", data);
}
