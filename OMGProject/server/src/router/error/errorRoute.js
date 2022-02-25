import express from 'express';
import errorController from './errorController.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    //Paging Router
    this.router.get('/wrong-approach', errorController.output.getWrongApproach);
  }
}

export default new Router().router;
