const mysql = require("mysql");
require("dotenv").config();
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PWD,
//   database: process.env.DB_NAME,
// });
// connection.connect();
// const list = connection.query(
//   `CREATE TABLE lists(
//     id INTEGER AUTO INCREMENT;
//     value TEXT;
//     PRIMARY KEY(id);
//   )`,
//   (err, results) => {
//     console.log(`results: ` + results);
//   }
// );

exports.pool = pool;
// exports.list = list;
