import passport from 'passport';
import baseResponse from '../../config/responseStatus.js';
import User from '../../models/user/user.js';
import Meeting from '../../models/meeting/meeting.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

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
        const user = new User(userId);
        const userInfoResult = await user.userInfo();
        console.log(userInfoResult);
        res.render('mypage.ejs', { user: userInfoResult });
      } else res.redirect('login');
    },
    myPageProfile: async (req, res) => {
      if (req.user) {
        res.render('mypageProfile.ejs', { user: req.user });
      } else res.redirect('login');
    },
    myPageMeetMng: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const meeting = new Meeting(userId);
        const meetingResult = await meeting.getMyPageMeetingInfo();
        res.render('mypageMeetMng.ejs', { user: req.user, meeting: meetingResult });
      } else res.redirect('/users/login');
    },
    passwordReset: async (req, res) => res.render('passwordFind.ejs'),
    reset: async (req, res) => res.render('passwordReset.ejs', { token: req.params.token }),
  };

  process = {
    login: async (req, res, next) => {
      const regexEmail = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
      if (!req.body.email) return res.send(baseResponse.EMAIL_EMPTY);
      else if (!req.body.passwd) return res.send(baseResponse.PASSWD_EMPTY);
      else if (!regexEmail.test(req.body.email)) return res.send(baseResponse.EMAIL_FORM_IS_WRONG);
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
      if (!req.body.email) return res.send(baseResponse.EMAIL_EMPTY);
      else if (!regexEmail.test(req.body.email)) return res.send(baseResponse.EMAIL_FORM_IS_WRONG);
      else if (!req.body.name) return res.send(baseResponse.NAME_EMPTY);
      else if (!req.body.passwd) return res.send(baseResponse.PASSWD_EMPTY);
      else if (!req.body.passwdConfirm) return res.send(baseResponse.PASSWDCONFIRM_EMPTY);
      else if (req.body.passwd != req.body.passwdConfirm) return res.send(baseResponse.PASSWORD_IS_WRONG);
      else if (!req.body.address) return res.send(baseResponse.ADDRESS_EMPTY);
      else if (!req.body.school) return res.send(baseResponse.SCHOOL_EMPTY);
      else if (!req.body.phonenumber) return res.send(baseResponse.PHONENUMBER_EMPTY);
      else if (!req.body.agree) return res.send(baseResponse.AGREE_IS_EMPTY);
      else {
        const regexPhone = /^\d{3}-\d{3,4}-\d{4}$/;
        if (!regexPhone.test(req.body.phonenumber)) return res.send(baseResponse.PHONENUMBER_FORM_IS_WRONG);
        else {
          const url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + encodeURI(req.body.address);
          const axiosResult = await axios({
            url: url,
            method: 'get',
            headers: {
              Authorization: 'KakaoAK ' + process.env.KAKAO_RESTAPIKEY,
            },
          });
          const placeLA = axiosResult.data.documents[0].address.y;
          const placeLO = axiosResult.data.documents[0].address.x;
          const params = {
            email: req.body.email,
            name: req.body.name,
            passwd: req.body.passwd,
            passwdConfirm: req.body.passwdConfirm,
            address: req.body.address,
            school: req.body.school,
            phonenumber: req.body.phonenumber,
            placeLA: placeLA,
            placeLO: placeLO,
          };
          const user = new User(params);
          const joinResult = await user.registerAccount();
          return res.send(joinResult);
        }
      }
    },
    passwordReset: async (req, res) => {
      if (!req.body.email) res.send(baseResponse.EMAIL_EMPTY);
      else {
        const email = req.body.email;
        const user = new User(email);
        const passwdResetResult = await user.passwdSendEmail();
        return res.send(passwdResetResult);
      }
    },
    passwordSetting: async (req, res) => {
      const passwd = req.body.passwd;
      const passwdConfirm = req.body.passwdConfirm;
      const token = req.body.token;
      const params = [passwd, token];
      if (!passwd) return res.send(baseResponse.PASSWD_EMPTY);
      else if (!passwdConfirm) return res.send(baseResponse.PASSWDCONFIRM_EMPTY);
      else if (passwd != passwdConfirm) return res.send(baseResponse.PASSWORD_IS_WRONG);
      else {
        const user = new User(params);
        const resetResult = await user.passwdReset();
        return res.send(resetResult);
      }
    },
  };
}
export default new Controller();
