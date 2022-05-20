const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const db = require("./db");
app.use(bodyParser.json());

// 테이블 생성
var list = db.list;
app.get("/", (req, res) => {
  db.connection.query(`SELECT * FROM ${list};`, (err, results) => {
    if (err) return res.json(`결과: ${results}`);
    else return res.json(results);
  });
});

// Client에서 입력한 데이터를 DB에 넣어주기
app.post("/api/value", (req, res) => {
  db.connection.query(
    `INSERT INTO ${list} (value) VALUES("${req.body.value}")`,
    (err, results) => {
      if (err) return res.send(err);
      else return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(process.env.PORT, () => console.log("listing on PORT"));
