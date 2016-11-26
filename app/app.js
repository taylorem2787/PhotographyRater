(function() {

	// State object for app
	var app = {
		images: [
			[],
			[],
			[]
		]
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

  	var navHeight = $('#navbar').height();

    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - navHeight
        }, 1000);
        return false;
      }
    }
  });
});


// On click of 'explore-button' triggers getting user images by user ID preference
$('.explore-button').on('click', function() {
	var defaultPhotoId = 182;
	
	getImages(defaultPhotoId);
})

// AJAX call to the API displaying next image
function getImages(id) {
	$.get('/api/nextImage/' + id, function(result) {
		addImages(result);
		renderImages();
	});
}

function addImages(newImages) {
	for(var i in newImages) {
		var idx = Math.floor(i % 3);
		app.images[idx].push(newImages[i])
	}
}

function renderImages() {
	var images = app.images;
	$('#explore-display').html('');
	for (var i = 0; i < images.length; i++) {
		for(var j = 0; j < images[i].length; j++) {
			var img = $('<img />', {src : images[i][j].url, 'data-col': i, 'data-row': j});

			img.addClass('explore-image');
			img.appendTo('#explore-display');

			img.on('click', function(e) {
				var img = e.target;
				var row = $(img).data('row');
				var col = $(img).data('col');
				// console.log(app.images[col][row]);
				var clickedImage = app.images[col][row];
				var photoID = clickedImage.id;
				
				console.log(clickedImage);

				getImages(photoID);

				var dominant= clickedImage.dominant;
				console.log('dominant: ' + dominant);

				if (userID) updateUserColors(clickedImage);

				getLoggedUserColors(userID);
				
			});
		}
	}
	// console.log(app.images)
	return false;
}

function updateUserColors(photoInfo){

	var colorInfo = photoInfo;
	
	var currentLocation = window.location.origin;

	var URL = currentLocation + '/updateUserColors/' + userID;

	$.post(URL, colorInfo, function(data){
		console.log('data: ' + data);
	});
}

function getLoggedUserColors(userid){
	var currentLocation = window.location.origin;
	var URL = currentLocation + '/userRGB/' + userid;
	$.get(URL, function(data){
		// callback(data);
		var red = data.red;
		var green = data.green;
		var blue = data.blue;

		console.log(red);
		console.log(green);
		console.log(blue);
		$('.color-window').css('background-color', `rgb(${red}, ${green}, ${blue})`);
	});
}

function changeLoggedUserColors(colors){

}

// var getLoggedUserColors(userid) = new Promise ((resolve, reject) => {
// 	var currentLocation = window.location.origin;
// 	var URL = currentLocation + '/userRGB/' + userid;
// 	$.get(URL, function(data){
// 		callback(data);
// 	});
// });
//CALLING FUNCTIONS: ==============================================================================================


})(); // END MAIN CLOSURE

