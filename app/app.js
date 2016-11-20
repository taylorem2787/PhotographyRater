
//PARALLAX=======================================================================
$(document).ready(function(){

	// Initializing materialize parallax display
	$('.parallax').parallax();

	// EVENT LISTENERS: 
	// Displays pop-over for username and password
	$('#login').webuiPopover({url:'#login-form'});

  // Material Box - Enlarges liked pictures
  $('.materialboxed').materialbox();

  $('.slider').slider();

}); // End of document.ready function


//GENERAL FUNCTIONS: ==============================================================================================

// General function for opening modals
function openDisplay(id) {

	switch(id) {

		case 'registration-modal':
			console.log("opening registration modal");
			$('#registration-modal').modal();

			// After registration modal is closed, run calibration function
			// $('#registration-modal').on("click", ".close-registration", function() {
			// 	openDisplay("calibration");
			// })
			// break;

        // case 'calibration':
        //     $('#calibration').openModal();
        //     console.log("opening calibration modal");
        //     break;

		default:
			console.log('oops!');
	}
}
 // Modal 
$('.modal').modal();
$('.modal-trigger').leanModal({
  dismissible: true, // Modal can be dismissed by clicking outside of the modal
  opacity: .7, // Opacity of modal background
  in_duration: 300, // Transition in duration
  out_duration: 200, // Transition out duration
  starting_top: '4%', // Starting top style attribute
  ending_top: '10%', // Ending top style attribute
  }
); //END MODAL


$('.logo').on('click', function() {
	var userId = 1;
	getImages(userId);
})

// AJAX call to the API displaying next image
function getImages(id) {
	$.get('/api/nextImage/' + id, function(result) {
		console.log(result);

		for (var i = 0; i < result.length; i++) {
			var img = $('<img />', {src : result[i].url});

			img.addClass('explore-image');
			img.appendTo('.explore-display');
		}

	});
}



//CALLING FUNCTIONS: ==============================================================================================

openDisplay();



//LOG IN FUNCTION:==============================================================================================
var loggedIn = false;

//when the user successfully logs in, 'loggedIn' toggles to true
$('#submitBtn').on('click', function(){
	//values from log in modal window
	var useremail = $('#email').val();
	var userpassword = $('#password').val();
	var currentLocation = window.location.origin;

	//make ajax call to mysql db. if login details match, 'loggedIn' is toggled to true
	$.get(currentLocation + "/members", function(data){
    	for (var i = 0; i < data.length; i++){
    		if (data[i].email === useremail && data[i].password === userpassword){
    			loggedIn = true;
    		}
    	}
	});
		return false;
});	
