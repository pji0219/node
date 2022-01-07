// 라우터

import express from 'express';
import postRouter from './router/posts.js';
import userRouter from './router/users.js';

const app = express();

app.use(express.json());

app.use('/posts', postRouter);
app.use('/users', userRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: '무언가 잘못 되었습니다.' });
});

app.listen(8080);
