(function() {

	// State object for app
	var app = {
		images: []
	};

//PARALLAX=======================================================================
$(document).ready(function(){

	// Initializing materialize parallax display
	$('.parallax').parallax();

	// EVENT LISTENERS: 
	// Displays pop-over for username and password
	$('#login').webuiPopover({
		url:'#login-form',
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
	});

	// Material Box - Enlarges liked pictures
	$('.materialboxed').materialbox();

	$('.slider').slider();

}); // End of document.ready function


//GENERAL FUNCTIONS: ==============================================================================================

// Registration Modal 
$('.registration-modal').modal({
	dismissible: true, // Modal can be dismissed by clicking outside of the modal
	opacity: .7, // Opacity of modal background
	in_duration: 300, // Transition in duration
	out_duration: 200, // Transition out duration
	starting_top: '4%', // Starting top style attribute
	ending_top: '10%', // Ending top style attribute
	}
); //END MODAL

$('.registration-modal').on('click', function() {
	$('#login').webuiPopover('hide');
})

// Smooth scrolling to explore-display on click of Explore in Nav
// https://css-tricks.com/snippets/jquery/smooth-scrolling/
$(function() {
  $('#explore').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


// On click of 'explore-button' triggers getting user images by user ID preference
$('.explore-button').on('click', function() {
	var userId = 1;
	getImages(userId);
})

// AJAX call to the API displaying next image
function getImages(id) {
	$.get('/api/nextImage/' + id, function(result) {
		console.log(result);
		app.images = result;
		renderImages(app.images);
	});
}

function renderImages(images) {
	for (var i = 0; i < images.length; i++) {
		var img = $('<img />', {src : images[i].url});

		img.addClass('explore-image');
		img.appendTo('#explore-display');
	}

	console.log(app.images)

}

})(); // END MAIN CLOSURE

