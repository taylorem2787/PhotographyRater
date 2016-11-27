$('#profile').on('click', function(){
	console.log('clicked');
	alert('clicked');
});

function renderProfile(userid) {
		//Display a user's liked/saved photos
		$('#profile-display').html('');
	$('#profile').on('click', function(){
		$.get('/profile' + userID, function(data){
			console.log(data);
		});
	});
}

$a.on('click', '.profileBtn', function(event) {
    console.log(event.target.id);
    alert(event.target.id);
});

// function renderProfile() {
// 	var imagesLiked = userid.clickedImage;
// 	$('#profile-display').html('');
// 	for (var i = 0; i < imagesLiked.length; i++) {
// 		for(var j = 0; j < imagesLiked[i].length; j++) {
// 			// var img = $('<img />', {src : images[i][j].url, 'data-col': i, 'data-row': j});

// 			// img.addClass('explore-image');
// 			// img.appendTo('#explore-display');

// 			var profileContainer = $('<div class="profile-image">');
// 			profileContainer.data('col', i);
// 			profileContainer.data('row', j);
// 			var imgOverlay = $('<div class="explore-image__overlay">');
// 			var imgUpvote = $('<div class="explore-image__overlay__upvote">');
// 			var img = $('<img />', {src : images[i][j].url});

// 			imgOverlay.append(imgUpvote);
// 			imgContainer.append(img);
// 			imgContainer.append(imgOverlay);

// 			$('#profile-display').append(imgContainer);

// 			imgContainer.on('click', function(e) {
// 				var img = e.currentTarget;
// 				var row = $(img).data('row');
// 				var col = $(img).data('col');
// 				var clickedImage = app.images[col][row];
// 				var photoID = clickedImage.id;
				
// 				console.log(clickedImage);

// 				getImages(photoID);

// 				var dominant= clickedImage.dominant;
// 				console.log('dominant: ' + dominant);

// 				if (userID) updateUserColors(clickedImage, userID);
// 			});

// 		}
// 	}
	// console.log(app.images)
// 	return false;
// }