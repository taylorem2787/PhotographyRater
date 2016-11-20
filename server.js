	//imported modules for extracting dominant color from an image
//============================================================

//npm package to extract the most dominant color from a photo,
//and break down the dominant color to RGB component values
var dominantColor = require('dominant-color');
//npm package for mysql queries
var mysql = require('mysql');
//npm server package
var express = require('express');
//npm package used for 
var bodyParser = require('body-parser');
//npm package to handle file pathways
var path = require('path');

// app.use(express.static(path.join(__dirname, 'public')));
//npm package to store sensitive info, e.g. login parameters
require('dotenv').config();

var api = require('./api');

//parameters to establish mysql connection
var connection = mysql.createConnection({
	host: process.env.dbhost,
	port: 3306,
	user: process.env.dbuser,
	password: process.env.dbpassword,
	database: "ija2qhszw3zfbdpc",
});

//run express app
var app = express();
var PORT = process.env.PORT || 3000;

//app listener
app.listen(PORT, function(){
	console.log('Listening on port: ' + PORT);
});

//express middleware for parsing info for http POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

//MySql/JawsDB login info
// var connection = mysql.createConnection({
// 	host: "enqhzd10cxh7hv2e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
// 	port: 3306,
// 	user: "f1cjhf802q0by1mk",
// 	password: "cf26j9otzoa42fea",
// 	database: "ija2qhszw3zfbdpc",
// });

//establish connection to mysql/jawsdb
connection.connect(function(err){
	if (err){
		console.error(err.stack);
	}
	console.log('connected as ID ' + connection.threadId);
});

// Static file routes
app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/css/:name', function(req, res) {
	var fileName = req.params.name;
	var options = {
		root: __dirname + '/public/css/',
		dotfiles: 'deny',
		headers: {
		    'x-timestamp': Date.now(),
		    'x-sent': true
		}
	};

	res.sendFile(fileName, options, function (err) {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		}
		else {
			console.log('Sent:', fileName);
		}
	});
});

app.get('/img/:name', function(req, res) {
	var fileName = req.params.name;
	var options = {
		root: __dirname + '/public/img/',
		dotfiles: 'deny',
		headers: {
		    'x-timestamp': Date.now(),
		    'x-sent': true
		}
	};

	res.sendFile(fileName, options, function (err) {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		}
		else {
			console.log('Sent:', fileName);
		}
	});
});

app.get('/app/:name', function(req, res) {
	var fileName = req.params.name;
	var options = {
		root: __dirname + '/app/',
		dotfiles: 'deny',
		headers: {
		    'x-timestamp': Date.now(),
		    'x-sent': true
		}
	};

	res.sendFile(fileName, options, function (err) {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		}
		else {
			console.log('Sent:', fileName);
		}
	});
});


//root get route. display entire api.
app.get('/api', function(req,res) {
	connection.query(`SELECT * FROM photos;`, function(err, data){
		if (err) throw err;
		res.send(data);
	});
});

app.get('/api/nextImage/:userId', function(req, res) {

	const userId = req.params.userId;
	api.nextImage(userId)
	.then(function(data) {
		res.send(data);
	});
});

//route, where :user is a specific user in the allusers table
//Returns the user's ID in the allusers table

app.get('/match/:user', function(req, res){
	//req.params.user corresponds to ':user' in the route
	var user = req.params.user;
	var queryString = `SELECT * FROM allusers WHERE username='` + user + `';`;
	connection.query(queryString, function(err, data){
		if (err) throw err;
		// console.log(data[0].id);
		// res.send(data[0].id.toString());
		return data[0].id;
	});
});


//add a new user to mysql db
//take values from registration form
//update mysql db using addMember()
app.post('/adduser', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;

	addMember(username, password, email);
});


//route to display photos completely randomly
//for users who aren't logged in
app.get('/photos', function(req, res){
	var queryString = `SELECT * FROM photos;`;

	connection.query(queryString, function(err, data){
		var photoArray = [];
		var photoCount = data.length;
		for (var i = 0; i < 9; i++){
			var random = Math.floor((Math.random() * photoCount));
			var url = data[random].url
			photoArray.push(url);
			// shortenURL(url);
		}
		res.send(photoArray);
	});

});

//function to update a user's color value
//this function is called when the user clicks on a photo
//'color' parameter should be the dominantHue of the clicked photo
function updateUserColors(color, userID){
	var queryString; 

	switch(color) {
		case 'red':
			queryString = `UPDATE allusers SET red=red+30, green = green-10, blue=blue-10, bw=bw-10 WHERE id=` + `'` + userID+ `;'`;
			break;

		case 'green':
			queryString = `UPDATE allusers SET green=green+30, red = red-10, blue=blue-10, bw=bw-10 WHERE id=` + `'` + userID+ `;'`;
			break;

		case 'blue':
			queryString = `UPDATE allusers SET blue=blue+30, green = green-10, red=red-10, bw=bw-10 WHERE id=` + `'` + userID+ `;'`;
			break;

		case 'bw':
			queryString = `UPDATE allusers SET bw=bw+30, green = green-10, blue=blue-10, red=red-10 WHERE id=` + `'` + userID+ `;'`;
	}

	connection.query(queryString, function(err, data){
		if (err) throw err;
		console.log(data);
	});
}

// updateUserColors('bw', 1);




function addMember(username, password, email){

	var queryString = `INSERT INTO allusers (username, password, email) VALUES (?, ?, ?);`;
	connection.query(queryString, [username, password, email], function(err, data){
		if (err) throw err;

		console.log(data);
	});
}


//route
app.get('/members', function(req, res){
	var queryString = `SELECT * FROM allusers`;
	connection.query(queryString, function(err, data){
		res.send(data);
	});
});


