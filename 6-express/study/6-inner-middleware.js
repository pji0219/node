// 유용한 내부 미들웨어들
import express from 'express';
import postRouter from './router/post.js';
import userRouter from './router/user.js';

const port = 8080;
const app = express();

// REST API에서 body를 파싱할 때 씀
app.use(express.json());

// HTML form에서 submit을 할 때의 body를 파싱
app.use(express.urlencoded({ extended: false }));

const options = {
  dotfiles: 'ignore', // 숨겨진 파일은 보여주지 않도록
  etag: false,
  maxAge: '1d', // 캐시는 얼마나 오랬동안 가능한지
  redirect: false,
  setHeaders: function(res, path, stat) {
    res.set('x-timestamp', Date.now()); // 헤더를 보낼때 데이터를 추가해서 보내는 것
  }
}

// 퍼플릭 폴더 안에 있는 것을 읽게 할수 있도록 
// 일일히 코드를 안짜도 이 미들웨어로 간단히 그 기능을 구현 가능
app.use(express.static('public', options));

app.use('/posts', postRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});