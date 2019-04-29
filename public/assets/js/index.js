
var executingClickEvent = false;
var $myForm = $("#myForm");
$(document).on('click', '.my-card-add-note-buttons', function (event) {
  event.preventDefault();
  if (!executingClickEvent) {
    executingClickEvent = true;
    $myForm.show();
    $("#note-text").val("");
    $("#note-title").val("");
    var thisId = $(this).attr("data-id");
    $("#note-id").val(thisId);
    // Make ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function(data) {
        $("#article-title").val(data.title);
        if (data.note) {
          // Place the title of the note in the title input
          $("#note-title").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#note-text").val(data.note.body);
          executingClickEvent = false;
        }
      });
    }
})

$(document).on('click', '.my-card-delete-note-buttons', function (event) {
  event.preventDefault();
  if (!executingClickEvent) {
    executingClickEvent = true;
    var thisId = $(this).attr("data-id");
    // Make ajax call for the Article
    $.ajax({
      method: "POST",
      url: "/deleteArticle/" + thisId
    })
      .then(function(data) {
        // Refresh the page to show the absence of the deleted article
        $.ajax({
          method: "GET",
          url: "/savedArticles/"
        }).then(function(data) {
          console.log(data);
          $("body").html(data);
          executingClickEvent = false;
        });
      });
  }
})
function closeForm() {
  $myForm.hide();
}

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
    executingClickEvent = true; // for reasons I don't understand, the button click event is fired twice
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
      });
  }
});

// When you click the savenote button
// $(document).on("click", "#savenote", function() {
function saveNote() {
  // Grab the id associated with the article from the submit button
  if (!executingClickEvent) {
    executingClickEvent = true;
    var thisId = $("#note-id").val();
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#note-title").val(),
        // Value taken from note textarea
        body: $("#note-text").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        // Empty the notes section
        $("#note-text").val("");
        executingClickEvent = false;
      });
  }
}