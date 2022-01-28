// CORS

import express from 'express';
import cors from 'cors';

const app = express();

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, DELETE'
//   );
//   next();
// });

app.use(
  cors({
    origin: ['http://127.0.0.1:5500'],
    optionsSuccessStatus: 200, // 200으로 자동으로 응답하게 설정
    credentials: true, // 헤더에 토큰이나 사용자의 정보를 추가 할 수 있도록 설정, Access-Control-Allow-Credentials: true 이 헤더가 설정 되는 것과 동일
  })
);

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: '무언가 잘못 되었습니다.' });
});

app.listen(8080);
