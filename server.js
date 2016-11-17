var faker = require('faker');

//imported modules for extracting dominant color from an image
var dominantColor   = require('dominant-color');


var mysql = require('mysql');
//installing npm module 'express'
var express = require('express');
var bodyParser = require('body-parser');

//run express
var app = express();
var PORT = process.env.PORT || 3000;

//Listener
app.listen(PORT, function(){
	console.log('Listening on port: ' + PORT);
});

app.use(bodyParser.urlencoded({ extended: false }));

//MySql/JawsDB login info
var connection = mysql.createConnection({
	host: "enqhzd10cxh7hv2e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	port: 3306,
	user: "f1cjhf802q0by1mk",
	password: "cf26j9otzoa42fea",
	database: "ija2qhszw3zfbdpc",
});

//establish connection to mysql/jawsdb
connection.connect(function(err){
	if (err){
		console.error(err.stack);
	}
	console.log('connected as ID ' + connection.threadId);
});


//root get route. display entire api.
app.get('/api', function(req,res) {
	connection.query(`SELECT * FROM photos;`, function(err, data){
		if (err) throw err;
		res.send(data);
	});
});


app.post('/addmember', function(req, res){

});


//Match algorithm
//==============================================
app.get('/match', function(req, res){
	//connect to sql databse and make query
	connection.query(`SELECT * FROM photos;`, function(err, data){
		if (err) throw err;

		//processData() finds and returns the best match
		res.json(processData(req, res, data));
	}); //END connection.query (mysql query)
}); //END '/match' route

function processData(req, res, data){
	//query mysql db
	var bestMatch;

	//test case
	var testObj = {
		//ansel adams
		url: 'http://www.fullredneck.com/wp-content/uploads/2016/06/Funny-Trump-Snapchat-Filter-15.jpg',
		bw: 1,
		photofilter: 0,
		humor: 0,
		tagword: 'trump'
	};

	//best match returned by this function
	bestMatch = {
		url: '',
		bw: '',
		photofilter: '',
		humor: '',
		differential: 1000
	};

	// var differential = 1000;

	for (var i = 0; i < data.length; i++){
		var sumOfDff = 0;
		
		var bwDiff = Math.abs(testObj.bw - data[i].bw);
		var photofilterDiff = Math.abs(testObj.photofilter - data[i].photofilter);
		var humorDiff = Math.abs(testObj.humor - data[i].humor);

		sumOfDff = sumOfDff + bwDiff + photofilterDiff + humorDiff;
		if (sumOfDff < bestMatch.differential){
			bestMatch['url'] = data[i].url;
			bestMatch['bw'] = data[i].bw;
			bestMatch['photofilter'] = data[i].photofilter;
			bestMatch['humor'] = data[i].humor;
			bestMatch['differential'] = sumOfDff;
		}		
	}//END for loop
	return bestMatch;
}//END processData()


//master function that uploads new photos to the mysql db
//this function uses a callbackfunction
//'colorCallback', which uses dominant-color npm package to identify rgb values of the dominant color in a photo
//'colorCallback' is function 'queryForDominantColor()'

function findColorUploadToDb(colorCallback){
	var photosArray = [
	'https://images.pexels.com/photos/173523/pexels-photo-173523.jpeg?h=350&auto=compress',
	'https://images.pexels.com/photos/29553/pexels-photo.jpg?h=350&auto=compress',
	'https://images.pexels.com/photos/106162/wheat-wheat-spike-wheat-field-cornfield-106162.jpeg?h=350&auto=compress&cs=tinysrgb',
	'https://images.pexels.com/photos/5412/water-blue-ocean.jpg?h=350&auto=compress&cs=tinysrgb',
	 ];

	for (var i = 0; i < photosArray.length; i++){
		//identify the dominant color in the photo, then identify which of r, g, or b is dominant in that color
		//function call using npm package dominant-color
		var photoURL= photosArray[i];
		
		// console.log('i is: ' + i);
		// console.log(color) // ['91', '108', '110'] 
		// console.log(photoURL);

		
		colorCallback(photoURL);
		// console.log(infoObj);

		
	}//END for loop
} //END findDominantColor()


//this is a callback function: 'colorCallback' parameter in findColorUploadToDb()
//this function 1. finds the rgb values of the dominant color in a photo, then
//2. calls addPhotoToDb() to upload its url and color values to the mysql db.
function queryForDominantColor(photoURL){
	var red;
	var green;
	var blue;

	var dominant = 0;
	var indexOfDominant;
	var dominantC;

	var infoObj = {};

	dominantColor(photoURL, {format: 'rgb'}, function(err, color){

	  for (var j = 0; j < color.length; j++){
	  	if (Number(color[j])> dominant) dominant = color[j];
	  }
	  
	  indexOfDominant = color.indexOf(dominant);

	  if (indexOfDominant == 0) dominantC = 'red';
	  else if (indexOfDominant == 1) dominantC = 'green';
	  else if (indexOfDominant == 2) dominantC = 'blue';
	  // console.log(indexOfDominant);

	  // console.log(photoURL);
	  infoObj['url'] = photoURL;
	  infoObj['red'] = color[0];
	  infoObj['green'] = color[1];
	  infoObj['blue'] = color[2];
	  infoObj['dominant'] = dominantC;
	  // console.log(infoObj.dominant);
	  addPhotoToDb(infoObj);
	  
	}); //END dominantColor
	
}

//this function is called by queryDominantColor();
//upload info about new photos to mysql db
function addPhotoToDb(infoObj){
	// var url = 'https://images.pexels.com/photos/173523/pexels-photo-173523.jpeg?h=350&auto=compress';
	var queryString = 'INSERT INTO photos (url, red, green, blue, dominant) VALUES (?, ?, ?, ?, ?)';
	connection.query(queryString, [infoObj.url, infoObj.red, infoObj.green, infoObj.blue, infoObj.dominant], function(err, data){
		if (err) throw err;
		console.log(data);
		// console.log('success');
	});
}	

//add photo entries to mysql/jaws db
// findColorUploadToDb(queryForDominantColor, addPhotoToDb);








// //post route -> back to home
// app.post('/create', function(req, res) {

//     //test ift
//     //console.log('You sent, ' + req.body.wish);

//     //test it
//     //res.send('You sent, ' + req.body.wish)

//     connection.query('INSERT INTO wishes (wish) VALUES (?)', [req.body.wish], function(err, result) {
//       if (err) throw err;

//       res.redirect('/');
//     });


// });
