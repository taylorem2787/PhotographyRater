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

//MySql/JawsDB connection parameters
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


//root get route
app.get('/', function(req,res) {

	connection.query(`SELECT * FROM photos;`, function(err, data){
		if (err) throw err;
		res.send(data);
		console.log(data.length);
	});

});

// app.post('/upload', function(req, res){
// 	var queryString = 'INSERT INTO photos (url, bw, photofilter, humor, tagword) VALUES (?, ?, ?, ?, ?, ?), ';
// 	connection.query(queryString + );
// });



//Match algorithm
//==============================================
app.get('/match', function(req, res){
	connection.query(`SELECT * FROM photos;`, function(err, data){
		if (err) throw err;
		// res.send(processData(req, res, data));
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
		bw: 0,
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
			// bestMatch = i;
			// differential = bestMatch;
		}
	// console.log(data[bestMatch]);		
	}//END for loop
	return bestMatch;
}//END processData()


// app.post('/upload', function(req, res){
// 	connection.query('INSERT INTO photos (url, ')
// });



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
