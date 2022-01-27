import passport from 'passport';
import baseResponse from '../../config/responseStatus.js';
import User from '../../models/user/user.js';
import Main from '../../models/main/main.js';
import MainStorage from '../../models/main/mainStorage.js';

class Controller {
  output = {
    main: async (req, res) => {
      const meetingResult = await MainStorage.getMeetingInfo();
      const eventResult = await MainStorage.getEventInfo();
      if (req.user) res.render('main.ejs', { event: eventResult, meeting: meetingResult, user: req.user });
      else res.redirect('/users/login');
    },
  };

  process = {};
}
export default new Controller();
