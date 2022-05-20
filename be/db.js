const { text } = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();
// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PWD,
//   database: process.env.DB_NAME,
// });
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});
connection.connect();
const list = connection.query(
  `CREATE TABLE lists(
    id INTEGER AUTO INCREMENT;
    value TEXT;
    PRIMARY KEY(id);
  )`,
  (err, results) => {
    console.log(`results: ` + results);
  }
);

exports.connection = connection;
exports.list = list;
