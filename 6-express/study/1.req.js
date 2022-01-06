// 요청과 응답

import express from 'express';

const app = express();

app.get('/sky/:id', (req, res, next) => {
  // req
  console.log(req.path);
  console.log(req.headers);
  console.log(req.params); // /id
  console.log(req.params.id); // /id, 접근 req.params.id
  console.log(req.query); // /?keyword=kimsohyun!
  console.log(req.query.keyword); // 접근 req.query.keyword

  // res
  // res.send({ name: 'pji' });
  // res.sendStatus(200);
  res.setHeader('key', 'value');
  res.status(201).send('created');
});

app.listen(8080);
