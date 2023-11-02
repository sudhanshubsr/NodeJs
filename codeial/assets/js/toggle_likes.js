class ToggleLike {
  constructor(toggleElement) {
    this.toggler = toggleElement;
    this.toggleLike();
  }

  toggleLike() {
    
    $(this.toggler).click(function (e) {
      e.preventDefault();
      let self = this;
      let itemId = $(self).data('id');
      // Send an AJAX request to the server
      $.ajax({
        type: "Post",
        url: $(self).attr("href"),
      })
        .done(function (data) {
          // Get the current likes count and update it based on the response
          let likesCount = parseInt($(self).attr("data-likes"));
          if (data.data.deleted == true) {
            likesCount -= 1;
          } else {
            likesCount += 1;
          }

          // Update the data-likes attribute with the new likes count
          $(self).attr("data-likes", likesCount);
          // Update the displayed likes count in your HTML
          // Replace '#likes-count' with your actual HTML element selector
          $(self).html(`${likesCount} Like`);

        })
        .fail(function (errData) {
          // Handle errors if the AJAX request fails
          console.log("Error in completing the request");
        });
    });
  }
}
