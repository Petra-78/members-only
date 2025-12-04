const pool = require("./pool");

const DROP_TABLES = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
`;

(async () => {
  try {
    await pool.query(DROP_TABLES);
    console.log("Tables dropped successfully.");
  } catch (err) {
    console.error("Error dropping tables:", err);
  } finally {
    await pool.end();
  }
})();

module.exports = DROP_TABLES;
