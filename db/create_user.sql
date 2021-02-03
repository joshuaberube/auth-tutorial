INSERT INTO tutorial_users (email, password, username)
VALUES (${email}, ${password}, ${username})
RETURNING user_id, email, username;