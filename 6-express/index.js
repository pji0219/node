// 유용한 외부 미들웨어들

import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(morgan('combined')); // combined는 포맷
app.use(helmet()); // 공통적으로 보안에 필요한 헤더를 추가해줌

app.get('/', (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  req.cookies.yummy_cookie;
  res.send('Welcome!');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: '무언가 잘못 되었습니다.' });
});

app.listen(8080);
