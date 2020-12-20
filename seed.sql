USE whales_db;
INSERT INTO Users (firstName, lastName, userName, email, password, phoneNumber, receiveNotification, createdAt, updatedAt) VALUES ('Amanda', 'Carpentor', 'amandacar', 'amanda@amanda.com','1234', 2064120000, 1, '2020-12-09 01:02:28', '2020-12-09 01:02:28');
INSERT INTO Users (firstName, lastName, userName, email, password, phoneNumber, receiveNotification, createdAt, updatedAt) VALUES ('Sean', 'Farmer', 'seafar', 'sea@farmer.com','2342', 2064120000, 1, '2020-12-09 01:02:28', '2020-12-09 01:02:28')

INSERT INTO Sightings (UserId, city, specificLocation, description, createdAt, updatedAt) VALUES (1,'Edmonds', '15 miles east of Edmonds ferry', 'I believe i saw a whale', '2020-12-09 01:02:28', '2020-12-09 01:02:28');
INSERT INTO Sightings (UserId. city, specificLocation, description, createdAt, updatedAt) VALUES (2,'Tacoma', '15 miles east of Tacoma port', 'I believe i saw a whale', '2020-12-09 01:02:28', '2020-12-09 01:02:28');