// 필요한 모듈 가져오기
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
// Express 서버 생성
const app = express();

// JSON 형태로 오는 요청의 본문을 해석
app.use(bodyParser.json());

// Db 가져와서 연결하기
const db = require("./db");

// DB 테이블 생성
// db.pool.query(
//   `CREATE TABLE lists(
//   id INTEGER AUTO_INCREMENT,
//   value TEXT,
//   PRIMARY KEY (id)
// )`,
//   (err, result) => {
//     console.log(`result: ${result}`);
//   }
// );

// DB lists 테이블에 있는 모든 데이터를 프론트에 보여주기
app.get("/api/values", (req, res) => {
  db.pool.query(`SELECT * FROM lists;`, (err, result) => {
    if (err) return res.status(500).send(err);
    else return res.json(result);
  });
});

// 클라이언트에서 입력한 데이터를 DB lists에 넣어주기
app.post("/api/value", (req, res) => {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, result) => {
      if (err) return res.status(500).send(err);
      else return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(process.env.PORT, () => console.log("listing on PORT"));
