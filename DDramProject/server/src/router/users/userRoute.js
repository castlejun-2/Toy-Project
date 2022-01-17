import express from 'express';
import userController from './userController.js';
import passport from 'passport';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    this.router.get('/login', userController.output.login);
    this.router.post('/login', userController.process.login);
    this.router.post(
      '/local-login',
      passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/users/login',
      }),
    );
  }
}

export default new Router().router;
