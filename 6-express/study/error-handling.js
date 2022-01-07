// P에러 처리(동기, 비동기)

import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';

const app = express();

app.use(express.json());

// 동기는 try catch문을 사용해서 에러 처리를 하면 되는데 비동기는 그렇게 안된다.

/* 
  동기적일때는 에러에 대한 처리를 안했을때는 마지막에 안전망으로 에러처리 해준것으로 넘어 가지만
  비동기는 그렇게 되지 않는다.
*/

app.get('/file1', (req, res) => {
  // 동기
  try {
    const data = fs.readFileSync('/file.txt');
  } catch (error) {
    res.status(404).send('file not found');
  }

  // 비동기적일때는 콜백함수안에 err를 처리해줘야 된다.
  fs.readFile('/file1.txt', (err, data) => {
    if (err) {
      res.status(404).send('file not found');
    }
  });
});

// promise일 때는 .then과 .catch로 처리해줘야 한다.
app.get('/file2', (req, res, next) => {
  // next로 에러를 넘겨줘서 마지막에서 처리하게 하던지 콜백함수로 내부적으로 처리 하던지 해야한다.
  fsAsync.readFile('file.txt').catch((error) => next(error));
});

// async await의 경우 await로 promise로 된 함수 내부에서 동기적으로 만들었기 때문에 try catch문으로 처리 가능
app.get('/file3', async (req, res) => {
  try {
    const data = await fsAsync.readFile('/file.txt');
  } catch (error) {
    res.status(404).send('file not found');
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: '무언가 잘못 되었습니다.' });
});

app.listen(8080);
