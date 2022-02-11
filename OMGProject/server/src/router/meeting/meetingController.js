import passport from 'passport';
import baseResponse from '../../config/responseStatus.js';
import User from '../../models/user/user.js';
import Main from '../../models/main/main.js';
import Meeting from '../../models/meeting/meeting.js';
import MeetingStorage from '../../models/meeting/meetingStorage.js';
import axios from 'axios';

class Controller {
  output = {
    getScheduleDetail: async (req, res) => {
      const meetingId = req.params.scheduleId;
      const scheduleDetailResult = await MeetingStorage.getMeedtingDetail(meetingId);
      res.render('meeting.ejs', { meeting: scheduleDetailResult, user: req.user });
    },
    getDateSchedule: async (req, res) => {
      let params = [];
      const diffDate = req.query.diff_date ? req.query.diff_date : 0;
      req.query.type == 'main' ? (params = [diffDate, 0, parseInt(0)]) : (params = [diffDate, 1, req.query.type]);
      const meeting = new Meeting(params);
      const scheduleResult = await meeting.getScheduleInfo();
      res.send({ meeting: scheduleResult });
    },
    getMySchedule: async (req, res) => {
      const userId = req.user.id;
      const meeting = new Meeting(userId);
      const scheduleResult = await meeting.getMyPageMeetingInfo();
      res.send({ meeting: scheduleResult });
    },
    getGameSchedule: async (req, res) => {
      const params = [0, 1, 'game'];
      const meeting = new Meeting(params);
      const scheduleResult = await meeting.getScheduleInfo();
      res.render('game.ejs', { type: 'game', meeting: scheduleResult, user: req.user });
    },
    getDatingSchedule: async (req, res) => {
      const params = [0, 1, 'dating'];
      const meeting = new Meeting(params);
      const scheduleResult = await meeting.getScheduleInfo();
      res.render('dating.ejs', { type: 'dating', meeting: scheduleResult, user: req.user });
    },
    getSportsSchedule: async (req, res) => {
      const params = [0, 1, 'sports'];
      const meeting = new Meeting(params);
      const scheduleResult = await meeting.getScheduleInfo();
      res.render('sports.ejs', { type: 'sports', meeting: scheduleResult, user: req.user });
    },
    getStudySchedule: async (req, res) => {
      const params = [0, 1, 'study'];
      const meeting = new Meeting(params);
      const scheduleResult = await meeting.getScheduleInfo();
      res.render('study.ejs', { type: 'study', meeting: scheduleResult, user: req.user });
    },
    getHobbySchedule: async (req, res) => {
      const params = [0, 1, 'hobby'];
      const meeting = new Meeting(params);
      const scheduleResult = await meeting.getScheduleInfo();
      res.render('hobby.ejs', { type: 'hobby', meeting: scheduleResult, user: req.user });
    },
    getWritingPage: async (req, res) => {
      if (req.user) {
        const type = req.query.type;
        res.render('writing.ejs', { type: type, user: req.user });
      } else res.render('login.ejs');
    },
    getReWritingPage: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const meetingId = req.params.scheduleId;
        const params = [userId, meetingId];
        const meeting = new Meeting(params);
        const certResult = await meeting.certificationMeetingByUserId();
        if (certResult.success) {
          console.log('hi');
          const meetingDetail = await meeting.getMeetingDetail();
          res.render('reWriting.ejs', { meeting: meetingDetail, user: req.user });
        } else res.render('wrongApproach.ejs');
      } else res.render('login.ejs');
    },
    getWrongApproach: async (req, res) => {
      res.render;
    },
  };

  process = {
    createMeetingSchedule: async (req, res) => {
      if (req.user) {
        if (!req.body.title) res.send(baseResponse.TITLE_EMPTY);
        else if (!req.body.dateTime) res.send(baseResponse.DATETIME_EMPTY);
        else if (!req.body.fee) res.send(baseResponse.FEE_EMPTY);
        else if (!req.body.hour) res.send(baseResponse.MEETINGTIME_EMPTY);
        else if (!req.body.placeName) res.send(baseResponse.PLACENAME_EMPTY);
        else if (!req.body.placeAddress) res.send(baseResponse.PLACEADDRESS_EMPTY);
        else if (!req.body.people) res.send(baseResponse.PEOPLE_EMPTY);
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
          res.send(createMeetingResult);
        }
      } else res.render('login.ejs');
    },
    updateMeetingSchedule: async (req, res) => {
      if (req.user) {
        if (!req.body.title) res.send(baseResponse.TITLE_EMPTY);
        else if (!req.body.dateTime) res.send(baseResponse.DATETIME_EMPTY);
        else if (!req.body.fee) res.send(baseResponse.FEE_EMPTY);
        else if (!req.body.hour) res.send(baseResponse.MEETINGTIME_EMPTY);
        else if (!req.body.placeName) res.send(baseResponse.PLACENAME_EMPTY);
        else if (!req.body.placeAddress) res.send(baseResponse.PLACEADDRESS_EMPTY);
        else if (!req.body.people) res.send(baseResponse.PEOPLE_EMPTY);
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
            meetingId,
          ];
          const meeting = new Meeting(params);
          const updateMeetingResult = await meeting.updateMeeting();
          res.send(updateMeetingResult);
        }
      } else res.render('login.ejs');
    },
    completeMeetingSchedule: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const meetingId = req.body.meetingId;
        const params = [userId, meetingId];
        const meeting = new Meeting(params);
        const certResult = await meeting.certificationMeetingByUserId();
        if (certResult.success) {
          const completeMeeting = await meeting.completeMeeting();
          res.send(completeMeeting);
        } else res.send(certResult);
      } else res.send(baseResponse.IS_NOT_CONNECTED);
    },
    deleteMeetingSchedule: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const meetingId = req.body.meetingId;
        const params = [userId, meetingId];
        const meeting = new Meeting(params);
        const certResult = await meeting.certificationMeetingByUserId();
        if (certResult.success) {
          const deleteMeeting = await meeting.deleteMeeting();
          res.send(deleteMeeting);
        } else res.send(certResult);
      } else res.send(baseResponse.IS_NOT_CONNECTED);
    },
  };
}
export default new Controller();
