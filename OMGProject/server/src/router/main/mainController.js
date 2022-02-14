import passport from 'passport';
import baseResponse from '../../config/responseStatus.js';
import User from '../../models/user/user.js';
import Main from '../../models/main/main.js';
import Meeting from '../../models/meeting/meeting.js';
import MainStorage from '../../models/main/mainStorage.js';
import MeetingStorage from '../../models/meeting/meetingStorage.js';

class Controller {
  output = {
    getMain: async (req, res) => {
      const params = [0, false, false];
      const meeting = new Meeting(params);
      const meetingResult = await meeting.getScheduleInfo();
      const eventResult = await MainStorage.getEventInfo();
      if (req.user) res.render('main/main.ejs', { event: eventResult, meeting: meetingResult, user: req.user });
      else res.redirect('/users/login');
    },
    getMainSchedule: async (req, res) => {
      const diff_date = req.query.diff_date ? req.query.diff_date : 0;
      const params = [diff_date, false, false];
      const meeting = new Meeting(params);
      const meetingResult = await meeting.getScheduleInfo();
      res.send({ meeting: meetingResult });
    },
    getCompetition: async (req, res) => {
      const competitionResult = await MainStorage.getCompetitionInfo();
      if (req.user) res.render('main/competitions.ejs', { competition: competitionResult, user: req.user });
      else res.redirect('/users/login');
    },
    getCompetitionJson: async (req, res) => {
      const competitionResult = await MainStorage.getCompetitionInfo();
      if (req.user) res.send({ competition: competitionResult });
      else res.redirect('/users/login');
    },
    getNotice: async (req, res) => {
      const noticeResult = await MainStorage.getNoticeInfo();
      if (req.user) res.render('main/notice.ejs', { notice: noticeResult, user: req.user });
      else res.redirect('/users/login');
    },
    getNoticeJson: async (req, res) => {
      const noticeResult = await MainStorage.getNoticeInfo();
      if (req.user) res.send({ notice: noticeResult });
      else res.redirect('/users/login');
    },
    getInquiry: async (req, res) => {
      if (req.user) res.render('main/inquiry.ejs', { user: req.user });
      else res.redirect('/users/login');
    },
    getQuestion: async (req, res) => {
      const questionResult = await MainStorage.getQuestionInfo();
      if (req.user) res.render('main/question.ejs', { question: questionResult, user: req.user });
      else res.redirect('/users/login');
    },
    getQuestionJson: async (req, res) => {
      const questionResult = await MainStorage.getQuestionInfo();
      if (req.user) res.send({ question: questionResult });
      else res.redirect('/users/login');
    },
  };

  process = {
    createInquiry: async (req, res) => {
      if (req.user) {
        if (!req.body.title) return res.send(baseResponse.TITLE_EMPTY);
        else {
          const title = req.body.title;
          const content = req.body.content;
          const userId = req.user.id;
          const params = [userId, title, content];
          const main = new Main(params);
          const inquiryResult = await main.createInquiry();
          return res.send(inquiryResult);
        }
      } else return res.send(baseResponse.IS_NOT_CONNECTED);
    },
  };
}
export default new Controller();
