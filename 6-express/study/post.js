// POST 처리 하기

import express from 'express';

const app = express();

// express에서 body에 있는 부분을 읽기 위해서는 express에서 지원 해주는 미들웨어인 express.json()을 사용해주어야 한다.
app.use(express.json());

app.post('/', (req, res, next) => {
  console.log(req.body);
});

app.use((req, res, next) => {
  res.status(404).send('존재하지 않는 경로 입니다.');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('잠시 후 다시 시도해 주세요!');
});

app.listen(8080);
