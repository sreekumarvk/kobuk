exports.home = function(request,response) {
  response.send('In dashboard');
}

exports.user = function(request,response) {
  response.send(request.params.id);
}
