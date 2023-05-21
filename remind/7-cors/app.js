import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 직접 cors 해결 하기 위한 header Access-Control-Allow-Origin설정
/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
  res.setHeader('Access-Control-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  next();
}); */

// 간편하게 라이브러리 사용하는 방법
app.use(
  cors({
    origin: ['http://127.0.0.1:5501'],
    optionsSuccessStatus: 200,
    credentials: true, // Access-Control-Allow-Credentials: true, 헤더에 토큰이나 사용자 정보 추가 허용
  })
);

app.get('/', (req, res) => {
  res.send('hello');
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('server error!');
});

app.listen(8080);
