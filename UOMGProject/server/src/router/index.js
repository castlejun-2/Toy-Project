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
      if (req.user) res.render('main.ejs', { email: req.user.email });
      else res.redirect('/users/login');
    });

    //User Page Routing
    this.router.use('/users', user);
  }
}
export default new Router().router;
