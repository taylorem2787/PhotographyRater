$(document).ready(function(){

	// Initializing materialize parallax display
	$('.parallax').parallax();


	// EVENT LISTENERS: 
	// Displays pop-over for username and password
	$('#login').webuiPopover({url:'#login-form'});



}); // End of document.ready function


//GENERAL FUNCTIONS: ==============================================================================================

// General function for opening modals
function openDisplay(id) {

	switch(id) {

		case 'registration':
			console.log("opening registration modal");
			$('#registration-modal').openModal();

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


//CALLING FUNCTIONS: ==============================================================================================



