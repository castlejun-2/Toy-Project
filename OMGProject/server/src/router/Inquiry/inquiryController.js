import baseResponse from '../../config/responseStatus.js';
import User from '../../models/user/user.js';
import Main from '../../models/main/main.js';
import Meeting from '../../models/meeting/meeting.js';
import Inquiry from '../../models/inquiry/inquiry.js';

class Controller {
  output = {
    getMyPageInquiry: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const user = new User(userId);
        const myInquiryResult = await user.getMyPageInquiryInfo();
        res.send({ inquiry: myInquiryResult });
      } else {
        return res.send(baseResponse.IS_NOT_CONNECTED);
      }
    },
    getInquiryDetail: async (req, res) => {
      if (req.user) {
        const userId = req.user.id;
        const inquiryId = req.params.inquiryId;
        const params = { userId: userId, inquiryId, inquiryId };
        const inquiry = new Inquiry(params);
        const inquiryDetail = await inquiry.getInquiryDetail();
        const answer = await inquiry.getInquiryAnswer();
        return res.render('inquiry/inquiryDetail.ejs', { user: req.user, inquiry: inquiryDetail, answer: answer });
      } else {
        return res.send(baseResponse.IS_NOT_CONNECTED);
      }
    },
  };

  process = {};
}
export default new Controller();
