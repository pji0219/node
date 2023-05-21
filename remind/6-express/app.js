import express from 'express';

import postRouter from './router/post.js';
import userRouter from './router/user.js';

const app = express();

app.use(express.json()); // REST API -> Body parsing
app.use(express.urlencoded({ extended: false })); // HTML Form -> Body parsing

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
