SET foreign_key_checks = ON;

CREATE DATABASE IF NOT EXISTS cmsc447;
USE cmsc447;

CREATE TABLE IF NOT EXISTS users (
    username varchar(32),
    password varchar(32) NOT NULL,
    is_admin bool DEFAULT false,
    PRIMARY KEY(username)
);


CREATE TABLE IF NOT EXISTS cards (
    card_id int AUTO_INCREMENT,
    username varchar(32) NOT NULL,
    type char(3) NOT NULL,
    theme varchar(32) NOT NULL,
    option_1 varchar(256) NOT NULL,
    option_2 varchar(256) DEFAULT NULL,
    upvotes int DEFAULT 0,
    downvotes int DEFAULT 0,
    date_time date NOT NULL,
    PRIMARY KEY (card_id),
    FOREIGN KEY (username) REFERENCES users(username)
);


CREATE TABLE IF NOT EXISTS seenCards (
    username varchar(32),
    card_id INT,
    PRIMARY KEY(username, card_id),
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (card_id) REFERENCES cards(card_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS privateCards (
    card_id int AUTO_INCREMENT,
    username varchar(32) NOT NULL,
    type char(3) NOT NULL,
    theme varchar(32) NOT NULL,
    PRIMARY KEY (card_id),
    FOREIGN KEY (username) REFERENCES users(username)
);


CREATE TABLE IF NOT EXISTS submissions (
    submit_id int AUTO_INCREMENT,
    username varchar(32) NOT NULL,
    type char(3) NOT NULL,
    option_1 varchar(256) NOT NULL,
    option_2 varchar(256) DEFAULT NULL,
    PRIMARY KEY(submit_id),
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS submits (
    submit_id int,
    username varchar(32),
    PRIMARY KEY (submit_id),
    FOREIGN KEY (submit_id) REFERENCES submissions(submit_id),
    FOREIGN KEY (username) REFERENCES users(username)
);


CREATE TABLE IF NOT EXISTS creates (
    card_id int,
    username varchar(32),
    PRIMARY KEY (card_id),
    FOREIGN KEY (card_id) REFERENCES cards(card_id),
    FOREIGN KEY (username) REFERENCES users(username)
);
