import crypto from 'crypto';
import Users from './User.js';

class User {
  constructor(body) {
    this.body = body;
  }
  async loginUser() {
    const hashedPassword = crypto.createHash('sha512').update(this.body.password).digest('hex');
    const userInfo = { nickname: this.body.nickname, password: hashedPassword };
    Users.findOne(userInfo, (err, user) => {
      if (err) return { success: false, message: '로그인 실패' };
      else if (user) return { success: true, message: '로그인 성공', data: user };
      else return { success: false, message: '로그인 실패' };
    });
  }
  async createUser() {
    try {
      const hashedPassword = crypto.createHash('sha512').update(this.body.password).digest('hex');
      const params = { nickname: this.body.nickname, password: hashedPassword };
      let createUser = new Users(params);
      await createUser.save();
      return { success: true, message: `${createUser.nickname}님 환영합니다!` };
    } catch (err) {
      return { success: false, message: '이미 존재하는 닉네임입니다.' };
    }
  }
}
export default User;
