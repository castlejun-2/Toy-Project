import passport from 'passport';
import baseResponse from '../../config/responseStatus.js';
import User from '../../models/user/user.js';
import Main from '../../models/main/main.js';
import MainStorage from '../../models/main/mainStorage.js';
import MeetingStorage from '../../models/meeting/meetingStorage.js';

class Controller {
  output = {
    getMain: async (req, res) => {
      const meetingResult = await MeetingStorage.getMeetingInfo(0);
      const eventResult = await MainStorage.getEventInfo();
      if (req.user) res.render('main.ejs', { event: eventResult, meeting: meetingResult, user: req.user });
      else res.redirect('/users/login');
    },
  };

  process = {};
}
export default new Controller();
