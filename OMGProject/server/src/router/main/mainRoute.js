import express from 'express';
import mainController from './mainController.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    //Paging Router
    this.router.get('/', mainController.output.getMain);
    this.router.get('/competitions', mainController.output.getCompetition);
    this.router.get('/notices', mainController.output.getNotice);
    //Processing Router
  }
}

export default new Router().router;
