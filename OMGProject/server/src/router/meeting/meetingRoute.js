import express from 'express';
import meetingController from './meetingController.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    this.router.post('/', meetingController.process.getSchedule);
  }
}

export default new Router().router;
