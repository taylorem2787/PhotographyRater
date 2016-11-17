//imported modules for extracting dominant color from an image
//============================================================

//npm package to extract the most dominant color from a photo,
//and break down the dominant color to RGB component values
var dominantColor   = require('dominant-color');

//npm package for mysql queries
var mysql = require('mysql');

//npm server package
var express = require('express');

//npm package used for 
var bodyParser = require('body-parser');
//express middleware
app.use(bodyParser.urlencoded({ extended: false }));


//npm package to store sensitive info, e.g. login parameters
require('dotenv').config();

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
	  //dominant color, or 'dominantC' is therefore identified as 'bw'
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


