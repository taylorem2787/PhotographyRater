CREATE TABLE photos
(
	id int NOT NULL AUTO_INCREMENT,
	url varchar(255) NOT NULL,
	red int NOT NULL,
	green int NOT NULL,
	blue int NOT NULL,
	dominant varchar(255),
	upvotes int,
	downvotes int,
	category varchar(255),
	tagword varchar(255),
	PRIMARY KEY (id)
);


INSERT INTO photos (url, red, green, blue, dominant) VALUES (?, ?, ?, ?, ?);


CREATE TABLE allusers
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	red int DEFAULT 25,
	green int DEFAULT 25,
	blue int DEFAULT 25,
	bw int DEFAULT 25,
	totalUpvotes int,
	totalDownvotes int,
	totalUploads int,
	PRIMARY KEY (id)
);

INSERT INTO allusers (username, password, email) VALUES ('hanbom', 'mickey', 'tmesis3@gmail.com');


/*
use ija2qhszw3zfbdpc;

select * from photos;

delete 
from photos
where id >= 273 AND id <= 300;
*/