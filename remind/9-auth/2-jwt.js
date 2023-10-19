import jwt from 'jsonwebtoken';

const secret = '~-;7siLCRLN£6pVz>5*G;6@u&]1XdS=l';

const token = jwt.sign(
  {
    id: 'userId',
    isAdmin: 'true',
  },
  secret,
  { expiresIn: 2 }
);

console.log(token);

const edited =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InBqaSIsImlzQWRtaW4iOiJ0cnVlIiwiaWF0IjoxNjk3NzE1OTIxfQ.lKAb9h1CJDdDHTONLnucZg4YggeBTBaVwQ2HtmlNQhA';
jwt.verify(edited, secret, (error, decoded) => {
  console.log(error, decoded); // invalid signature, 서버에서 발행한 토큰을 사용자가 임의적으로 바꿀 시 시그니쳐 문자열이 변경 되므로
});

console.log(
  '_________________________________________________________________________________'
);

setTimeout(() => {
  jwt.verify(token, secret, (error, decoded) => {
    console.log(error, decoded);
  });
}, 3000);
