const express = require("express");
const redis = require("redis");
const app = express();
app.listen(5000, () => {
  console.log("Listening on 5000");
});
// redis Server 와 Node 앱이 작동하는 곳이 다른 곳이라서 host / port를 명시
// 기본포트: 6379
// 도커 외 환경 : https://redis-server.com
// 도커 : docker-compose.yml 파일에 명시한 컨테이너 이름
const client = redis.createClient({
  host: "redis-server",
  port: 6379,
});

client.set("num", 0);
app.get("/", (req, res) => {
  client.get("num", (err, num) => {
    res.send(`리프레시 할 때마다 숫자가 증가, 숫자: ${num}`);
    client.set("num", parseInt(num) + 1);
  });
});
