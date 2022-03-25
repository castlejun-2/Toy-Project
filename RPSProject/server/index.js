import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routing from './router/index.js';
// import config from './config/key';
// import { User } from './models/User';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.setMiddleWare();
    this.setRouting();
    this.listen();
    this.setConnectMongoDB();
  }
  setConnectMongoDB() {
    mongoose
      .connect(`${process.env.MONGOOSE}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('MongoDB Connect...'))
      .catch(err => console.log(err));
  }
  setMiddleWare() {
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }
  setRouting() {
    this.app.use('/', routing);
    // this.app.get('/hi', (req, res) => res.send('Welcome RPS Project !'));
  }
  listen() {
    this.app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on ${process.env.SERVER_PORT}`);
    });
  }
}

export default new App().app;
