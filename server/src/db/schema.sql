DROP TABLE IF EXISTS USERS;

CREATE TABLE USERS (
    ID SERIAL PRIMARY KEY NOT NULL, 
    USER_NAME TEXT NOT NULL,
    PASSWORD TEXT NOT NULL,
    ROLE TEXT,
    EMAIL TEXT,
    FULL_NAME TEXT);

INSERT INTO USERS (USER_NAME, EMAIL, PASSWORD, ROLE, FULL_NAME) VALUES ('John', 'john@email.com', 'pass1', 'Admin' ,'John Smith');
INSERT INTO USERS (USER_NAME, EMAIL, PASSWORD, ROLE, FULL_NAME) VALUES ('James', 'james@email.com', 'pass2', 'User',  'James Green');
INSERT INTO USERS (USER_NAME, EMAIL, PASSWORD, ROLE, FULL_NAME) VALUES ('Alice', 'alic@email.com', 'pass3', 'User',  'Alice Black');
INSERT INTO USERS (USER_NAME, EMAIL, PASSWORD, ROLE, FULL_NAME) VALUES ('Jane', 'jane@email.com', 'pass4', 'User',  'Jane Doe');
INSERT INTO USERS (USER_NAME, EMAIL, PASSWORD, ROLE, FULL_NAME) VALUES ('Andy', 'andy@sburb.com', 'pass5', 'Admin',  'Andy Brown');

