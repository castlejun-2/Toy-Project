import express from 'express';
import main from './server/src/router/index.js';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import dotenv from 'dotenv';
import passport from 'passport';
import passportConfig from './server/src/config/passport.js';
import session from 'express-session';
import cors from 'cors';
dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.setMiddleWare();
    this.setRouting();
    this.listen();
  }
  setMiddleWare() {
    this.app.use(express.static('public'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(methodOverride());
    this.app.use(
      session({
        secret: process.env.SESSEONKEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 },
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.set('view engine', 'ejs');

    this.app.use(cors());
    passportConfig;
  }
  setRouting() {
    this.app.use('/', main);
  }
  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  }
}

export default new App().app;
