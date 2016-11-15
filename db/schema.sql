CREATE TABLE photos
(
id int NOT NULL AUTO_INCREMENT,
url varchar(255) NOT NULL,
bw boolean	NOT NULL default 0, 	/* black and white has value of 1. zero otherwise */
filter boolean NOT NULL default 0 	/* was a filter used for the photo? if so, value of 1. default value of zero */

PRIMARY KEY (id)
);

INSERT INTO photos (wish) VALUES ('Shaan wants to read minds.');
INSERT INTO photos (wish) VALUES ('John wins the lottery.');
INSERT INTO photos (wish) VALUES ('Kelly wishes for a room full of kittens.');