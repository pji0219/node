import express from 'express';

const app = express();

app.get('/node/:id', (req, res, next) => {
  // console.log(req.path);
  // console.log(req.headers);
  console.log(req.params);
  console.log(req.params.id);
  console.log(req.query);
  console.log(req.query.job);

  // res.send('Hello, World!');
  // res.json({ name: 'pji' });
  // res.sendStatus(200);
  // res.status(201).send('created!');
  // res.setHeader('key', 'value');
  res.status(201).json({ name: 'pji' });
});

// all 과 use 모두 모든 http메서드를 들을 수 있지만
// all은 /api 뒤에 없는 경로 입력 시 처리가 안됨
app.all('/api', (req, res, next) => {
  console.log('all');
  res.send('all');
});

// use /sky 뒤에 없는 경로 입력 시에도 처리 됨
app.use('/sky', (req, res, next) => {
  console.log('use');
  res.send('use');
});

app.get(
  '/',
  (req, res, next) => {
    console.log('first!');
    next('route'); // 다음 미들웨어 무시하고 그 다음 미들웨어로
    // next(new Error());
  },
  (req, res, next) => {
    console.log('first2!');
    next();
  }
);

app.get('/', (req, res, next) => {
  console.log('second!');
  if (true) {
    return res.send('second!1');
  }
  res.send('second!2');
});

app.use(express.json()); // body에 들어오는 것을 파싱해서 읽도록 함

app.post('/', (req, res, next) => {
  console.log(req.body);
});

app.use((req, res, next) => {
  res.status(404).send('Not Found!');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('try later!');
});

app.listen(8080, () => {
  console.log('listen at localhost:8080');
});
