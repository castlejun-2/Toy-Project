'use strict';
import UserStorage from './userStorage.js';
import crypto from 'crypto';
import baseResponse from '../../config/responseStatus.js';
import nodemailer from 'nodemailer';

class User {
  constructor(body) {
    this.body = body;
  }
  async checkLogin() {
    try {
      const emailResult = await UserStorage.verfiedEmail(this.body.email);
      if (!emailResult.length) return baseResponse.EMAIL_NOT_EXIST;
      else {
        const hashedPassword = crypto.createHash('sha512').update(this.body.passwd).digest('hex');
        const account = [emailResult[0].id, hashedPassword];
        const passwdResult = await UserStorage.verifiedLogIn(account);
        if (passwdResult.length) return passwdResult;
        else return baseResponse.PASSWORD_IS_WRONG;
      }
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
  async registerAccount() {
    try {
      const duplcationEmail = await UserStorage.verfiedEmail(this.body.email);
      if (duplcationEmail.length) return baseResponse.EMAIL_IS_EXIST;
      else {
        const hashedPassword = crypto.createHash('sha512').update(this.body.passwd).digest('hex');
        const account = [
          this.body.email,
          this.body.name,
          hashedPassword,
          this.body.address,
          this.body.placeLA,
          this.body.placeLO,
          this.body.school,
          this.body.phonenumber,
        ];
        const joinResult = await UserStorage.createAccount(account);
        if (joinResult.insertId) return baseResponse.SUCCESS;
      }
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
  async passwdReset() {
    try {
      const hashedPassword = crypto.createHash('sha512').update(this.body[0]).digest('hex');
      const userInfoByToken = await UserStorage.getUserIdByToken(this.body[1]);
      const params = [hashedPassword, userInfoByToken[0].userId];
      if (userInfoByToken[0].valid) {
        const passwdResetResult = await UserStorage.settingPasswd(params);
        return baseResponse.SUCCESS;
      } else return baseResponse.TOKEN_TIMEOUT;
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
  async passwdSendEmail() {
    try {
      const emailId = await UserStorage.verfiedEmail(this.body);
      if (emailId[0]) {
        const token = crypto.randomBytes(20).toString('hex');
        const data = [emailId[0].id, token, 300]; //token, email의 userId, TTL 값
        await UserStorage.createAuthToken(data);

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 465,
          secure: true,
          auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASSWORD,
          },
        });
        const emailOptions = {
          from: process.env.GMAIL_ID,
          to: this.body,
          subject: 'OMG 비밀번호 초기화 메일',
          html:
            '<p>비밀번호 초기화를 위해 아래의 URL을 클릭하여 주세요.</p>' +
            `<a href="http://localhost:3000/users/reset/${token}">비밀번호 재설정 링크</a>`,
        };
        transporter.sendMail(emailOptions);
        return baseResponse.SUCCESS;
      } else {
        return baseResponse.EMAIL_NOT_EXIST;
      }
    } catch (err) {
      console.log(err);
      return baseResponse.DB_ERROR;
    }
  }
  async userInfo() {
    const userId = this.body;
    const userInfoResult = await UserStorage.getUserInfo(userId);
    return userInfoResult[0];
  }
  async checkPasswd() {
    try {
      const hashedPassword = crypto.createHash('sha512').update(this.body.passwd).digest('hex');
      const account = [this.body.userId, hashedPassword];
      const passwdResult = await UserStorage.verifiedLogIn(account);
      if (passwdResult.length) return baseResponse.SUCCESS;
      else return baseResponse.PASSWORD_IS_WRONG;
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
  async updatePasswd() {
    try {
      const hashedPassword = crypto.createHash('sha512').update(this.body.passwd).digest('hex');
      const account = [hashedPassword, this.body.userId];
      await UserStorage.updatePassword(account);
      return baseResponse.SUCCESS;
    } catch (err) {
      return baseResponse.DB_ERROR;
    }
  }
}
export default User;
