import express from 'express';
import mainController from './mainController.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    //Response JSON data
    this.router.get('/main', mainController.output.getMainSchedule);
    this.router.get('/main/filter', mainController.output.getMainScheduleByFilter);

    //Paging Router
    this.router.get('/', mainController.output.getMain);
    this.router.get('/competitions', mainController.output.getCompetition);
    this.router.get('/competitions-list', mainController.output.getCompetitionJson);
    this.router.get('/notices', mainController.output.getNotice);
    this.router.get('/notices-list', mainController.output.getNoticeJson);
    this.router.get('/inquirys', mainController.output.getInquiry);
    this.router.get('/questions', mainController.output.getQuestion);
    this.router.get('/questions-list', mainController.output.getQuestionJson);

    //Processing Router
    this.router.post('/inquirys', mainController.process.createInquiry);
  }
}

export default new Router().router;
