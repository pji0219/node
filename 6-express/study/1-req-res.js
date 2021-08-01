import express from 'express';
const app = express();
const port = 8080;

app.get('/sky/:id', (req, res, next) => {
  // 요청에 대해서
  // console.log(req.path);
  // console.log(req.headers);

  // sky/park
  console.log(req.params);
  console.log(req.params.id);

  // ?keyword=yooa
  console.log(req.query);
  console.log(req.query.keyword);

  // 응답에 대해서
  // send로 데이터를 보낼수 있고
  // res.send('hi!');

  // json을 보낼수도 있다.
  // res.json({data: [{name: 'park'}]});

  // header도 설정해서 보낼수 있다.
  res.setHeader('key', 'value');

  // status code도 보낼수 있다.
  // res.status(201);
  res.status(201).send('created');
});

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});