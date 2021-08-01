// 미들웨어의 중요한 특징
import express from 'express';
const app = express();
const port = 8080;

// 해당 경로에 한해서 http request 모두 요청 가능
app.all('/api', (req, res, next) => {
  console.log('all');
  next();
});

// 해당 경로 이하의 모든 경로에 대해서 http request 모두 요청 가능
app.use('/sky', (req, res, next) => {
  console.log('use');
  next();
});

// 한 라우터에 또 콜백함수를 등록할 수 있다.
// 그리고 아래와 같이 한 경로에 여러개의 미들웨어(콜백함수)를 등록할 수 있는데 
//그러면 배열 형태로 처리가 된다.
app.get('/',
  (req, res, next) => {
    console.log('first1');
    // next를 해야 다음 미들웨어로 넘어감
    next();

    // route로 설정하면 그 다음 것을 건너 뛰고 다음 다음 미들웨어로 넘어감
    next('route');

    // 중간에 예기치 못한 에러가 발생했을 때 에러를 던질수도 있다.
    next(new Error('error'));

    // 조건에 따라서 응답을 달리 처리도 가능
    if (true) {
      return res.send('hi');
    }
    res.send('park');
  },
  (req, res, next) => {
    console.log('first2');
  }
);

app.get('/', (req, res, next) => {
  console.log('second');
  res.send('hi');
});

// 없는 경로에 요청이 왔을 경우에 이렇게 할 수 있다.
app.use((req, res, next) => {
  res.status(404).send('없는 경로 입니다! @_@');
})

// 에러를 처리하는 에러 핸들러는 앱 마지막에 달아주어야 한다.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('잠시 후에 시도해주세요!');
});

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});