import express from 'express';
import userService from './userService.js';

class Controller {
  output = {
    login: async (req, res) => {
      res.render('login.ejs');
    },
    signup: async (req, res) => {
      res.render('signup.ejs');
    },
  };

  process = {};
}
export default new Controller();
