require("dotenv").config();

const Pool = require("pg").Pool;
const pool = new Pool({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

module.exports = pool;
