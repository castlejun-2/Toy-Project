import express from 'express';
import userController from './userController.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    //Paging Router
    this.router.get('/login', userController.output.login);
    this.router.get('/join', userController.output.join);
    this.router.get('/join/welcome', userController.output.welcome);
    this.router.get('/logout', userController.output.logout);
    this.router.get('/my-page', userController.output.myPage);
    this.router.get('/my-page/profile-management', userController.output.myPageProfile);
    this.router.get('/my-page/meet-management', userController.output.myPageMeetMng);
    this.router.get('/password-reset', userController.output.passwordReset);
    this.router.get('/reset/:token', userController.output.reset);

    //Processing Router
    this.router.post('/login', userController.process.login);
    this.router.post('/join', userController.process.join);
    this.router.post('/password-reset', userController.process.passwordReset);
    this.router.post('/password-setting', userController.process.passwordSetting);
  }
}

export default new Router().router;
