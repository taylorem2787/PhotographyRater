CREATE TABLE photos
(
	id int NOT NULL AUTO_INCREMENT,
	url varchar(255) NOT NULL UNIQUE,
	red int NOT NULL,
	green int NOT NULL,
	blue int NOT NULL,
	dominant varchar(255),
	upvotes int DEFAULT 0,
	downvotes int DEFAULT 0,
	category varchar(255),
	tagword varchar(255),
	PRIMARY KEY (id)
);


INSERT INTO photos (url, red, green, blue, dominant) VALUES (?, ?, ?, ?, ?);


CREATE TABLE allusers
(
	username varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	red int DEFAULT 100,
	green int DEFAULT 100,
	blue int DEFAULT 100,
	bwCount int DEFAULT 0,
	upvotes int DEFAULT 0,
	downvotes int DEFAULT 0,
	totalUploads int DEFAULT 0,
	PRIMARY KEY (username)
);

INSERT INTO allusers (username, password, email) VALUES ('hanbom', 'mickey', 'tmesis3@gmail.com');


CREATE TABLE mickey 
(
	id int, 
    url varchar (255), 
    upvoted boolean default 1, 
    uploaded boolean
);

/*
use ija2qhszw3zfbdpc;

select * from photos;

delete 
from photos
where id >= 273 AND id <= 300;
*/