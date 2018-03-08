
DROP DATABASE IF EXISTS time_bank_db;

CREATE DATABASE time_bank_db;
USE time_bank_db;

CREATE TABLE parents (
	id INTEGER AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE kids (
	id INTEGER AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	parents_id INTEGER,
	productive_time INTEGER,
	bank_time INTEGER,
	PRIMARY KEY(id)
);

CREATE TABLE tasks (
	id INTEGER AUTO_INCREMENT,
	name VARCHAR(20),
	duration INTEGER,
	kids_id INTEGER,
    task_type VARCHAR(30) NOT NULL,
	PRIMARY KEY(id)
);


ALTER TABLE `kids` ADD FOREIGN KEY (parents_id) REFERENCES `parents` (`id`);
ALTER TABLE `tasks` ADD FOREIGN KEY (kids_id) REFERENCES `kids` (`id`);


INSERT INTO parents (name) VALUES ("Nydia");
INSERT INTO kids (name, parents_id, productive_time, bank_time) VALUES ("jhon", 1, 0, 0);
INSERT INTO tasks (name, duration, kids_id, task_type) VALUES ("read a book", 60, 1, "reading");

INSERT INTO tasks (name, duration, kids_id, task_type) VALUES ("playground", 60, 1, "activity");
