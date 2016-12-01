$('#settingspane').on('click', function(){
  $('.container-profile').css('display', 'none');
});

$('#profilepane').on('click', function(){
	window.location.reload();
});

$('#resetBtn').on('click', function(){
	var userid = localStorage.getItem('userid');
	var URL = '/reset/'
	$.get('/reset/' + userid, function(data){
		console.log(data);
	});
	console.log(userid);
});

$("#slider").on("mouseup", function() { 
	var sliderNum = $('#slider').val();
	
});