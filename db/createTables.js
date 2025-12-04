const SQL = [
  `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(255),
  last_name VARCHAR (255),
  username VARCHAR(255),
  password VARCHAR(255),
  membership_status BOOLEAN NOT NULL,
  admin  BOOLEAN NOT NULL
);`,

  `CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255),
  message VARCHAR(255),
  date TIMESTAMP NOT NULL, 
  user_id INT NOT NULL REFERENCES users(id)
);`,
];

module.exports = SQL;
