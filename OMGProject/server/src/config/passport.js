import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import User from '../models/user/user.js';
import UserStorage from '../models/user/userStorage.js';

const app = express();
const LocalStrategy = passportLocal.Strategy;

class Passport {
  constructor() {
    this.passport = passport;
    this.getPassport();
  }
  getPassport() {
    this.passport.use(
      'local-login',
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'passwd',
          passReqToCallback: true,
        },
        async function (req, email, passwd, done) {
          const account = { email: email, passwd: passwd };
          const user = new User(account);
          const userLogin = await user.checkLogin();
          if (userLogin.success) return done(null, { email: email, id: userLogin.data[0].id });
          return done(null, false, userLogin);
        },
      ),
    );
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });
    passport.deserializeUser(async function (id, done) {
      const rows = await UserStorage.getUserInfo(id);
      if (rows.length) done(null, { email: rows[0].email, id: rows[0].id, name: rows[0].name, profile_img: rows[0].imageUrl });
      else done(null, false);
    });
  }
}

export default new Passport();
