
//PARALLAX=======================================================================
$(document).ready(function(){
	$('.parallax').parallax();

$(document).ready(function(){

	// Initializing materialize parallax display
	$('.parallax').parallax();


	// EVENT LISTENERS: 
	// Displays pop-over for username and password
	$('#login').webuiPopover({url:'#login-form'});
  // Enlarges liked pictures
  $('.materialboxed').materialbox();



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


//MODAL TRIGGER==================================================================
$('.modal').modal();
$('.modal-trigger').leanModal({
  dismissible: true, // Modal can be dismissed by clicking outside of the modal
  opacity: .5, // Opacity of modal background
  in_duration: 300, // Transition in duration
  out_duration: 200, // Transition out duration
  starting_top: '4%', // Starting top style attribute
  ending_top: '10%', // Ending top style attribute
  }
); //END MATERIALIZE
$('select').material_select();
}); //END DOC READY

  // $(document).ready(function(){
  //   $('.materialboxed').materialbox();
  // });

//CALLING FUNCTIONS: ==============================================================================================
        // $("#exploreBtn").click( function()
        //    {
        //      alert('button clicked');
        //    }
        // );
    // $('#exploreBtn').click( function() {
    // 	 alert('button clicked');
    //     var randomImg = $(this).data('image');
    //     var queryURL = "";

    //     $.ajax({
    //             url: queryURL,
    //             method: 'GET'
    //         })
    //         .done(function(response) {
    //           

    //             console.log(response)

    //               var results = response.data;


