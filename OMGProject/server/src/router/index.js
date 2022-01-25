import express from 'express';
import user from './users/userRoute.js';
import main from './main/mainRoute.js';

class Router {
  constructor() {
    this.router = express.Router();
    this.setRouter();
  }
  setRouter() {
    this.router.get('/', main); //Main Page Routing
    this.router.use('/users', user); //User Page Routing
  }
}
export default new Router().router;
