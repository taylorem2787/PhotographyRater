use ija2qhszw3zfbdpc;

select * from photos;

delete 
from photos
where id >= 273 AND id <= 300;


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

DROP TABLE allusers;-- 

INSERT INTO allusers (username, password, email) VALUES ('hanbom', 'mickey', 'tmesis3@gmail.com');

idselect * 
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

select * from hanbom;

drop table hanbom;