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
    this.router.get('/my-page/meeting', meetingController.output.getMySchedule);

    //Paging Router
    this.router.get('/game', meetingController.output.getGameSchedule);
    this.router.get('/dating', meetingController.output.getDatingSchedule);
    this.router.get('/sports', meetingController.output.getSportsSchedule);
    this.router.get('/study', meetingController.output.getStudySchedule);
    this.router.get('/hobby', meetingController.output.getHobbySchedule);
    this.router.get('/:typeName/:scheduleId', meetingController.output.getScheduleDetail);
    this.router.get('/writing', meetingController.output.getWritingPage);
    this.router.get('/writing/update/:scheduleId', meetingController.output.getReWritingPage);
    this.router.get('/wrong-approach', meetingController.output.getWrongApproach);

    //Post Request
    this.router.post('/', meetingController.process.createMeetingSchedule);
    this.router.post('/complete', meetingController.process.completeMeetingSchedule);
    this.router.post('/update', meetingController.process.updateMeetingSchedule);
    this.router.post('/delete', meetingController.process.deleteMeetingSchedule);
  }
}

export default new Router().router;
