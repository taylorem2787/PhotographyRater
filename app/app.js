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

// Closing login modal and hiding main-intro card when logged in
$('#submitBtn').on('click', function() {
	if (loggedIn = true) {
		$('#login').webuiPopover('hide');
		$('.main-intro').addClass('hidden');
		$('.main-intro-subnav').addClass('hidden');

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
	    
	}
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
	var currentLocation = window.location.origin;
	var URL = currentLocation + '/api/nextImage/';
	
	$.get(URL + id, function(result) {
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
			var imgContainer = $('<div class="explore-image">', {'data-col': i, 'data-row': j})
			var imgOverlay = $('<div class="explore-image__overlay">');
			var imgUpvote = $('<div class="explore-image__overlay__upvote">');
			var img = $('<img />', {src : images[i][j].url});

			imgOverlay.append(imgUpvote);
			imgContainer.append(img);
			imgContainer.append(imgOverlay);

			$('#explore-display').append(imgContainer);

			imgContainer.on('click', function(e) {
				var img = e.currentTarget;
				var row = $(img).data('row');
				var col = $(img).data('col');
				// console.log(app.images[col][row]);
				var clickedImage = app.images[col][row];
				var photoID = clickedImage.id;
				
				console.log(clickedImage);

				getImages(photoID);

				var dominant= clickedImage.dominant;
				console.log('dominant: ' + dominant);

				//for logged in users, update user color profile in mysql db
				if (userID) updateUserColors(clickedImage);
				//for logged in users, update color window
				if (userID) getLoggedUserColors(userID);
				
				//for users who aren't logged in, update user color profile, userRGB[]
				if (!userID) changeUnloggedUserColors(dominant);
				//for users who aren't logged in, update color window
				if (!userID) updateColorWindowUnlogged(unloggedRGB);
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

//update color window/bar for users who are logged in
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

//update color window/bar for users who are not logged in
function changeUnloggedUserColors(dominantColor){

	var dominant = dominantColor;
	var userRed = unloggedRGB[0];
	var userGreen = unloggedRGB[1];
	var userBlue = unloggedRGB[2];


	console.log(userRed);
	console.log(userGreen);
	console.log(userBlue);

	switch (dominant){
		case 'red':
		  if (userRed <= 235) unloggedRGB[0] = unloggedRGB[0] + 20;
		  if (userGreen >= 10) unloggedRGB[1] = unloggedRGB[1] - 10;
		  if (userBlue >= 10) unloggedRGB[2] = unloggedRGB[2] - 10;
		  break;

		case 'green':
		  if (userGreen <= 235) unloggedRGB[1] = unloggedRGB[1] + 20;
		  if (userRed >= 10) unloggedRGB[0] = unloggedRGB[0] - 10;
		  if (userBlue >= 10) unloggedRGB[2] = unloggedRGB[2] - 10;
		  break;

		case 'blue':
		  if (userBlue <= 235) unloggedRGB[2] = unloggedRGB[2] + 20;
		  if (userRed >= 10) unloggedRGB[0] = unloggedRGB[0] - 10;
		  if (userGreen >= 10) unloggedRGB[1] = unloggedRGB[1] - 10;
		  break;
	}
}

function updateColorWindowUnlogged(colorArray){
	var red = colorArray[0];
	var green = colorArray[1];
	var blue = colorArray[2];

	$('.color-window').css('background-color', `rgb(${red}, ${green}, ${blue})`);

}

//CALLING FUNCTIONS: ==============================================================================================


})(); // END MAIN CLOSURE

