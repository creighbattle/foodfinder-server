const Pool = require("pg").Pool;
const pool = new Pool({
  // user: "doadmin",
  // password: "ka65somv9jb3sz2i",
  // host: "db-postgresql-nyc3-40928-do-user-9293543-0.b.db.ondigitalocean.com",
  // port: 25060,
  // database: "defaultdb",
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
