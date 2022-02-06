import passport from 'passport';
import baseResponse from '../../config/responseStatus.js';
import User from '../../models/user/user.js';
import Main from '../../models/main/main.js';
import Meeting from '../../models/meeting/meeting.js';
import MeetingStorage from '../../models/meeting/meetingStorage.js';

class Controller {
  output = {
    getScheduleDetail: async (req, res) => {
      const meetingId = req.params.scheduleId;
      const scheduleDetailResult = await MeetingStorage.getMeedtingDetail(meetingId);
      res.render('meeting.ejs', { meeting: scheduleDetailResult, user: req.user });
    },
    getDateSchedule: async (req, res) => {
      let params = [];
      const diffDate = req.query.diff_date;
      req.query.type == 'main' ? (params = [diffDate, 0, parseInt(0)]) : (params = [diffDate, 1, req.query.type]);
      const meeting = new Meeting(params);
      const scheduleResult = await meeting.getScheduleInfo();
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
  };

  process = {};
}
export default new Controller();
