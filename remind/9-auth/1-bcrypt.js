import bcrypt from 'bcrypt';

const password = 'abc1234';
const hashed = bcrypt.hashSync(password, 10);
console.log(`password: ${password}, hashed: ${hashed}`);

const result = bcrypt.compareSync(password, hashed);
console.log(result);
