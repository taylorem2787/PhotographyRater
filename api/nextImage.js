var mysql = require('mysql');

//parameters to establish mysql connection
var connection = mysql.createConnection({
	host: process.env.dbhost,
	port: 3306,
	user: process.env.dbuser,
	password: process.env.dbpassword,
	database: "ija2qhszw3zfbdpc",
});

var nextImage = function() {

	const variance = 60;

	return {
		images: [
			'test',
			'test',
			'foo',
			'bar',
			'baz'
		]
	};
};

module.exports = nextImage;