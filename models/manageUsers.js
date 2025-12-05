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

module.exports = { ADD_USER };
