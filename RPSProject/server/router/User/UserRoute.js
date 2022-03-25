import express from 'express';
import userController from './UserController.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    //Processing Router
    this.router.post('/login', userController.process.login);
    this.router.post('/register', userController.process.register);
  }
}

export default new Router().router;
