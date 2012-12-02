$(function () { // jQuery DOMReady
    "use strict";

    $.ajax({url : '/twitter/lookup/' + user_details.twitter_name
    }).done(function(data) {
        $('#twitter').html(data);
    });

}); // End jQuery DOMReady