import express from 'express';
import { body, param, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

const validate = (req, res, next) => {
  const errors = validationResult(req); // 요청에 에러 있는지 검사하고 결과
  if (errors.isEmpty()) {
    return next();
  } else {
    // errors.err errors오브젝트에 있는 err를 사용해도 되고 array()로 배열로 변환시켜서 보내도 된다.
    return res.status(400).json({ message: errors.array()[0].msg });
  }
};

app.post(
  '/users',
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 10 })
      .withMessage('이름은 두글자 이상!'),
    body('age').isInt().withMessage('숫자를 입력해!'),
    body('email').isEmail().withMessage('이메일을 입력해!').normalizeEmail(),
    body('job.name').notEmpty().withMessage('직장명을 입력해!'),
    validate,
  ],
  (req, res) => {
    console.log(req.body);
    res.sendStatus(201);
  }
);

app.get(
  '/:email',
  param('email').isEmail().withMessage('이메일을 입력해!'),
  validate,
  (req, res) => {
    res.send('💌');
  }
);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('server error!');
});

app.listen(8080);
