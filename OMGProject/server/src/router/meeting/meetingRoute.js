import express from 'express';
import meetingController from './meetingController.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {}
}

export default new Router().router;
