// 유용한 내부 미들웨어들

import express from 'express';

const app = express();

app.use(express.json()); // REST API에서 body를 파싱할 때 사용
app.use(express.urlencoded({ extended: false })); // HTML form -> body, { extended: false } 옵션을 반드시 넣어줘야 함.

const option = {
  dotfiles: 'ignore',
  etag: false,
  index: false,
  maxAge: 'id',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  },
};
app.use(express.static('public', option)); // public폴더 안에 있는 파일에 접근 할 수 있게 해줌

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: '무언가 잘못 되었습니다.' });
});

app.listen(8080);
