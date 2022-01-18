import express from 'express';
import user from './users/userRoute.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    //Main Page Routing
    this.router.get('/', function (req, res) {
      res.send('Wellcome! ' + req.user.email + '님 어서오세요!');
    });

    //User Page Routing
    this.router.use('/users', user);
  }
}
export default new Router().router;
