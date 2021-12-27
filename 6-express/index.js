// 요청

import express from 'express';

const app = express();

app.get('/sky/:id', (req, res, next) => {
  console.log(req.path);
  console.log(req.headers);
  console.log(req.params); // /id
  console.log(req.params.id); // /id, 접근 req.params.id
  console.log(req.query); // /?keyword=kimsohyun
  console.log(req.query.keyword); // 접근 req.query.keyword

  // res.send({ name: 'pji' }); 데이터를 응답
  // res.sendStatus(200); status를 응답
  // res.status(201).send('created'); status 코드와 메세지를 응답
});

app.listen(8080);
