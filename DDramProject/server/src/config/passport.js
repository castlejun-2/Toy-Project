import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import UserStorage from '../models/users/userStorage.js';
import baseResponse from './responseStatus.js';

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
          const idRows = await UserStorage.verfiedEmail(email);
          if (idRows.length) {
            const verifiedRows = await UserStorage.verifiedLogIn(email, passwd);
            if (verifiedRows.length) return done(null, { email: email, id: idRows[0].id });
            else return done(null, false, baseResponse.PASSWORD_IS_WRONG);
          } else return done(null, false, baseResponse.EMAIL_NOT_EXIST);
        },
      ),
    );
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });
    passport.deserializeUser(async function (id, done) {
      const rows = await UserStorage.getUserInfo(id);
      if (rows.length) done(null, { email: rows[0].email, id: rows[0].id });
      else done(null, false);
    });
  }
}

export default new Passport();
