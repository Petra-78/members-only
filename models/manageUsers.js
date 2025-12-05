const ADD_USER = `
INSERT INTO users (
  first_name,
  last_name,
  username,
  password,
  membership_status,
  admin) 
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
`;

const JOIN_TABLES = `
SELECT 
  users.first_name, 
  users.last_name, 
  messages.id AS message_id,
  messages.title, 
  messages.message, 
  messages.date
FROM users
JOIN messages ON users.id = messages.user_id;

`;

const ADD_MESSAGE = `
INSERT INTO messages (title, message, date, user_id ) 
VALUES ($1, $2, $3, $4)
`;

module.exports = { ADD_USER, JOIN_TABLES, ADD_MESSAGE };
