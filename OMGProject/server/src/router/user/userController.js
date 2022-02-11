import passport from 'passport';
import baseResponse from '../../config/responseStatus.js';
import User from '../../models/user/user.js';
import Meeting from '../../models/meeting/meeting.js';

class Controller {
  output = {
    login: async (req, res) => {
      if (req.user) {
        req.logout();
        req.session.destroy(() => {
          req.session;
        });
        res.redirect('/users/login');
      } else res.render('login.ejs');
    },
    join: async (req, res) => res.render('join.ejs'),
    welcome: async (req, res) => res.render('welcome.ejs'),
    logout: async (req, res) => {
      if (req.user) {
        req.logout();
        req.session.destroy(() => {
          req.session;
        });
        res.redirect('login');
      } else res.redirect('login');
    },
    myPage: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const meeting = new Meeting(userId);
        const meetingResult = await meeting.getMyPageMeetingInfo();
        res.render('myPage.ejs', { user: req.user, meeting: meetingResult });
      } else res.redirect('login');
    },
  };

  process = {
    login: async (req, res, next) => {
      const regexEmail = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
      if (!req.body.email) res.send(baseResponse.EMAIL_EMPTY);
      else if (!req.body.passwd) res.send(baseResponse.PASSWD_EMPTY);
      else if (!regexEmail.test(req.body.email)) res.send(baseResponse.EMAIL_FORM_IS_WRONG);
      else {
        //To do: req.body.keepLogIn 처리
        passport.authenticate('local-login', (err, user, message) => {
          if (!user) res.send(message);
          return req.login(user, loginError => {
            if (loginError) next(loginError);
            else res.send(baseResponse.SUCCESS);
          });
        })(req, res, next);
      }
    },
    join: async (req, res) => {
      const regexEmail = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
      console.log(req.body);
      if (!req.body.email) res.send(baseResponse.EMAIL_EMPTY);
      else if (!regexEmail.test(req.body.email)) res.send(baseResponse.EMAIL_FORM_IS_WRONG);
      else if (!req.body.name) res.send(baseResponse.NAME_EMPTY);
      else if (!req.body.passwd) res.send(baseResponse.PASSWD_EMPTY);
      else if (!req.body.passwdConfirm) res.send(baseResponse.PASSWDCONFIRM_EMPTY);
      else if (req.body.passwd != req.body.passwdConfirm) res.send(baseResponse.PASSWORD_IS_WRONG);
      else if (!req.body.school) res.send(baseResponse.SCHOOL_EMPTY);
      else if (!req.body.phonenumber) res.send(baseResponse.PHONENUMBER_EMPTY);
      else if (!req.body.agree) res.send(baseResponse.AGREE_IS_EMPTY);
      else {
        const regexPhone = /^\d{3}-\d{3,4}-\d{4}$/;
        if (!regexPhone.test(req.body.phonenumber)) res.send(baseResponse.PHONENUMBER_FORM_IS_WRONG);
        else {
          const user = new User(req.body);
          const joinResult = await user.registerAccount();
          res.send(joinResult);
        }
      }
    },
  };
}
export default new Controller();
