// 에러 처리의 모든것(동기, 비동기)
import express from 'express';
import fs from 'fs';
const app = express();
const port = 8080;

app.get('/file', (req, res) => {
  fs.readFile('/file1.txt', (err, data) => {
    if (err) {
      res.sendStatus(404);
    }
  });
});

app.get('/file1', (req, res) => {
  try {
    const data = fs.readFileSync('/file1.txt');
    res.send(data);
  } catch (err) {
    res.sendStatus(404);
  }
});

app.get('/file2', (req, res) => {
  fsAsync
    .readFile('/file2.txt') //
    .then((data) => res.send(data))
    .catch((error) => res.sendStatus(404));
});

app.get('/file3', async function(req, res) {
  try {
    const data = await fsAsync.readFile('/file2.txt');
    res.send(data);
  } catch (err) {
    res.sendStatus(404);
  }
});

// 이 마지막 에러처리는 혹시 각 라우트에서 에러처리를 안했을 경우에 안전막
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});