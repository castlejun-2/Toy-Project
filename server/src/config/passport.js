import express from 'express';
import { createPool } from 'mysql';
import passport from 'passport';
import passportLocal from 'passport-local';
import { nextTick } from 'process';
import { pool } from './database.js';

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
          pool.getConnection(async function (err, conn) {
            if (err) return done(err);
            else {
              console.log('Success Connection');
              const query = 'Select id From User Where email = ? and passwd = ?';
              conn.query(query, [email, passwd], function (err, rows) {
                if (err) return done(err);
                if (rows.length) {
                  console.log('Login Success!');
                  return done(null, { email: email, id: rows[0].id });
                } else {
                  console.log('Login False!');
                  return done(null, false, { message: 'Login Failure' });
                }
              });
            }
            conn.release();
            console.log('Connection Existed');
          });
        },
      ),
    );
    passport.serializeUser(function (user, done) {
      console.log('passport session save: ', user.id);
      done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
      pool.getConnection(async function (err, conn) {
        if (err) return done(err);
        else {
          console.log('Success Login');
          const query = 'Select id, email From User Where id = ?';
          conn.query(query, [id], function (err, rows) {
            if (err) return done(err);
            if (rows.length) {
              done(null, { email: rows[0].email, id: rows[0].id });
            } else {
              console.log('Login False!');
              return done(null, false, { message: 'Login Failure' });
            }
          });
        }
        conn.release();
        console.log('Connection Existed');
      });
    });
  }
}

export default new Passport();
