CREATE TABLE tutorial_users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(250),
    password VARCHAR(60),
    username VARCHAR(30)
);

INSERT INTO tutorial_users (email, password, username)
VALUES ('test@test.com', 'test', 'testie');