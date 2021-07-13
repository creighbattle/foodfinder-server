const Pool = require("pg").Pool;
const pool = new Pool({
  user: "hnwsvblncjnqcf",
  password: "1c05f0a1f7c9f259027979240068b9af5d8d2923a00c7701e5588add28dba1c3",
  host: "ec2-3-224-7-166.compute-1.amazonaws.com",
  database: "d9ng0oj5rinbb8",
 
});



module.exports = pool;
