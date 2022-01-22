'use strict';
import UserStorage from './userStorage.js';
import crypto from 'crypto';
import baseResponse from '../../config/responseStatus.js';

class User {
  constructor(body) {
    this.body = body;
  }
  async checkLogin() {
    const emailResult = await UserStorage.verfiedEmail(this.body.email);
    if (!emailResult.length) return baseResponse.EMAIL_NOT_EXIST;
    else {
      const hashedPassword = crypto.createHash('sha512').update(this.body.passwd).digest('hex');
      const account = [emailResult[0].id, hashedPassword];
      const passwdResult = await UserStorage.verifiedLogIn(account);
      if (passwdResult.length) return passwdResult;
      else return baseResponse.PASSWORD_IS_WRONG;
    }
  }
  async registerAccount() {
    const duplcationEmail = await UserStorage.verfiedEmail(this.body.email);
    if (duplcationEmail.length) return baseResponse.EMAIL_IS_EXIST;
    else {
      const hashedPassword = crypto.createHash('sha512').update(this.body.passwd).digest('hex');
      const account = [this.body.email, this.body.name, hashedPassword, this.body.university, this.body.phonenumber];
      const joinResult = await UserStorage.createAccount(account);
      if (joinResult.insertId) return baseResponse.SUCCESS;
      else return baseResponse.DB_ERROR;
    }
  }
}
export default User;
