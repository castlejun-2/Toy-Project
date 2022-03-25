import express from 'express';
import User from './User/UserRoute.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    this.router.use('/users', User); //User Page Routing
  }
}
export default new Router().router;
