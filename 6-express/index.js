// P에러 처리(동기, 비동기)

import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';

const app = express();

app.use(express.json());

app.get('/file1', (req, res) => {
  // try {
  //   const data = fs.readFileSync('/file.txt');
  // } catch (error) {
  //   res.status(404).send('file not found');
  // }

  // 비동기적일때는 콜백함수안에 err를 처리해줘야 된다.
  fs.readFile('/file1.txt', (err, data) => {
    if (err) {
      res.status(404).send('file not found');
    }
  });
});

app.get('/file2', (req, res) => {
  fsAsync.readFile('file.txt');
});

app.get('/file3', async (req, res) => {
  const data = await fsAsync.readFile('/file.txt');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: '무언가 잘못 되었습니다.' });
});

app.listen(8080);
