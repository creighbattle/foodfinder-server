const Pool = require("pg").Pool;
const pool = new Pool({
  username: 'db',
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 25060,
  database: 'db',
  ssl: 'disabled'
  //connectionString: process.env.DATABASE_URL
});

module.exports = pool;
