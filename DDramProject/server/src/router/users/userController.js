import express from 'express';
import userService from './userService.js';
import passport from 'passport';

class Controller {
  output = {
    login: async (req, res) => {
      if (req.user) req.logout();
      res.render('login.ejs');
    },
    signup: async (req, res) => {
      res.render('signup.ejs');
    },
  };

  process = {
    login: async (req, res, next) => {
      passport.authenticate('local-login', (err, user, message) => {
        if (!user) return res.json(message);
        return req.login(user, loginError => {
          if (loginError) next(loginError);
          else res.send({ success: true });
        });
      })(req, res, next);
    },
    logout: async (req, res) => {
      req.logout();
      req.session.destroy(() => {
        req.session;
      });
      res.redirect('login');
    },
  };
}
export default new Controller();
