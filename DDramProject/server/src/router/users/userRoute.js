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
    this.router.post(
      '/login',
      passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/users/login',
      }),
    );
    this.router.get('/signup', userController.output.signup);
  }
}

export default new Router().router;
