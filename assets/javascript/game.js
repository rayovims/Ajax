var topic = ["American Assasin", "The Lego Movie", "it", "kingsman","The Hitmans Bodyguard","Spider man homecoming","Up","Planet of the Apes","Dunkirk","The Emojie Movie","Girls Trip","The Dark Knight","Toy Story 3","Psycho","Finding nemo","E.T","Get Out","Baby Driver"];


function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < topic.length; i++) {

        var a = $("<button>");

        a.addClass("gif");

        a.attr("data-name", topic[i]);

        a.text(topic[i]);

        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();

    var gif = $("#gif-input").val().trim();

    topic.push(gif);

    renderButtons();

    $("#gif-input").val("");


});

var results;
var gifClick;
var gifImage;


$(document).on("click", ".gif", function() {
    gifClick = $(this).attr("data-name");
    ajaxCall();
    $("#gifs-appear-here").empty();

});

function ajaxCall() {

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifClick + "&api_key=PaFcTgHVMUyoqzbH2TfoZpjVpeHwKWrM&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        results = response.data;
        
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "animated");
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animated", results[i].images.fixed_height.url);
            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);

            $("#gifs-appear-here").prepend(gifDiv);
        }

    });
};


$(document).on("click", "img", function() {
    var state = $(this.outerHTML).attr("data-state");
    if (state === "animated") {
        $(this).attr("src", $(this.outerHTML).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    if (state === "still") {
        $(this).attr("src", $(this.outerHTML).attr("data-animated"));
        $(this).attr("data-state", "animated");
    };

});

renderButtons();