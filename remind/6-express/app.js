import express from 'express';
import postRouter from './router/post.js';
import userRouter from './router/user.js';

const app = express();

app.use(express.json());

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
