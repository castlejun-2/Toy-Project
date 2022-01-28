import passport from 'passport';
import baseResponse from '../../config/responseStatus.js';
import User from '../../models/user/user.js';
import Main from '../../models/main/main.js';
import MeetingStorage from '../../models/meeting/meetingStorage.js';

class Controller {
  output = {
    getScheduleDetail: async (req, res) => {
      const typeCode = req.params.typeName;
      const meetingId = req.params.scheduleId;
      const scheduleDetailResult = await MeetingStorage.getMeedtingDetail(meetingId);
      res.send(scheduleDetailResult);
    },
  };

  process = {
    getSchedule: async (req, res) => {
      const diffDate = req.body.diff_date;
      const scheduleResult = await MeetingStorage.getMeetingInfo(diffDate);
      return res.send({ meeting: scheduleResult });
    },
  };
}
export default new Controller();
