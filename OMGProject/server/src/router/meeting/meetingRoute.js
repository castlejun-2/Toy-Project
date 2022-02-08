import express from 'express';
import meetingController from './meetingController.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    //Response JSON Data
    this.router.get('/', meetingController.output.getDateSchedule);

    //Paging Router
    this.router.get('/game', meetingController.output.getGameSchedule);
    this.router.get('/dating', meetingController.output.getDatingSchedule);
    this.router.get('/sports', meetingController.output.getSportsSchedule);
    this.router.get('/study', meetingController.output.getStudySchedule);
    this.router.get('/hobby', meetingController.output.getHobbySchedule);
    this.router.get('/:typeName/:scheduleId', meetingController.output.getScheduleDetail);
    this.router.get('/writing', meetingController.output.getWritingPage);

    //Post Request
    this.router.post('/', meetingController.process.createMeetingSchedule);
  }
}

export default new Router().router;
