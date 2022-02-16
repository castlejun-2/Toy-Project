import express from 'express';
import inquiryController from './inquiryController.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    //Response JSON data
    this.router.get('/detail/:inquiryId', inquiryController.output.getInquiryDetail);

    //Paging Router
    this.router.get('/my-page/inquiry', inquiryController.output.getMyPageInquiry);

    //Processing Router
  }
}

export default new Router().router;
