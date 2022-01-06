// 미들웨어의 중요한 특징

import express from 'express';

const app = express();

// all은 어떤 http메서드로 요청을 하던 모두 응답 된다. (경로는 /api에 한해서만)
app.all('/api', (req, res, next) => {
  console.log('all');
  next();
});

// use는 /sky 뒤에 없는 경로를 쓰고(어떤 경로를 쓰던) 요청을 해도 응답 됨.
app.use('/sky', (req, res, next) => {
  console.log('use');
  next();
});

// 미들웨어의 콜백함수는 아래처럼 하나의 경로에 여러개를 등록할 수 있다.
app.get(
  '/',
  (req, res, next) => {
    console.log('첫번째');

    // next('route'); 같은 경로에 함께 등록된 배열(콜백함수)를 무시하고 다음 미들웨어로 넘어감.

    if (true) {
      // if문을 써야 할 경우에는 같은 경로에서 두개의 응답을 할 수 없기 때문에 리턴을 써주어서 미들웨어를 나가 주어야 한다.
      return res.send('Hello~');
    }

    res.send('hi~');
  },
  (req, res, next) => {
    console.log('첫번째2');
  }
);

app.get('/', (req, res, next) => {
  console.log('두번째');
});

// 없는 경로로 요청을 보내서 어떠한 미들웨어도 응답을 하지 못하거나 미들웨어에서 응답하는 코드가 없어서 응답을 못할 때 처리 해줌.
app.use((req, res, next) => {
  res.status(404).send('존재하지 않는 경로 입니다.');
});

// 에러 핸들러, 마지막에 에러 핸들러를 달아주면 중간에 에러가 났을 때 에러에 대해서 처리를 해준다.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('잠시 후 다시 시도해 주세요!');
});

app.listen(8080);
