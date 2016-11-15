var mysql = require('mysql');
//installing npm module 'express'
var express = require('express');
var bodyParser = require('body-parser');

//run express
var app = express();
var PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
	console.log('Listening on port: ' + PORT);
});

app.use(bodyParser.urlencoded({ extended: false }));


var connection = mysql.createConnection({
	host: "enqhzd10cxh7hv2e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	port: 3306,
	user: "f1cjhf802q0by1mk",
	password: "cf26j9otzoa42fea",
	database: "ija2qhszw3zfbdpc",
});


connection.connect(function(err){
	if (err){
		console.error(err.stack);
	}
	console.log('connected as ID ' + connection.threadId);
});


//root get route
app.get('/', function(req,res) {

    connection.query('SELECT * FROM photos;', function(err, data) {
      if (err) throw err;

      res.send(data);
    });
});

app.post('/upload', function(req, res){
	connection.query('INSERT INTO photos (url, ')
});


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
