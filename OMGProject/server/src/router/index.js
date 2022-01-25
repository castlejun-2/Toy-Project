import express from 'express';
import user from './users/userRoute.js';
import main from './main/mainRoute.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    //Main Page Routing
    this.router.get('/', main);

    //User Page Routing
    this.router.use('/users', user);
  }
}
export default new Router().router;
