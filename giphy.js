// array that holds the already defined buttons of fast food items 
var food = ["frenchfries", "Burritos", "taco", "sandwich", "Pizza","burger"];
console.log(food);


// function that creates the gif buttons 
function renderButtons() {
    // remove everything from the gif button div
    $("#gif-buttons").empty();

    // Loops through the array
    for (var i = 0; i < food.length; i++) {
        // creates button for each fast food items
        var button = $("<button class='waves-effect waves-light btn'>");
        button.addClass("gifButton");
        // attr the items
        button.attr("data-name", food[i]);
        // Provided the initial button text
        button.text(food[i]);
        // Added the button to the div
        $("#gif-buttons").append(button);
    }

    // On Click function for each gif button that pushes that value into the queryURL variable
    $(".gifButton").click(function() {
        // empties the div 
        $("#food-gifs").empty();

        // stored the data-name in the variable gifClicked
        var gifClicked = $(this).attr("data-name");
        

        // URL that gets called in the ajax function that is requesting info from the Giphy API
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gifClicked + "&api_key=dc6zaTOxFJmzC&limit=10";  

      
        // ajax function that requests information from the Giphy API
        $.ajax({
                url: queryURL,
                method: "GET"
            })


            // response from giphyapi
            .done(function(response) {
                // get the data from response and store it in variable gif
                var gif = response.data;
                
                // loop through the gif reponse data
                for (i = 0; i < gif.length; i++) {
                    // create p tag
                    var p = $("<p>");
                    //add class to p
                    p.addClass("rating");
                    // add text to p tag of Rating: and the rating from the gif responses
                    p.text("Rating: " + gif[i].rating);
                    // store img tag in variable gifImg
                    var gifImg = $("<img>");

                    // set src, data-state, data-still, data-animate to the gif images
                    gifImg.attr({
                        "src": gif[i].images.fixed_height_still.url,
                        "data-state": "still",
                        "data-still": gif[i].images.fixed_height_still.url,
                        "data-animate": gif[i].images.fixed_height.url
                    });
                    // create variable state that stores the data-state
                    var state = $(this).attr("data-state", "animated");
                    // put the p tag information 
                    $("#food-gifs").prepend(p, gifImg);
                    // when you click gifImg - any image responses from the giphy API 
                    $(gifImg).click(function() {
                        // get the data-state of the one that was clicked
                        var state = $(this).attr("data-state");
                        // if data-state is still then change it to data animate and change url 
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                            // if state is animate then change it to data still and change url
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });
                };

            });

    });
};
// call render buttons function
renderButtons();
// On click for when the submit button is clicked
$("#add-button").click(function() {
    // allows you to hit enter to submit 
    event.preventDefault();
    
    // This line of code will grab the input from the textbox
    var gifInput = $("#gif-input").val().trim();
    // The input is added to the original array
    food.push(gifInput);
    // clears the input fields value
    $("#gif-input").val("");
    
    // calls the render buttons function
    renderButtons();
});