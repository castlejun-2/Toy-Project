import passport from 'passport';
import baseResponse from '../../config/responseStatus.js';
import User from '../../models/user/user.js';
import Main from '../../models/main/main.js';
import Meeting from '../../models/meeting/meeting.js';
import MeetingStorage from '../../models/meeting/meetingStorage.js';

class Controller {
  output = {
    getScheduleDetail: async (req, res) => {
      const typeCode = req.params.typeName;
      const meetingId = req.params.scheduleId;
      const scheduleDetailResult = await MeetingStorage.getMeedtingDetail(meetingId);
      res.send(scheduleDetailResult);
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
      res.render('game.ejs', { meeting: scheduleResult, user: req.user });
    },
    getDatingSchedule: async (req, res) => {
      const params = [0, 1, 'dating'];
      const meeting = new Meeting(params);
      const scheduleResult = await meeting.getScheduleInfo();
      res.render('dating.ejs', { meeting: scheduleResult, user: req.user });
    },
    getSportsSchedule: async (req, res) => {
      const params = [0, 1, 'sports'];
      const meeting = new Meeting(params);
      const scheduleResult = await meeting.getScheduleInfo();
      res.render('sports.ejs', { meeting: scheduleResult, user: req.user });
    },
    getStudySchedule: async (req, res) => {
      const params = [0, 1, 'study'];
      const meeting = new Meeting(params);
      const scheduleResult = await meeting.getScheduleInfo();
      res.render('study.ejs', { meeting: scheduleResult, user: req.user });
    },
    getHobbySchedule: async (req, res) => {
      const params = [0, 1, 'hobby'];
      const meeting = new Meeting(params);
      const scheduleResult = await meeting.getScheduleInfo();
      res.render('hobby.ejs', { meeting: scheduleResult, user: req.user });
    },
  };

  process = {};
}
export default new Controller();
