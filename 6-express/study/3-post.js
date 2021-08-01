// post 처리 하기
import express from 'express';
const app = express();
const port = 8080;

// 이것을 사용하면 body부분을 파싱해서 읽을 수 있다.
app.use(express.json());

app.post('/', (req, res, next) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});