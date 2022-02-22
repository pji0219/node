import bcrypt from 'bcrypt';

const password = 'abcd1234';
// bcrypt: 비밀번호를 암호화하는 라이브러리

// 숫자가 길이가 10인 salt, salt라는 것은 암호화를 더욱 안전하게 해주는 추가적인 데이터
// salt를 너무 길게 할 경우 해쉬를 하는데 시간이 기하급수적으로 증가 하기 때문에 8~12가 적당하다.
const hashed = bcrypt.hashSync(password, 10);
console.log(`password: ${password} hashed: ${hashed}`);

// 사용자가 로그인할 때 입력한 비번과 해쉬된 비번을 검사하는 것(비교)
const result = bcrypt.compareSync(password, hashed);
console.log(result);
