
var executingClickEvent = false;
$(document).on("click", "#scrape-new-articles", function() {
  if (!executingClickEvent) {
    executingClickEvent= true;
    $.ajax({
      method: "GET",
      url: "/scrape/"
    }).then(function(data) {
      $("body").html(data);
      $.ajax({
        method: "GET",
        url: "/scrapedCount/"
      }).then(function(data) {
        alert("Scraped " + data.length + " new articles");
        executingClickEvent = false;
      });
    });
  }
});

$(document).on("click", "#home-page", function() {
  if (!executingClickEvent) {
    executingClickEvent = true;
    $.ajax({
      method: "GET",
      url: "/"
    }).then(function(data) {
      console.log(data);
      $("body").html(data);
      executingClickEvent = false;
    });
  }
});


$(document).on("click", "#saved-articles", function() {
  if (!executingClickEvent) {
    executingClickEvent = true;
    $.ajax({
      method: "GET",
      url: "/savedArticles/"
    }).then(function(data) {
      console.log(data);
      $("body").html(data);
      executingClickEvent = false;
    });
  }
});

$(document).on("click", ".my-card-save-buttons", function(event) {
  event.preventDefault();
  if (!executingClickEvent) {
    executingClickEvent = true; // for reasons I don't understand, the button click eventis fired twice
    // Empty the notes from the note section
    // $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    // Now make an ajax call for the Article
    $.ajax({
      method: "POST",
      url: "/saveArticle/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        executingClickEvent = false;
        // // The title of the article
        // $("#notes").append("<h2>" + data.title + "</h2>");
        // // An input to enter a new title
        // $("#notes").append("<input id='titleinput' name='title' >");
        // // A textarea to add a new note body
        // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // // A button to submit a new note, with the id of the article saved to it
        // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        // // If there's a note in the article
        // if (data.note) {
        //   // Place the title of the note in the title input
        //   $("#titleinput").val(data.note.title);
        //   // Place the body of the note in the body textarea
        //   $("#bodyinput").val(data.note.body);
        // }
      });
  }
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  if (!executingClickEvent) {
    executingClickEvent= true;
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
        executingClickEvent = false;
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  }
});
