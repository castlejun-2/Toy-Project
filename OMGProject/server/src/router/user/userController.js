import passport from 'passport';
import baseResponse from '../../config/responseStatus.js';
import User from '../../models/user/user.js';
import Meeting from '../../models/meeting/meeting.js';
import axios from 'axios';
import cache from 'memory-cache';
import cryptoJs from 'crypto-js';
import dotenv from 'dotenv';
import { render } from 'ejs';
dotenv.config();

class Controller {
  output = {
    login: async (req, res) => {
      if (req.cookies.omg_last_login) {
        let date = new Date();
        date = date.toISOString().slice(0, 10);
        if (date == req.cookies.omg_last_login) {
          if (req.user) res.redirect('/');
          else res.render('account/login.ejs');
        } else {
          if (req.user) {
            req.logout();
            req.session.destroy(() => {
              req.session;
            });
          }
          res.render('account/login.ejs');
        }
      } else if (req.user) res.redirect('/');
      else res.render('account/login.ejs');
    },
    join: async (req, res) => res.render('account/join.ejs'),
    welcome: async (req, res) => res.render('account/welcome.ejs'),
    logout: async (req, res) => {
      if (req.user) {
        req.logout();
        req.session.destroy(() => {
          req.session;
        });
        res.redirect('/users/login');
      } else res.redirect('/users/login');
    },
    withdrawal: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const user = new User({ userId: userId });
        const userInfoResult = await user.userInfo();
        res.render('user/accountWithDrawal', { user: userInfoResult });
      } else res.redirect('/users/login');
    },
    myPage: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const user = new User({ userId: userId });
        const userInfoResult = await user.userInfo();
        res.render('user/mypage.ejs', { user: userInfoResult });
      } else res.redirect('/users/login');
    },
    myPageProfile: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const user = new User({ userId: userId });
        const userInfoResult = await user.userInfo();
        res.render('user/mypageProfile.ejs', { user: userInfoResult });
      } else res.redirect('/users/login');
    },
    myPageMeetMng: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const meeting = new Meeting({ userId: userId });
        const meetingResult = await meeting.getMyPageMeetingInfo();
        res.render('user/mypageMeetMng.ejs', { user: req.user, meeting: meetingResult });
      } else res.redirect('/users/login');
    },
    myPageInquiryMng: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const user = new User({ userId: userId });
        const myInquiryResult = await user.getMyPageInquiryInfo();
        res.render('user/mypageInquiryMng', { user: req.user, inquiry: myInquiryResult });
      } else res.redirect('/users/login');
    },
    myPageMeetCal: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const user = new User({ userId: userId });
        const userInfoResult = await user.userInfo();
        res.render('user/mypageMeetCal', { user: userInfoResult });
      } else res.redirect('/users/login');
    },
    myPageMeetCalData: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const user = new User({ userId: userId });
        const userMeetResult = await user.meetSmryInfo();
        res.send(userMeetResult);
      } else res.redirect('/users/login');
    },
    passwordReset: async (req, res) => res.render('account/passwordFind.ejs'),
    reset: async (req, res) => res.render('account/passwordReset.ejs', { token: req.params.token }),
    phoneNumberAuth: async (req, res) => {
      if (req.user) res.render('user/phoneAuth');
      else res.redirect('/users/login');
    },
    phoneNumberVeri: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const user = new User({ userId: userId });
        const userInfo = await user.userInfo();
        const phonenumber = userInfo.phonenumber;
        res.render('user/phoneVeri', { phonenumber: phonenumber });
      } else res.redirect('/users/login');
    },
  };

  process = {
    login: async (req, res, next) => {
      const regexEmail = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
      if (!req.body.email) return res.send(baseResponse.EMAIL_EMPTY);
      else if (!req.body.passwd) return res.send(baseResponse.PASSWD_EMPTY);
      else if (!regexEmail.test(req.body.email)) return res.send(baseResponse.EMAIL_FORM_IS_WRONG);
      else if (!req.body.keepLogIn) {
        passport.authenticate('local-login', (err, user, message) => {
          if (!user) return res.send(message);
          return req.login(user, loginError => {
            if (loginError) next(loginError);
            else {
              let date = new Date();
              date = date.toISOString().slice(0, 10);
              res.cookie('omg_last_login', date, {
                expires: new Date(Date.now() + 24 * 60 * 60),
                httpOnly: true,
              });
              res.send(baseResponse.SUCCESS);
            }
          });
        })(req, res, next);
      } else {
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
    withdrawal: async (req, res) => {
      const userId = req.user.id;
      req.logout();
      req.session.destroy(() => {
        req.session;
      });
      const user = new User({ userId: userId });
      const deleteResult = await user.deleteUserAccount();
      return res.send(deleteResult);
    },
    myPage: async (req, res) => {
      const userId = req.user.id;
      const subject = req.params.content;
      if (subject == 'profileImage') {
        if (!req.file && !req.body.image) return res.send(baseResponse.PROFILE_IMAGE_EMPTY);
        const imageUrl = req.file ? req.file.location : req.body.image;
        const params = { userId: userId, imageUrl: imageUrl };
        const user = new User(params);
        const profileUpdateResult = await user.updateProfileImage();
        return res.send(profileUpdateResult);
      } else if (subject == 'passwd') {
        if (!req.body.passwd) return res.send(baseResponse.PASSWD_EMPTY);
        else if (!req.body.newPasswd) return res.send(baseResponse.NEW_PASSWD_EMPTY);
        else if (!req.body.confirmPasswd) return res.send(baseResponse.PASSWDCONFIRM_EMPTY);
        else if (req.body.newPasswd != req.body.confirmPasswd) return res.send(baseResponse.PASSWORD_IS_WRONG);
        else {
          const params = { userId: userId, passwd: req.body.passwd };
          const user = new User(params);
          const verifiedPasswd = await user.checkPasswd();
          if (verifiedPasswd.success) {
            const passwdUpdateResult = await user.updatePasswd();
            return res.send(passwdUpdateResult);
          } else return res.send(verifiedPasswd);
        }
      } else if (subject == 'address') {
        if (!req.body.address) return res.send(baseResponse.NEW_ADDRESS_EMPTY);
        else {
          const address = req.body.address;
          const url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + encodeURI(address);
          const axiosResult = await axios({
            url: url,
            method: 'get',
            headers: {
              Authorization: 'KakaoAK ' + process.env.KAKAO_RESTAPIKEY,
            },
          });
          const placeLA = axiosResult.data.documents[0].address.y;
          const placeLO = axiosResult.data.documents[0].address.x;
          const params = { address: address, placeLA: placeLA, placeLO: placeLO, userId: userId };
          const user = new User(params);
          const updateUserAddressResult = await user.updateAddress();
          return res.send(updateUserAddressResult);
        }
      } else if (subject == 'school') {
        if (!req.body.school) return res.send(baseResponse.NEW_SCHOOL_EMPTY);
        else {
          const school = req.body.school;
          const params = { userId: userId, school: school };
          const user = new User(params);
          const updateSchoolResult = await user.updateSchool();
          return res.send(updateSchoolResult);
        }
      } else if (subject == 'phonenumber') {
        if (!req.body.phonenumber) return res.send(baseResponse.PHONENUMBER_EMPTY);
        else {
          const phonenumber = req.body.phonenumber;
          const params = { userId: userId, phonenumber: phonenumber };
          const user = new User(params);
          const updatePhonenumberResult = await user.updatePhonenumber();
          return res.send(updatePhonenumberResult);
        }
      }
    },
    passwordReset: async (req, res) => {
      if (!req.body.email) res.send(baseResponse.EMAIL_EMPTY);
      else {
        const email = req.body.email;
        const user = new User({ email: email });
        const passwdResetResult = await user.passwdSendEmail();
        return res.send(passwdResetResult);
      }
    },
    passwordSetting: async (req, res) => {
      const passwd = req.body.passwd;
      const passwdConfirm = req.body.passwdConfirm;
      const token = req.body.token;
      const params = { passwd: passwd, token: token };
      if (!passwd) return res.send(baseResponse.PASSWD_EMPTY);
      else if (!passwdConfirm) return res.send(baseResponse.PASSWDCONFIRM_EMPTY);
      else if (passwd != passwdConfirm) return res.send(baseResponse.PASSWORD_IS_WRONG);
      else {
        const user = new User(params);
        const resetResult = await user.passwdReset();
        return res.send(resetResult);
      }
    },
    snsCertification: async (req, res) => {
      if (req.user) {
        let phonenumber = req.body.phonenumber;
        const space = ' ';
        const newLine = '\n';
        phonenumber = phonenumber.replace(/[^0-9]/g, '');
        const date = Date.now().toString();
        const serviceId = process.env.NC_SERVICE_ID;
        const secretKey = process.env.NC_SECRET_KEY;
        const accessKey = process.env.NC_ACCESS_KEY;
        const serviceNumber = process.env.SERVICE_NUMBER;
        const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
        const url_2 = `/sms/v2/services/${serviceId}/messages`;
        const hmac = cryptoJs.algo.HMAC.create(cryptoJs.algo.SHA256, secretKey);
        hmac.update('POST');
        hmac.update(space);
        hmac.update(url_2);
        hmac.update(newLine);
        hmac.update(date);
        hmac.update(newLine);
        hmac.update(accessKey);
        const hash = hmac.finalize();
        const signature = hash.toString(cryptoJs.enc.Base64);
        const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        cache.del(phonenumber);
        cache.put(phonenumber, verifyCode.toString());
        await axios({
          method: 'POST',
          json: true,
          url: url,
          headers: {
            'Content-Type': 'application/json',
            'x-ncp-iam-access-key': accessKey,
            'x-ncp-apigw-timestamp': date,
            'x-ncp-apigw-signature-v2': signature,
          },
          data: {
            type: 'SMS',
            contentType: 'COMM',
            countryCode: '82',
            from: serviceNumber,
            content: `[OMG] 본인확인을 위한 인증번호 [${verifyCode}]를 입력해주세요.`,
            messages: [
              {
                to: `${phonenumber}`,
              },
            ],
          },
        })
          .then(function (res) {
            return res.send(baseResponse.SUCCESS);
          })
          .catch(err => {
            if (err.res == undefined) return res.send(baseResponse.SUCCESS);
            else return res.send(baseResponse.PHONENUMBER_IS_NOT_VALID);
          });
      } else return res.send(baseResponse.IS_NOT_CONNECTED);
    },
    snsVerification: async (req, res) => {
      let phonenumber = req.body.phonenumber;
      phonenumber = phonenumber.replace(/[^0-9]/g, '');
      const verifyCode = req.body.verifyCode;

      const cacheData = cache.get(phonenumber);
      if (!cacheData) return res.send(baseResponse.FAILURE_SMS_AUTHENTICATION);
      else if (cacheData != verifyCode) return res.send(baseResponse.FAILURE_SMS_AUTHENTICATION);
      else {
        const userId = req.user.id;
        const user = new User({ userId: userId });
        const updateAuthResult = await user.updateUserPhoneAuth();
        cache.del(phonenumber);
        return res.send(updateAuthResult);
      }
    },
  };
}
export default new Controller();
