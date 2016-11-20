var loggedIn = false;

//when the user successfully logs in, 'loggedIn' toggles to true
$('#submitBtn').on('click', function(){
	//values from log in modal window
	var useremail = $('#email').val();
	var userpassword = $('#password').val();
	var currentLocation = window.location.origin;

	console.log('hi');
	//make ajax call to mysql db. if login details match, 'loggedIn' is toggled to true
	$.get(currentLocation + "/members", function(data){
    	for (var i = 0; i < data.length; i++){
    		if (data[i].email === useremail && data[i].password === userpassword){
    			loggedIn = true;
    			console.log(loggedIn);
    		}
    	}
	});
		return false;
});	