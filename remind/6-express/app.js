import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import postRouter from './router/post.js';
import userRouter from './router/user.js';

const app = express();

app.use(express.json()); // REST API -> Body parsing
app.use(express.urlencoded({ extended: false })); // HTML Form -> Body parsing
app.use(cookieParser());
app.use(morgan('tiny')); // comnined이 기본 포맷, 요청 등등 각종 정보 표시하는 미들웨어
app.use(helmet()); // 공통적으로 보안에 필요한 헤더를 추가해줌

const options = {
  dotfiles: 'ignore', // 숨김 파일 안보이게
  etag: false,
  index: false,
  maxAge: '1d', // 캐시 얼마 기간 동안 유지
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now()); // 헤더에 추가
  },
};
app.use(express.static('public', options)); // public폴더에 있는 것을 접근하기 위한 것

app.use('/posts', postRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  console.log(req.cookies.yummy_cookie);
  res.send('Hi');
});

app.use((req, res) => {
  res.status(404).send('Not Found!');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('try later!');
});

app.listen(8080, () => {
  console.log('listen at localhost:8080');
});
