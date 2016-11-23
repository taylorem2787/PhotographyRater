use ija2qhszw3zfbdpc;

select * from photos;

delete 
from photos
where id >= 273 AND id <= 300;

CREATE TABLE photos
(
	id int NOT NULL AUTO_INCREMENT,
	url varchar(255) NOT NULL,
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

DROP TABLE photos;
DROP TABLE allusers;-- 

INSERT INTO allusers (username, password, email) VALUES ('hanbom', 'mickey', 'tmesis3@gmail.com');

select * 
from allusers
where username='hanbom';

/* counts total number of images */
SELECT COUNT(*) AS images
FROM photos;


UPDATE allusers
SET red = 25, green = 25, blue = 25
WHERE id = 1;

select * from allusers;

UPDATE allusers SET red=red+20, green = green-10, blue=blue-10, upvotes=upvotes+1 WHERE username='hanbom';

alter table allusers 
change bw bwCount INT;

CREATE TABLE mickey 
(
	id int, 
    url varchar (255), 
    upvoted boolean default 1, 
    uploaded boolean default 0
);

select * from tatiana;




drop table tatiana;

UPDATE photos
SET upvotes = upvotes + 1
WHERE id = 131;

UPDATE allusers
SET green = CASE
   WHEN green < 235 THEN green+20
   ELSE green
END,
	red = CASE
    WHEN red >= 10 THEN red-10
    ELSE red
END,
	blue = CASE
    WHEN blue >= 10 THEN blue-10
    ELSE blue
END
WHERE username='mickey';




SET green = CASE
	WHEN green > 9 THEN green-10
    ELSE green
	END
    
  , red = CASE
	WHEN red 

	
WHERE username='mickey';






drop table hanbom;
select * from photos;
select * from allusers;
select * from hanbom;


SELECT * FROM photos WHERE id = 100;