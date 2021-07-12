require("dotenv").config();

const Pool = require("pg").Pool;
const pool = new Pool({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  idleTimeoutMillis: 0,
  connectionTimeoutMillisL: 0,
  // connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
