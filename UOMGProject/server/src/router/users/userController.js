import passport from 'passport';
import baseResponse from '../../config/responseStatus.js';
import User from '../../models/users/user.js';

class Controller {
  output = {
    login: async (req, res) => {
      if (req.user) req.logout();
      else res.render('login.ejs');
    },
    join: async (req, res) => res.render('join.ejs'),
    welcome: async (req, res) => res.render('welcome.ejs'),
  };

  process = {
    login: async (req, res, next) => {
      const regexEmail = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
      if (!req.body.email) return res.send(baseResponse.EMAIL_EMPTY);
      else if (!req.body.passwd) return res.send(baseResponse.PASSWD_EMPTY);
      else if (!regexEmail.test(req.body.email)) return res.send(baseResponse.EMAIL_FORM_IS_WRONG);
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
    join: async (req, res) => {
      const regexEmail = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
      console.log(req.body);
      if (!req.body.email) return res.send(baseResponse.EMAIL_EMPTY);
      else if (!regexEmail.test(req.body.email)) return res.send(baseResponse.EMAIL_FORM_IS_WRONG);
      else if (!req.body.name) return res.send(baseResponse.NAME_EMPTY);
      else if (!req.body.passwd) return res.send(baseResponse.PASSWD_EMPTY);
      else if (!req.body.passwdConfirm) return res.send(baseResponse.PASSWDCONFIRM_EMPTY);
      else if (req.body.passwd != req.body.passwdConfirm) return res.send(baseResponse.PASSWORD_IS_WRONG);
      else if (!req.body.school) return res.send(baseResponse.SCHOOL_EMPTY);
      else if (!req.body.phonenumber) return res.send(baseResponse.PHONENUMBER_EMPTY);
      else if (!req.body.agree) return res.send(baseResponse.AGREE_IS_EMPTY);
      else {
        const regexPhone = /^\d{3}-\d{3,4}-\d{4}$/;
        if (!regexPhone.test(req.body.phonenumber)) return res.send(baseResponse.PHONENUMBER_FORM_IS_WRONG);
        else {
          const user = new User(req.body);
          const joinResult = await user.registerAccount();
          return res.send(joinResult);
        }
      }
    },
  };
}
export default new Controller();
