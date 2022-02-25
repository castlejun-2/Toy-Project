import baseResponse from '../../config/responseStatus.js';
import User from '../../models/user/user.js';
import Main from '../../models/main/main.js';
import Meeting from '../../models/meeting/meeting.js';
import MeetingStorage from '../../models/meeting/meetingStorage.js';
import axios from 'axios';

class Controller {
  output = {
    getScheduleDetail: async (req, res) => {
      if (req.user) {
        const meetingId = req.params.scheduleId;
        const scheduleDetailResult = await MeetingStorage.getMeetingDetail(meetingId);
        res.render('meeting/meeting.ejs', { meeting: scheduleDetailResult, user: req.user });
      } else res.redirect('/users/login');
    },
    getDateSchedule: async (req, res) => {
      if (req.user) {
        let params = [];
        const diffDate = req.query.diff_date ? req.query.diff_date : 0;
        req.query.type == 'main'
          ? (params = { diff_date: diffDate, typeStatus: 0, type: parseInt(0) })
          : (params = { diff_date: diffDate, typeStatus: 1, type: req.query.type });
        const meeting = new Meeting(params);
        const scheduleResult = await meeting.getScheduleInfo();
        res.send({ meeting: scheduleResult });
      } else res.redirect('/users/login');
    },
    getMySchedule: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const meeting = new Meeting({ userId: userId });
        const scheduleResult = await meeting.getMyPageMeetingInfo();
        res.send({ meeting: scheduleResult });
      } else res.redirect('/users/login');
    },
    getGameSchedule: async (req, res) => {
      if (req.user) {
        const params = { diff_date: 0, typeStatus: 1, type: 'game' };
        const meeting = new Meeting(params);
        const scheduleResult = await meeting.getScheduleInfo();
        res.render('main/game.ejs', { type: 'game', meeting: scheduleResult, user: req.user });
      } else res.redirect('/users/login');
    },
    getDatingSchedule: async (req, res) => {
      if (req.user) {
        const params = { diff_date: 0, typeStatus: 1, type: 'dating' };
        const meeting = new Meeting(params);
        const scheduleResult = await meeting.getScheduleInfo();
        res.render('main/dating.ejs', { type: 'dating', meeting: scheduleResult, user: req.user });
      } else res.redirect('/users/login');
    },
    getSportsSchedule: async (req, res) => {
      if (req.user) {
        const params = { diff_date: 0, typeStatus: 1, type: 'sports' };
        const meeting = new Meeting(params);
        const scheduleResult = await meeting.getScheduleInfo();
        res.render('main/sports.ejs', { type: 'sports', meeting: scheduleResult, user: req.user });
      } else res.redirect('/users/login');
    },
    getStudySchedule: async (req, res) => {
      if (req.user) {
        const params = { diff_date: 0, typeStatus: 1, type: 'study' };
        const meeting = new Meeting(params);
        const scheduleResult = await meeting.getScheduleInfo();
        res.render('main/study.ejs', { type: 'study', meeting: scheduleResult, user: req.user });
      } else res.redirect('/users/login');
    },
    getHobbySchedule: async (req, res) => {
      if (req.user) {
        const params = { diff_date: 0, typeStatus: 1, type: 'hobby' };
        const meeting = new Meeting(params);
        const scheduleResult = await meeting.getScheduleInfo();
        res.render('main/hobby.ejs', { type: 'hobby', meeting: scheduleResult, user: req.user });
      } else res.redirect('/users/login');
    },
    getWritingPage: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const user = new User({ userId: userId });
        const verifiedUserResult = await user.checkVerifiedUser();
        if (verifiedUserResult.success) {
          const type = req.query.type;
          res.render('meeting/writing.ejs', { type: type, user: req.user });
        } else res.redirect('/users/sns-auth');
      } else res.redirect('/users/login');
    },
    getReWritingPage: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const meetingId = req.params.scheduleId;
        const params = { userId: userId, meetingId: meetingId };
        const meeting = new Meeting(params);
        const certResult = await meeting.certificationMeetingByUserId();
        if (certResult.success) {
          const meetingDetail = await meeting.getMeetingDetail();
          res.render('meeting/reWriting.ejs', { meeting: meetingDetail, user: req.user });
        } else res.redirect('/error/wrong-approach');
      } else res.redirect('/users/login');
    },
  };

  process = {
    createMeetingSchedule: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const user = new User({ userId: userId });
        const verifiedUserResult = await user.checkVerifiedUser();
        if (verifiedUserResult.success) {
          if (!req.body.title) return res.send(baseResponse.TITLE_EMPTY);
          else if (!req.body.dateTime) return res.send(baseResponse.DATETIME_EMPTY);
          else if (!req.body.fee) return res.send(baseResponse.FEE_EMPTY);
          else if (!req.body.hour) return res.send(baseResponse.MEETINGTIME_EMPTY);
          else if (!req.body.placeName) return res.send(baseResponse.PLACENAME_EMPTY);
          else if (!req.body.placeAddress) return res.send(baseResponse.PLACEADDRESS_EMPTY);
          else if (!req.body.people) return res.send(baseResponse.PEOPLE_EMPTY);
          else {
            const title = req.body.title;
            const mainType = req.body.mainType;
            const subType = req.body.subType;
            const dateTime = req.body.dateTime;
            const fee = req.body.fee;
            const hour = req.body.hour;
            const placeName = req.body.placeName;
            const people = req.body.people;
            const placeAddress = req.body.placeAddress;
            const content = req.body.content;
            const notice = req.body.notice;
            const url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + encodeURI(placeAddress);
            const axiosResult = await axios({
              url: url,
              method: 'get',
              headers: {
                Authorization: 'KakaoAK 10b8818bed823e037e3d97d80377b236',
              },
            });
            const placeLA = axiosResult.data.documents[0].address.y;
            const placeLO = axiosResult.data.documents[0].address.x;
            const params = [
              userId,
              title,
              content,
              mainType,
              subType,
              dateTime,
              fee,
              hour,
              placeName,
              people,
              placeAddress,
              placeLA,
              placeLO,
              notice,
            ];
            const meeting = new Meeting(params);
            const createMeetingResult = await meeting.createMeeting();
            return res.send(createMeetingResult);
          }
        } else return res.send(verifiedUserResult);
      } else return res.send(baseResponse.IS_NOT_CONNECTED);
    },
    updateMeetingSchedule: async (req, res) => {
      if (req.user) {
        if (!req.body.title) return res.send(baseResponse.TITLE_EMPTY);
        else if (!req.body.dateTime) return res.send(baseResponse.DATETIME_EMPTY);
        else if (!req.body.fee) return res.send(baseResponse.FEE_EMPTY);
        else if (!req.body.hour) return res.send(baseResponse.MEETINGTIME_EMPTY);
        else if (!req.body.placeName) return res.send(baseResponse.PLACENAME_EMPTY);
        else if (!req.body.placeAddress) return res.send(baseResponse.PLACEADDRESS_EMPTY);
        else if (!req.body.people) return res.send(baseResponse.PEOPLE_EMPTY);
        else {
          const meetingId = req.body.meetingId;
          const title = req.body.title;
          const mainType = req.body.mainType;
          const subType = req.body.subType;
          const dateTime = req.body.dateTime;
          const fee = req.body.fee;
          const hour = req.body.hour;
          const placeName = req.body.placeName;
          const people = req.body.people;
          const placeAddress = req.body.placeAddress;
          const content = req.body.content;
          const notice = req.body.notice;
          const userId = req.user.id;
          const url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + encodeURI(placeAddress);
          const axiosResult = await axios({
            url: url,
            method: 'get',
            headers: {
              Authorization: 'KakaoAK 10b8818bed823e037e3d97d80377b236',
            },
          });
          const placeLA = axiosResult.data.documents[0].address.y;
          const placeLO = axiosResult.data.documents[0].address.x;
          const params = [
            title,
            content,
            mainType,
            subType,
            dateTime,
            fee,
            hour,
            placeName,
            people,
            placeAddress,
            placeLA,
            placeLO,
            notice,
            meetingId,
          ];
          const meeting = new Meeting(params);
          const updateMeetingResult = await meeting.updateMeeting();
          return res.send(updateMeetingResult);
        }
      } else return res.send(baseResponse.IS_NOT_CONNECTED);
    },
    completeMeetingSchedule: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const meetingId = req.body.meetingId;
        const params = { userId: userId, meetingId: meetingId };
        const meeting = new Meeting(params);
        const certResult = await meeting.certificationMeetingByUserId();
        if (certResult.success) {
          const completeMeeting = await meeting.completeMeeting();
          return res.send(completeMeeting);
        } else return res.send(certResult);
      } else return res.send(baseResponse.IS_NOT_CONNECTED);
    },
    deleteMeetingSchedule: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const meetingId = req.body.meetingId;
        const params = { userId: userId, meetingId: meetingId };
        const meeting = new Meeting(params);
        const certResult = await meeting.certificationMeetingByUserId();
        if (certResult.success) {
          const deleteMeeting = await meeting.deleteMeeting();
          return res.send(deleteMeeting);
        } else return res.send(certResult);
      } else return res.send(baseResponse.IS_NOT_CONNECTED);
    },
  };
}
export default new Controller();
