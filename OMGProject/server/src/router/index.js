import express from 'express';
import user from './user/userRoute.js';
import main from './main/mainRoute.js';
import meeting from './meeting/meetingRoute.js';
import inquiry from './inquiry/inquiryRoute.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    this.router.use('/', main); //Main Page Routing
    this.router.use('/users', user); //User Page Routing
    this.router.use('/meetings', meeting); //Meeting Page Routing
    this.router.use('/inquirys', inquiry); //Meeting Page Routing
  }
}
export default new Router().router;
