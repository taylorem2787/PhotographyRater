// ===============================================================================
// ROUTING
// ===============================================================================
var connection = require('../config/connection.js');

//directory in which api routes and functions exist
var api = require('../api');

module.exports = function(app){
	//root get route. display api up to 1000 results
	app.get('/api', function(req,res) {
		connection.query(`SELECT * FROM photos LIMIT 1000;`, function(err, data){
			if (err) throw err;
			res.send(data);
		});
	});

	//route to display next nine images, when an image is clicked
	app.get('/api/nextImage/:photoID', function(req, res) {

		const photoID = req.params.photoID;
		api.nextImage(photoID)
		.then(function(data) {
			res.send(data);
		});
	});


	//get route for the profile page
	app.get('/profile/:user', function(req, res){
		var user = req.params.user;
		var queryString = `SELECT * FROM ` + user;
		connection.query(queryString, function(err, data){
			res.send(data);
		});
	});


	//Currently unused routes. may need later.
	//===============================================================

	// //route where :user is a specific user in the allusers table
	// //Returns the user's ID in the allusers table
	// app.get('/match/:user', function(req, res){
	// 	//req.params.user corresponds to ':user' in the route
	// 	var user = req.params.user;
	// 	var queryString = `SELECT * FROM allusers WHERE username='` + user + `';`;
	// 	connection.query(queryString, function(err, data){
	// 		if (err) throw err;
	// 		console.log(data[0].id);
	// 		// res.send(data[0].id.toString());
	// 		return data[0].id;
	// 	});
	// });

	//route to display photos completely randomly
	//for users who aren't logged in
	// app.get('/photos', function(req, res){
	// 	var queryString = `SELECT * FROM photos;`;

	// 	connection.query(queryString, function(err, data){
	// 		var photoArray = [];
	// 		var photoCount = data.length;
	// 		for (var i = 0; i < 9; i++){
	// 			var random = Math.floor((Math.random() * photoCount));
	// 			var url = data[random].url
	// 			photoArray.push(url);
	// 			// shortenURL(url);
	// 		}
	// 		res.send(photoArray);
	// 	});
	// });

}