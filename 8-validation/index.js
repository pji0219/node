import express from 'express';
import { body, param, validationResult } from 'express-validator';

const app = express();
app.use(express.json());
/* 
  서버에서 빠르게 유효성 검사를 해야되는 중요한 포인트는 
  데이터베이스가 다른 서버나 클라우드에 있을 수가 있는데 그렇게 되면 접근할때 비용이 발생함으로 
  접근해서 읽고 쓰고 하기전에 유효성 검사를 하는 것이 좋다. 또 sanitization과 normalization을 해서 데이터를 일관성 있게
  보관하기 위해서이다.
*/

// 반복되는 코드라서 변수에 넣어주고 사용
const validate = (req, res, next) => {
  // 유효성 검사시 에러가 있으면 결과가 들어감
  const errors = validationResult(req);

  // errors가 비어 있지 않다면 에러가 있다는 것이니 에러를 응답
  if (!errors.isEmpty()) {
    // 에러 있다면 메세지를 응답, [0].msg 이거는 에러난 것 중에 첫번째 메세지만 응답
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  // 에러가 없으면 다음 미들웨어로 넘어감
  next();
};

app.post(
  '/users',
  [
    body('name')
      .trim() // 빈칸을 입력해서 유효성 통과되는 것을 막기 위한 것(string으로 된 공백이 있다면 없애주는 것), 잘못된 것을 표준화 해주는 것을 sanitization이라고 함
      .notEmpty()
      .withMessage('이름을 입력해!')
      .isLength({ min: 2 })
      .withMessage('이름은 두글자 이상!'),
    body('age')
      .notEmpty()
      .withMessage('나이를 입력해!')
      .isInt()
      .withMessage('숫자를 입력해!'),
    body('email').isEmail().withMessage('이메일을 입력해!').normalizeEmail(), // 대문자로 쓴 것을 표준 이메일 형식대로 소문자로 바꿔줌
    body('job.name').notEmpty().withMessage('직장을 입력해!'),
    validate,
  ],
  (req, res, next) => {
    console.log(req.body);
    res.sendStatus(201);
  }
);

app.get(
  '/:email',
  [param('email').isEmail().withMessage('이메일을 입력해!'), validate],
  (req, res, next) => {
    res.send('💌');
  }
);

app.listen(8080);
