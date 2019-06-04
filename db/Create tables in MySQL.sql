CREATE DATABASE `db_training` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;

USE db_training;

CREATE TABLE City
(
    CityId		INT PRIMARY KEY,
    Name		VARCHAR(200)
);

CREATE TABLE Contact
(
	ContactId	INT AUTO_INCREMENT PRIMARY KEY,
    Gender		CHAR(1),
    DateOfBirth	DATETIME,
    FullName	VARCHAR(100),
    Email		VARCHAR(100),
    Address		VARCHAR(200),
    CityId		INT,
    Phone		VARCHAR(50),
    
    CONSTRAINT FK_City_CityId FOREIGN KEY (CityId) REFERENCES City(CityId)
);
