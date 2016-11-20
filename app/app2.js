//LOG IN FUNCTION
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
    			console.log(loggedIn);
    		}
    	}
	});

	$('#email').val('');
	$('#password').val('');
	return false;
});	

//REGISTER FUNCTION
$('#registerBtn').on('click', function(){
	// alert('hi');
	var username = $('#icon_prefix').val();
	var email = $('#icon_email').val();
	var password = $('#icon_password').val();

	var userInfo = {
		username: username,
		email: email,
		password: password
	};
	// console.log(userInfo);

	//current URL displayed in the browser, e.g. localhost:3000
	var currentLocation = window.location.origin;
	$.post(currentLocation + '/adduser', userInfo, function(data){
		console.log(status);
		alert('hiii');
	});

});