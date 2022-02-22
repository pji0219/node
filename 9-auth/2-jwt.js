import jwt from 'jsonwebtoken';

const secret = 'k7WZN&#mb@IyyMbAd4bACQSC1MBPqsQt';

// 토큰에는 너무 많은 정보가 들어가면 주고 받는데 네트워크 데이터를 많이 소모할 수 있으므로 정말 필수적인 데이터만 넣는 것이 중요하다.
const token = jwt.sign(
  {
    id: 'userId',
    isAdim: true,
  },
  secret,
  { expiresIn: 2 } // 만료
);

console.log(token);

// 3초 후 실행 되기 때문에 토큰이 만료 되었다고 나옴
setTimeout(() => {
  // 검증
  jwt.verify(token, secret, (error, decoded) => {
    console.log(error, decoded);
  });
}, 3000);
