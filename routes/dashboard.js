exports.home = function(request,response) {
  response.send('In dashboards');
}

exports.user = function(request,response) {
    var data = {
        title : "Profile",
        id : request.params.id
    };
    response.render("user", data);
}
