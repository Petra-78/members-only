const ADD_USER = `
INSERT INTO users (username, password) VALUES ($1, $2);
`;

module.exports = { ADD_USER };
