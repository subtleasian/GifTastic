const topics = ["happy", "sad", "mad", "embarrassed", "bashful", "confident", "disgusted", "confused"];

function addButtons(arr) {
  $("#buttons").empty();

  for (i = 0; i < arr.length; i++) {
    const newBtn = $("<button>");
    newBtn.attr("data-element", arr[i]);
    newBtn.attr("type", "button");
    newBtn.attr("class", "btn btn-outline-primary search-button");
    newBtn.text(arr[i]);
    $("#buttons").append(newBtn);
  }
}

$("#new-search").on("click", function() {
  event.preventDefault();
  const newSearch = $("#search-box").val().trim();
  topics.push(newSearch);
  document.getElementById("search-box").value = "";
  addButtons(topics);
});

$(document).on("click", ".gif", function() {
  console.log("clicked");
  const state = $(this).attr("data-state");
  const stillState = $(this).attr("data-still");
  const animateState = $(this).attr("data-animate");

  if (state === "still") {
    $(this).attr("src", animateState);
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", stillState);
    $(this).attr("data-state", "still");
  }
});

addButtons(topics);


$(document).on("click", ".search-button", function() {
  console.log("clicked worked");

  var search = $(this).attr("data-element");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=vYFAdbiqcCWCsxLjDlaZqwXlD8JvvyR4&limit=10";
  

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    console.log(response);
    
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);

        var gifImage = $("<img>");
        gifImage.attr("class", "gif");
        gifImage.attr("src", results[i].images.fixed_height_small_still.url);
        gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
        gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
        gifImage.attr("data-state", "still");
        
        var gifDiv = $("<div>");

        gifDiv.attr("class", "gif-div");
        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);

        $("#gif-container").prepend(gifDiv);
    }
  });
});