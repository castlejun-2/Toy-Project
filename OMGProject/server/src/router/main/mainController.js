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
  };

  process = {};
}
export default new Controller();
