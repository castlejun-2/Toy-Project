import express from 'express';
import userService from './userService.js';

class Controller {
  output = {
    login: async (req, res) => {
      console.log('Get Login');
      //res.render('login.ejs');
    },
  };

  process = {
    login: async (req, res) => {
      console.log('Post Login');
      const { email, passwd } = req.body;
      const User = await userService.checkUser(email, passwd);
      console.log(User);
    },
    localLogin: async (req, res) => {
      console.log('Local-Login Success');
      const userInfo = req.user;
      console.log('userInfo: ', userInfo);
    },
  };
}
export default new Controller();
