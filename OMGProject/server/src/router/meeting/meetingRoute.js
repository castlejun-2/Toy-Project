import express from 'express';
import meetingController from './meetingController.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    this.router.post('/', meetingController.process.getSchedule);
    this.router.get('/:typeName/:scheduleId', meetingController.output.getScheduleDetail);
  }
}

export default new Router().router;
