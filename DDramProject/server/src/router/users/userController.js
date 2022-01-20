import userService from './userService.js';
import passport from 'passport';
import baseResponse from '../../config/responseStatus.js';

class Controller {
  output = {
    login: async (req, res) => {
      if (req.user) req.logout();
      res.render('login.ejs');
    },
    join: async (req, res) => {
      res.render('join.ejs');
    },
  };

  process = {
    login: async (req, res, next) => {
      if (!req.body.email || !req.body.passwd) res.send({ success: false, message: 'email 또는 password를 입력해주세요' });
      else {
        passport.authenticate('local-login', (err, user, message) => {
          if (!user) return res.send(message);
          return req.login(user, loginError => {
            if (loginError) next(loginError);
            else res.send(baseResponse.SUCCESS);
          });
        })(req, res, next);
      }
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
