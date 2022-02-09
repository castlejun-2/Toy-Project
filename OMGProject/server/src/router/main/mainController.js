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
      if (req.user) res.render('main.ejs', { event: eventResult, meeting: meetingResult, user: req.user });
      else res.redirect('/users/login');
    },
    getCompetition: async (req, res) => {
      const competitionResult = await MainStorage.getCompetitionInfo();
      if (req.user) res.render('competitions.ejs', { competition: competitionResult, user: req.user });
      else res.redirect('/users/login');
    },
    getNotice: async (req, res) => {
      const noticeResult = await MainStorage.getNoticeInfo();
      if (req.user) res.render('notice.ejs', { notice: noticeResult, user: req.user });
      else res.redirect('/users/login');
    },
    getInquiry: async (req, res) => {
      if (req.user) res.render('inquiry.ejs', { user: req.user });
      else res.redirect('/users/login');
    },
    getQuestion: async (req, res) => {
      const questionResult = await MainStorage.getQuestionInfo();
      if (req.user) res.render('question.ejs', { question: questionResult, user: req.user });
      else res.redirect('/users/login');
    },
  };

  process = {
    createInquiry: async (req, res) => {
      if (req.user) {
        if (!req.body.title) res.send(baseResponse.TITLE_EMPTY);
        else {
          const title = req.body.title;
          const content = req.body.content;
          const userId = req.user.id;
          const params = [userId, title, content];
          const main = new Main(params);
          const inquiryResult = await main.createInquiry();
          res.send(inquiryResult);
        }
      } else res.send(baseResponse.IS_NOT_CONNECTED);
    },
  };
}
export default new Controller();
