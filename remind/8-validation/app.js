import express from 'express';
import { body, param, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

app.post(
  '/users',
  [
    body('name')
      .isLength({ min: 2, max: 10 })
      .withMessage('이름은 두글자 이상!'),
    body('age').isInt().withMessage('숫자를 입력해!'),
    body('email').isEmail().withMessage('이메일을 입력해!'),
    body('job.name').notEmpty().withMessage('직장명을 입력해!'),
  ],
  (req, res) => {
    const errors = validationResult(req); // 요청에 에러 있는지 검사하고 결과
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    console.log(req.body);
    res.sendStatus(201);
  }
);

app.get(
  '/:email',
  param('email').isEmail().withMessage('이메일을 입력해!'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    res.send('💌');
  }
);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('server error!');
});

app.listen(8080);
