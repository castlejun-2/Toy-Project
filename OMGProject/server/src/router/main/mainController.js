import passport from 'passport';
import baseResponse from '../../config/responseStatus.js';
import User from '../../models/users/user.js';
import Main from '../../models/main/main.js';
import MainStorage from '../../models/main/mainStorage.js';

class Controller {
  output = {
    main: async (req, res) => {
      const eventResult = await MainStorage.getEventInfo();
      if (req.user) res.render('main.ejs', { event: eventResult });
      else res.redirect('/users/login');
    },
  };

  process = {};
}
export default new Controller();
