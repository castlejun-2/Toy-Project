import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import UserStorage from '../models/users/userStorage.js';

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
          const rows = await UserStorage.verifiedLogIn(email, passwd);
          if (rows.length) {
            return done(null, { email: email, id: rows[0].id });
          } else {
            return done(null, false, { message: 'Login Failure' });
          }
        },
      ),
    );
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });
    passport.deserializeUser(async function (id, done) {
      const rows = await UserStorage.getUserInfo(id);
      if (rows.length) {
        return done(null, { email: rows[0].email, id: rows[0].id });
      } else {
        return done(null, false, { message: 'Login Failure' });
      }
    });
  }
}

export default new Passport();
