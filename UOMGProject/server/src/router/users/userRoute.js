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

    //Processing Router
    this.router.post('/login', userController.process.login);
    this.router.post('/logout', userController.process.logout);
    this.router.post('/join', userController.process.join);
  }
}

export default new Router().router;
