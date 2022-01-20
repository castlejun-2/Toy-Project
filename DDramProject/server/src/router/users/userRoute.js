import express from 'express';
import userController from './userController.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    this.router.get('/login', userController.output.login);
    this.router.post('/login', userController.process.login);
    this.router.post('/logout', userController.process.logout);
    this.router.get('/join', userController.output.join);
  }
}

export default new Router().router;