//function to return photos that meet exceed a certain RGB value
function findRed(redValue){
	app.get('/red', function(req,res) {
		connection.query(`SELECT * FROM photos;`, function(err, data){
			if (err) throw err;
			for (var i = 0; i < data.length; i++){
				if (data[i].red > redValue){
					res.write(data[i].url);
				}	
			}	//END for loop
		}); //END mysql query
	}); //END route
}  //END findRed()




//Reset alluser table to default value of 25 for each color
function resetMemberColors(){
	var queryString = `UPDATE allusers SET red=50, green=50, blue=50, bw=50 WHERE id > 0`;
	connection.query(queryString, function(err, data){
		if (err) throw err;
		console.log(data);
	});
}



//from thumbnail photo URL, return URL of uncompressed photo
//callback function here is shortenURL()
function largePhotoURL(photoID, callback){
	var queryString = 'SELECT url FROM photos WHERE id=?';
	connection.query(queryString, [photoID], function(err, data){
		var url;
		if (err) throw err;
		url = data[0].url;
		callback(url);		
	});	
} 
//callback function in largePhotoURL()
function shortenURL(url){
	var url = url;
	//index of '?', which is the beginning of the URL extension for compressed photos	
	var indexOfQ = url.indexOf('?h');
	console.log(indexOfQ);
	//truncate URL, beginning with '?'
	var uncompressedURL = url.substring(0, indexOfQ);
	console.log(uncompressedURL);
}

//return current RGB profile of the user
//result will be displayed on the front end
//as evolving background color
//corresponding get route
app.get('/userRGB/:userid', function(req, res){
	var rgbProfile ={};
	var userid = req.params.userid;
	var queryString = `SELECT * FROM allusers WHERE id=?;`;
	connection.query(queryString, [userid], function(err, data){
		rgbProfile.red = data[0].red;
		rgbProfile.green = data[0].green;
		rgbProfile.blue = data[0].blue;
		rgbProfile.bw = data[0].bw;
		console.log(rgbProfile);
		res.send(rgbProfile);
	});	
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


//function written as a test to find the best match. will return to this later. not used for now.
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
//'colorCallback' argument is function 'queryForDominantColor()'
//queryForDominantColor(), in turn, calls addPhotoToDb(), which uploads photo info to mysql db.		
function findColorAndUploadToDb(colorCallback){
	var photosArray = [

	 ];

	for (var i = 0; i < photosArray.length; i++){

		//identify the dominant color in the photo, then identify which of r, g, or b is dominant in that color
		//function call using npm package dominant-color
		var photoURL= photosArray[i];
		colorCallback(photoURL);
		
	}//END for loop
} //END findDominantColor()


//this is a callback function: 'colorCallback' parameter in findColorUploadToDb()
//this function 1. finds the rgb values of the dominant color in a photo, then
//2. calls addPhotoToDb() to upload its url and color values to the mysql db.

//An explanation of the color-related variables:
//A. Every photo has a dominant color
//B. The dominant color is broken down into its RGB components
//C. of the RGB components, the largest value of the three is identified as 'dominantHue'
function queryForDominantColor(photoURL){
	//RGB values of the dominant color
	var red;
	var green;
	var blue;

	//default value of the dominant hue (R, G, B) of the dominant color in the photo
	var dominant = 0;
	//the index of the largest of the R, G, and B values
	var indexOfDominant;
	//of R, G, B, the hue whose value is largest
	var dominantHue;

	//object containing the photo URL, as well as the dominant color's RGB values
	var infoObj = {};

	dominantColor(photoURL, {format: 'rgb'}, function(err, color){
	  //'color' from callback function above is an array of RGB values of the dominant color
	  //if color[0], color[1], and color[2], i.e. RGB values, are identical, it is a B&W photo
	  //dominant color, or 'dominantHue' is therefore identified as 'bw'
	  if ((color[0] === color[1]) && (color[1] === color[2])){
	  	dominantHue = 'bw';
	  }

	  //otherwise, identify which of R, G, or B, is strongest of the dominant color
	  else {
	  	//loop through color array, and identify which element is largest, i.e. R, G, or B
	  	for (var j = 0; j < color.length; j++){
	  	  if (Number(color[j])> dominant) dominant = color[j];
		}
		//find the index of the largest value in the 'color' array
	    indexOfDominant = color.indexOf(dominant);
	    //if index of largest value in the array is 0, the dominant hue is red. if 1, then green. if 2, blue.
	    if (indexOfDominant == 0) dominantHue = 'red';
	    else if (indexOfDominant == 1) dominantHue = 'green';
	    else if (indexOfDominant == 2) dominantHue = 'blue';
	  }
	  
	  // console.log(indexOfDominant);

	  // console.log(photoURL);

	  //properties of the infoObj, which will be added to the mysql db
	  infoObj['url'] = photoURL;
	  infoObj['red'] = color[0];
	  infoObj['green'] = color[1];
	  infoObj['blue'] = color[2];
	  infoObj['dominant'] = dominantHue;
	  // console.log(infoObj.dominant);

	  //this function adds entries to the 'photo' table of the mysql db
	  addPhotoToDb(infoObj);  
	}); //END dominantColor
}

//this function is called by queryDominantColor();
//upload info about new photos to mysql db
//parameter 'infoObj' is obtained from queryForDominantColor()
function addPhotoToDb(infoObj){

	var queryString = 'INSERT INTO photos (url, red, green, blue, dominant) VALUES (?, ?, ?, ?, ?)';
	connection.query(queryString, [infoObj.url, infoObj.red, infoObj.green, infoObj.blue, infoObj.dominant], function(err, data){
		if (err) throw err;
		console.log(data);
	});
}	

//add photo entries to mysql/jaws db
// findColorAndUploadToDb(queryForDominantColor); 

// });


