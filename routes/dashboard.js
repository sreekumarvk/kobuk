// exports.home = function(request,response) {
//  response.send('This is dashboard');
// }

exports.home = function(request,response) {
	var data = {
		title : "Qontaqt.Me",
		id : request.params.id

	};
  response.render("dashboard", data);
}

//prabhu@3:00pm: Commenting this section as it is not needed anymore
// exports.user = function(request,response) {
//     var data = {
//         title : "Profile",
//         id : request.params.id
//     };
//     response.render("user", data);
// }
