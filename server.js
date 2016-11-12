var mysql = require('mysql');
var connection = mysql.createConnection({
	host: "enqhzd10cxh7hv2e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	port: 3306,
	user: "f1cjhf802q0by1mk",
	password: "cf26j9otzoa42fea",
	database: "ija2qhszw3zfbdpc",
});

module.exports = connection;

connection.connect(function(err){
	if (err){
		console.error(err.stack);
	}
	console.log('connected as ID ' + connection.threadId);
});