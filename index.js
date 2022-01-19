'use strict';
import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`succefully connected to port number ${port}!`);
});
