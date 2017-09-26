var gifList = ["cats", "dogs"];


function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < gifList.length; i++) {

        var a = $("<button>");

        a.addClass("gif");

        a.attr("data-name", gifList[i]);

        a.text(gifList[i]);

        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();

    var gif = $("#gif-input").val().trim();

    gifList.push(gif);

    renderButtons();
});

var results;
var gifClick;
var gifImage;

$(document).on("click", ".gif", function() {
    gifClick = $(this).attr("data-name")
    ajaxCall()
});

function ajaxCall() {

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifClick + "&api_key=PaFcTgHVMUyoqzbH2TfoZpjVpeHwKWrM&limit=5";

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
            gifImage.attr("src", results[i].images.fixed_width.url);
            gifImage.attr("data-state", "animated")
            gifImage.attr("data-still", results[i].images.fixed_width_still.url);
            gifImage.attr("data-animated", results[i].images.fixed_width.url);
            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);

            $("#gifs-appear-here").prepend(gifDiv);
        }

    });
};


$(document).on("click", "img", function() {
    var state = $(this.outerHTML).attr("data-state")
    if (state === "animated") {
        $(this).attr("src", $(this.outerHTML).attr("data-still"))
        $(this).attr("data-state", "still")
    }
    if (state === "still") {
        $(this).attr("src", $(this.outerHTML).attr("data-animated"))
        $(this).attr("data-state", "animated")
    }

})

renderButtons();